export type FeaturedBusiness = {
  id: string;
  name: string;
  category: string;
  location: string;
  accent: "green" | "gold" | "red" | "sun";
  href: string;
  linkLabel: string;
};

// Real Ottawa Caribbean and Afro-Caribbean businesses featured as a
// community spotlight — NOT a paid sponsorship. Links go to each
// business's published web presence (or a Google Maps lookup when the
// business has no standalone site). Verify details before relying on
// hours / addresses; update freely as the station adds real sponsors.
const mapUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const FEATURED: FeaturedBusiness[] = [
  {
    id: "island-grill",
    name: "Island Grill",
    category: "Jamaican restaurant",
    location: "324 Bank St, Centretown",
    accent: "green",
    href: mapUrl("Island Grill 324 Bank St Ottawa"),
    linkLabel: "Find on Maps →",
  },
  {
    id: "ocho-rios",
    name: "Ocho Rios Caribbean",
    category: "Jamaican & Caribbean",
    location: "Bank & Walkley, Ottawa South",
    accent: "gold",
    href: "https://ochorioscaribbean.ca/",
    linkLabel: "Visit website →",
  },
  {
    id: "nu-caribbean",
    name: "Nu Caribbean",
    category: "Homestyle Caribbean",
    location: "858 Merivale Rd",
    accent: "red",
    href: mapUrl("Nu Caribbean 858 Merivale Rd Ottawa"),
    linkLabel: "Find on Maps →",
  },
  {
    id: "fishys-original-jerk",
    name: "Fishys Original Jerk",
    category: "Jerk chicken, oxtail, roti",
    location: "Ottawa — order online",
    accent: "sun",
    href: "https://www.fishysoriginaljerk.com/",
    linkLabel: "Order online →",
  },
  {
    id: "da-chicken-cribb",
    name: "Da Chicken Cribb",
    category: "Jerk chicken & Jamaican plates",
    location: "Ottawa",
    accent: "green",
    href: "https://www.dachickencribb.ca/",
    linkLabel: "Visit website →",
  },
  {
    id: "caribbean-sizzler",
    name: "Caribbean Sizzler",
    category: "Jamaican food & catering",
    location: "Ottawa",
    accent: "red",
    href: "https://www.caribbeansizzler.com/",
    linkLabel: "Visit website →",
  },
  {
    id: "savannah-afro-caribbean",
    name: "Savannah Afro Caribbean Products",
    category: "Afro-Caribbean grocery",
    location: "1838 Bank St",
    accent: "gold",
    href: mapUrl("Savannah Afro Caribbean Products 1838 Bank St Ottawa"),
    linkLabel: "Find on Maps →",
  },
  {
    id: "j4-market",
    name: "J4 Market",
    category: "Afro-Caribbean groceries",
    location: "3771 Spratt Rd, Unit 8",
    accent: "sun",
    href: mapUrl("J4 Market Afro Caribbean Groceries 3771 Spratt Rd Ottawa"),
    linkLabel: "Find on Maps →",
  },
];
