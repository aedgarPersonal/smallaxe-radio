export type Show = {
  id: string;
  title: string;
  host: string;
  genre: string;
  day:
    | "Mon"
    | "Tue"
    | "Wed"
    | "Thu"
    | "Fri"
    | "Sat"
    | "Sun"
    | "Daily";
  start: string; // 24h "HH:mm" local to station (ET)
  end: string;
  description: string;
};

// Placeholder schedule — edit freely. Times are Eastern Time.
export const SCHEDULE: Show[] = [
  {
    id: "morning-irie",
    title: "Morning Irie",
    host: "DJ Selassie I",
    genre: "Roots Reggae",
    day: "Daily",
    start: "06:00",
    end: "09:00",
    description:
      "Start the day with roots, culture and conscious vibrations from Kingston to Toronto.",
  },
  {
    id: "dancehall-drive",
    title: "Dancehall Drive",
    host: "Lady Sovereign",
    genre: "Dancehall",
    day: "Mon",
    start: "16:00",
    end: "19:00",
    description:
      "The hottest dancehall bangers to carry you through rush hour. Fresh bashment every show.",
  },
  {
    id: "soca-saturdays",
    title: "Soca Saturdays",
    host: "DJ Tempo",
    genre: "Soca & Calypso",
    day: "Sat",
    start: "14:00",
    end: "17:00",
    description:
      "All the road march you can handle. Trini, Bajan, Vincy, Grenadian — every flag represented.",
  },
  {
    id: "lovers-rock",
    title: "Lovers Rock Sunday",
    host: "Miss Empress",
    genre: "Lovers Rock",
    day: "Sun",
    start: "20:00",
    end: "23:00",
    description:
      "Smooth lovers rock and classic reggae slow jams to close out your weekend.",
  },
  {
    id: "riddim-clash",
    title: "Riddim Clash",
    host: "Selector Fyah",
    genre: "Sound System",
    day: "Fri",
    start: "22:00",
    end: "01:00",
    description:
      "Two hours, three selectors, one winner. Weekly sound-clash showdown live from the studio.",
  },
  {
    id: "caribbean-news",
    title: "Caribbean News Hour",
    host: "Marva Thompson",
    genre: "News & Talk",
    day: "Wed",
    start: "12:00",
    end: "13:00",
    description:
      "Headlines from across the Caribbean and the diaspora in Canada, the UK and the US.",
  },
];
