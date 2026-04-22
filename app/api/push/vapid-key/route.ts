export const runtime = "nodejs";

// Exposes the VAPID public key so the client can subscribe. Public on purpose
// — VAPID public keys are safe to ship.
export async function GET() {
  return Response.json({
    publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "",
  });
}
