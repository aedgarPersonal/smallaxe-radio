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
  // Donations — demo uses a Ko-fi placeholder URL. Replace with a real Ko-fi
  // profile or Stripe Payment Link via the NEXT_PUBLIC_DONATE_URL env var.
  donate: {
    url:
      process.env.NEXT_PUBLIC_DONATE_URL ||
      "https://ko-fi.com/riddimwsm",
    label: "Donate",
    pitch:
      "Riddim WSM is independent and listener-supported. Keep the riddim rolling.",
  },
  // Live chat — if both NEXT_PUBLIC_TAWK_PROPERTY_ID and
  // NEXT_PUBLIC_TAWK_WIDGET_ID are set the tawk.to widget loads automatically.
  // Otherwise the chat button opens a fallback modal with contact details.
  chat: {
    tawkPropertyId: process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || "",
    tawkWidgetId: process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "",
  },
} as const;
