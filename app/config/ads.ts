export type Ad = {
  id: string;
  sponsor: string;
  tagline: string;
  cta: string;
  href: string;
  accent: "green" | "gold" | "red" | "sun";
  location?: string;
};

// Local sponsor slots. Replace with real sponsors — the layout scales to any count.
export const ADS: Ad[] = [
  {
    id: "patty-king",
    sponsor: "Patty King Bakery",
    tagline: "Handmade Jamaican patties, fresh daily on Eglinton.",
    cta: "Order ahead →",
    href: "https://example.com/patty-king",
    accent: "gold",
    location: "Toronto, ON",
  },
  {
    id: "island-barbers",
    sponsor: "Island Cuts Barbers",
    tagline: "Fades, line-ups and locs. Walk-ins welcome.",
    cta: "Book a chair →",
    href: "https://example.com/island-cuts",
    accent: "green",
    location: "Scarborough, ON",
  },
  {
    id: "rum-shop",
    sponsor: "The Rum Shop Grill",
    tagline: "Oxtail, curry goat, jerk. Caribbean plates done right.",
    cta: "See the menu →",
    href: "https://example.com/rum-shop",
    accent: "red",
    location: "Montréal, QC",
  },
  {
    id: "soca-fit",
    sponsor: "SocaFit Studios",
    tagline: "Wine your waist and burn calories. Classes 6 nights a week.",
    cta: "First class free →",
    href: "https://example.com/soca-fit",
    accent: "sun",
    location: "Mississauga, ON",
  },
];
