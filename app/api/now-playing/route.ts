import { STATION } from "@/app/config/station";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IcecastSource = {
  title?: string;
  server_name?: string;
  server_description?: string;
  genre?: string;
  listeners?: number;
  bitrate?: number;
  listenurl?: string;
};

type IcecastStatus = {
  icestats?: {
    source?: IcecastSource | IcecastSource[];
  };
};

export async function GET() {
  try {
    const res = await fetch(STATION.statusUrl, {
      headers: { "User-Agent": "RiddimWSM/1.0" },
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const json = (await res.json()) as IcecastStatus;

    const sources = json.icestats?.source;
    const arr = Array.isArray(sources) ? sources : sources ? [sources] : [];

    // Prefer the source that actually has listeners and a title.
    const primary =
      arr.find((s) => s.title && s.title !== "Unknown") ??
      arr.find((s) => (s.listeners ?? 0) > 0) ??
      arr[0];

    return Response.json(
      {
        online: !!primary,
        title: primary?.title && primary.title !== "Unknown" ? primary.title : null,
        stationName: primary?.server_name ?? STATION.name,
        description: primary?.server_description ?? STATION.tagline,
        genre: primary?.genre ?? null,
        listeners: primary?.listeners ?? 0,
        bitrate: primary?.bitrate ?? null,
      },
      {
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch {
    return Response.json(
      {
        online: false,
        title: null,
        stationName: STATION.name,
        description: STATION.tagline,
        genre: null,
        listeners: 0,
        bitrate: null,
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }
}
