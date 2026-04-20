export const STATION = {
  name: "Small Axe Radio",
  tagline: "Caribbean sounds from the North",
  description:
    "Reggae, dancehall, soca, roots and rockers — serving the Caribbean diaspora across Canada and the world, 24 hours a day.",
  origin: "Broadcasting from Canada",
  // Upstream Icecast/Shoutcast stream. Served over HTTP, so we proxy through /api/stream.
  streamUrl: "http://riddimwsm.radioca.st/stream",
  statusUrl: "http://riddimwsm.radioca.st/status-json.xsl",
  socials: [
    { label: "Email", href: "mailto:hello@smallaxe.radio" },
  ],
} as const;
