import type { NextRequest } from "next/server";
import { STATION } from "@/app/config/station";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Proxies the upstream HTTP Icecast stream so browsers can play it from HTTPS
// origins (mixed-content is blocked otherwise). We stream the body straight
// through with the original audio content-type.
export async function GET(_req: NextRequest) {
  const upstream = await fetch(STATION.streamUrl, {
    headers: { "User-Agent": "SmallAxeRadio/1.0 (+https://smallaxe.radio)" },
    cache: "no-store",
    // @ts-expect-error — duplex is required by the fetch spec for streaming bodies
    duplex: "half",
  });

  if (!upstream.ok || !upstream.body) {
    return new Response("Upstream unavailable", { status: 502 });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "audio/mpeg",
      "Cache-Control": "no-store, no-transform",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
