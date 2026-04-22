# Riddim WSM

**Riddim WSM** (World Sound Music) — Caribbean internet radio for the
diaspora. A small, focused web front-end for streaming, show information, and
local-business sponsor slots.

Streams the RiddimWSM Canadian/Caribbean audio feed 24/7 via a Next.js API
proxy (the upstream is HTTP-only, so the proxy is what lets it play from an
HTTPS site).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Deployed on Vercel

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Everything content-ish lives in `app/config/`:

- `station.ts` — station name, tagline, upstream stream + status URLs
- `schedule.ts` — weekly show schedule (times in Eastern Time)
- `ads.ts` — sponsor tiles (sponsor, tagline, link, accent colour)

Edit those and redeploy — no other code changes needed.

## Environment variables

All optional — the site runs fine without any of these, with sensible
demo fallbacks:

| Var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used for OG image resolution and default push deep-links. |
| `NEXT_PUBLIC_DONATE_URL` | Donate button target. Defaults to a Ko-fi placeholder. Set to a real Ko-fi profile or Stripe Payment Link. |
| `NEXT_PUBLIC_TAWK_PROPERTY_ID` | [tawk.to](https://tawk.to) property id. When combined with the widget id below, activates the real live-chat widget. |
| `NEXT_PUBLIC_TAWK_WIDGET_ID` | tawk.to widget id. Paired with the property id. |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Web Push public key. Pair with `VAPID_PRIVATE_KEY` to enable the subscribe flow. Generate with `npx web-push generate-vapid-keys`. |
| `VAPID_PRIVATE_KEY` | Web Push private key. Never expose publicly. |
| `VAPID_CONTACT` | Contact `mailto:` address used in VAPID headers (defaults to `mailto:RiddimWSM@gmail.com`). |
| `PUSH_ADMIN_TOKEN` | Long random token; required in the `x-admin-token` header to call `/api/push/broadcast`. |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Populated automatically when Upstash Redis is connected (see below). Without these, push subscriptions fall back to in-memory (lost on cold start). |

Set them in Vercel → Project → Settings → Environment Variables, or in
a local `.env.local` file for development.

## Provisioning push storage (Upstash Redis)

The push subscribe/broadcast flow works in demo mode without any
database. To actually hold onto subscriptions between cold starts you
need Upstash Redis (Vercel KV's marketplace successor):

1. Open [the Upstash terms page](https://vercel.com/~/integrations/accept-terms/upstash?source=cli) and accept the EULA + privacy policy.
2. Run:
   ```bash
   vercel integration add upstash/upstash-kv --name riddim-wsm-push \
     --plan free -e production -e development
   ```
3. Pull the new env vars locally: `vercel env pull .env.local`
4. Redeploy: `vercel --prod`

After this, `/api/push/subscribe` will persist subscriptions and
`/api/push/broadcast` will fan out to every browser that opted in.

## Sending a broadcast

```bash
curl -X POST https://smallaxe-radio.vercel.app/api/push/broadcast \
  -H "x-admin-token: $PUSH_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Going live now","body":"IROOTS with Sligo","url":"/#schedule"}'
```

## How the stream works

- `app/api/stream/route.ts` proxies the upstream Icecast stream so the browser
  can load it from the site's HTTPS origin.
- `app/api/now-playing/route.ts` hits `status-json.xsl` on the upstream and
  returns the current title, listener count, bitrate, and genre.
- The player component polls `/api/now-playing` every 15s.

## Deploy

```bash
vercel --prod
```

The API routes must run on the Node runtime (already configured); they won't
work on edge because the upstream is plain HTTP.
