import type { NextRequest } from "next/server";
import { saveSubscription, storeMode } from "@/app/lib/push-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (
      !body?.endpoint ||
      typeof body.endpoint !== "string" ||
      !body?.keys?.p256dh ||
      !body?.keys?.auth
    ) {
      return Response.json({ error: "Invalid subscription" }, { status: 400 });
    }

    const result = await saveSubscription({
      endpoint: body.endpoint,
      keys: { p256dh: body.keys.p256dh, auth: body.keys.auth },
      createdAt: Date.now(),
    });

    return Response.json({ ok: true, store: storeMode(), ...result });
  } catch (e) {
    return Response.json(
      { error: "subscribe_failed", detail: String(e) },
      { status: 500 },
    );
  }
}
