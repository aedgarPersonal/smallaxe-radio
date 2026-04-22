import type { NextRequest } from "next/server";
import webpush from "web-push";
import { listSubscriptions, removeSubscription, storeMode } from "@/app/lib/push-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Admin-only endpoint for firing a push to every stored subscription.
// Call with header `x-admin-token: <PUSH_ADMIN_TOKEN>` and a JSON body:
// { "title": "Going live now", "body": "Gospel Sundays — Wally B", "url": "/#schedule" }
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!token || token !== process.env.PUSH_ADMIN_TOKEN) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const contact = process.env.VAPID_CONTACT || "mailto:RiddimWSM@gmail.com";
  if (!publicKey || !privateKey) {
    return Response.json(
      { error: "vapid_not_configured" },
      { status: 500 },
    );
  }
  webpush.setVapidDetails(contact, publicKey, privateKey);

  const body = await req.json().catch(() => ({}));
  const payload = JSON.stringify({
    title: body.title || "Riddim WSM",
    body: body.body || "Tap to open the station.",
    url: body.url || "/",
    tag: body.tag || "riddim-wsm",
  });

  const subs = await listSubscriptions();
  const results = await Promise.all(
    subs.map(async (s) => {
      try {
        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: s.keys },
          payload,
        );
        return { endpoint: s.endpoint, ok: true };
      } catch (e: unknown) {
        const status =
          typeof e === "object" && e && "statusCode" in e
            ? (e as { statusCode: number }).statusCode
            : 0;
        // 404/410 mean the subscription is dead — clean it up.
        if (status === 404 || status === 410) {
          await removeSubscription(s.endpoint);
          return { endpoint: s.endpoint, ok: false, gone: true };
        }
        return { endpoint: s.endpoint, ok: false, status };
      }
    }),
  );

  const ok = results.filter((r) => r.ok).length;
  return Response.json({
    sent: ok,
    total: results.length,
    store: storeMode(),
    results,
  });
}
