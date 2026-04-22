import type { NextRequest } from "next/server";
import { removeSubscription } from "@/app/lib/push-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { endpoint } = await req.json();
    if (!endpoint || typeof endpoint !== "string") {
      return Response.json({ error: "Invalid endpoint" }, { status: 400 });
    }
    await removeSubscription(endpoint);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json(
      { error: "unsubscribe_failed", detail: String(e) },
      { status: 500 },
    );
  }
}
