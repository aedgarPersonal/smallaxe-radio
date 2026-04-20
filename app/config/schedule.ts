export type Show = {
  id: string;
  title: string;
  host: string;
  day:
    | "Mon"
    | "Tue"
    | "Wed"
    | "Thu"
    | "Fri"
    | "Sat"
    | "Sun"
    | "Daily";
  start: string; // 24h "HH:mm"
  end: string; // may cross midnight (e.g. "02:00")
  crossesMidnight?: boolean;
  notes?: string;
};

// Current Riddim WSM programming schedule.
// Between live shows the autoDJ keeps the riddim rolling 24/7.
export const SCHEDULE: Show[] = [
  {
    id: "gospel-sundays",
    title: "Gospel Sundays",
    host: "Wally B",
    day: "Sun",
    start: "06:00",
    end: "18:00",
  },
  {
    id: "lick-samba",
    title: "Lick Samba",
    host: "Stephen C",
    day: "Sun",
    start: "17:00",
    end: "19:00",
  },
  {
    id: "oldies-but-goodies",
    title: "Oldies but Goodies",
    host: "Wally B",
    day: "Sun",
    start: "20:00",
    end: "22:00",
  },
  {
    id: "irevibes",
    title: "IreVibes",
    host: "VjKRES & Easy-E",
    day: "Mon",
    start: "19:00",
    end: "21:00",
  },
  {
    id: "soul-train",
    title: "Soul Train",
    host: "The Professor",
    day: "Tue",
    start: "18:00",
    end: "21:00",
  },
  {
    id: "tun-it-up-tuesdays",
    title: "Tun it up Tuesdays",
    host: "Rassaudio",
    day: "Tue",
    start: "21:00",
    end: "23:00",
  },
  {
    id: "mixed-moods-and-attitudes",
    title: "Mixed Moods and Attitudes",
    host: "Wattawan",
    day: "Wed",
    start: "20:00",
    end: "00:00",
    crossesMidnight: true,
  },
  {
    id: "dancehall-night",
    title: "Dancehall Night",
    host: "Various DJs",
    day: "Thu",
    start: "19:00",
    end: "21:00",
  },
  {
    id: "iroots",
    title: "IROOTS",
    host: "Sligo",
    day: "Fri",
    start: "19:00",
    end: "22:00",
  },
  {
    id: "in-the-scheme-of-things",
    title: "In the Scheme of Things",
    host: "Stevie Dred",
    day: "Fri",
    start: "22:00",
    end: "02:00",
    crossesMidnight: true,
  },
  {
    id: "party-mix",
    title: "Party Mix",
    host: "Wally B",
    day: "Sat",
    start: "22:00",
    end: "02:00",
    crossesMidnight: true,
  },
];
