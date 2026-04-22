import { STATION } from "@/app/config/station";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IcecastSource = {
  title?: string;
  server_name?: string;
  server_description?: string;
  server_type?: string;
  audio_info?: string;
  genre?: string;
  listeners?: number;
  bitrate?: number;
  listenurl?: string;
  stream_start?: string;
};

type IcecastStatus = {
  icestats?: {
    source?: IcecastSource | IcecastSource[];
  };
};

// An Icecast `source` entry carries rich metadata (title, bitrate, stream_start)
// only when something is actively streaming to that mount. An idle "placeholder"
// mount — declared in the server config but with no broadcaster connected —
// comes back as basically just { listeners, listenurl, dummy }. Use the
// presence of broadcaster-side metadata to decide whether a mount is active.
function isActive(s: IcecastSource) {
  return Boolean(
    s.server_type || s.audio_info || s.stream_start || s.bitrate,
  );
}

function mountType(s: IcecastSource): "live" | "autodj" | "stream" | "other" {
  const url = (s.listenurl || "").toLowerCase();
  if (url.endsWith("/live")) return "live";
  if (url.endsWith("/autodj")) return "autodj";
  if (url.endsWith("/stream")) return "stream";
  return "other";
}

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

    const activeByMount: Partial<Record<ReturnType<typeof mountType>, IcecastSource>> = {};
    for (const s of arr) {
      if (isActive(s)) activeByMount[mountType(s)] = s;
    }

    // A live DJ is broadcasting when the /live mount has content. When it
    // doesn't, AutoDJ is filling in.
    const isLive = Boolean(activeByMount.live);

    // For "now playing" text prefer /live, then /autodj, then /stream, then any.
    const primary =
      activeByMount.live ??
      activeByMount.autodj ??
      activeByMount.stream ??
      arr.find(isActive) ??
      arr[0];

    return Response.json(
      {
        online: !!primary,
        isLive,
        activeMount: primary ? mountType(primary) : null,
        title:
          primary?.title && primary.title !== "Unknown" ? primary.title : null,
        stationName: primary?.server_name ?? STATION.name,
        description: primary?.server_description ?? STATION.tagline,
        genre: primary?.genre ?? null,
        listeners:
          // Listener totals should include every mount that listeners are on,
          // not just the primary — otherwise the count misses /stream relays.
          arr.reduce((sum, s) => sum + (s.listeners ?? 0), 0),
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
        isLive: false,
        activeMount: null,
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
