export const STATION = {
  name: "Riddim WSM",
  fullName: "Riddim World Sound Music",
  tagline: "Caribbean sounds from the North",
  description:
    "World Sound Music — reggae, dancehall, soca, roots and rockers — serving the Caribbean diaspora across Canada and the world, 24 hours a day.",
  origin: "Broadcasting from Canada",
  // Upstream Icecast/Shoutcast stream. Served over HTTP, so we proxy through /api/stream.
  streamUrl: "http://riddimwsm.radioca.st/stream",
  statusUrl: "http://riddimwsm.radioca.st/status-json.xsl",
  socials: [
    { label: "Email", href: "mailto:hello@riddimwsm.com" },
  ],
} as const;
