export const STATION = {
  name: "Riddim WSM",
  fullName: "Riddim World Sound Music",
  tagline: "Caribbean sounds from the North",
  description:
    "World Sound Music — reggae, dancehall, soca, roots and rockers — serving the Caribbean diaspora across Canada and the world, 24 hours a day.",
  origin: "Broadcasting from Canada",
  copyrightSince: 2020,
  // Upstream Icecast/Shoutcast stream. Served over HTTP, so we proxy through /api/stream.
  streamUrl: "http://riddimwsm.radioca.st/stream",
  statusUrl: "http://riddimwsm.radioca.st/status-json.xsl",
  contact: {
    landline: "613-699-0669",
    mobile: "613-265-3339",
    email: "RiddimWSM@gmail.com",
    twitter: "RiddimWSM",
    facebook: "Riddim WSM",
    facebookUrl: "https://www.facebook.com/RiddimWSM",
  },
  socials: [
    { label: "Email", href: "mailto:RiddimWSM@gmail.com" },
    { label: "Twitter", href: "https://twitter.com/RiddimWSM" },
    { label: "Facebook", href: "https://www.facebook.com/RiddimWSM" },
  ],
} as const;
