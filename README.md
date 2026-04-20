# Small Axe Radio

Caribbean internet radio for the diaspora — a small, focused web front-end for
streaming, show information, and local-business sponsor slots.

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
