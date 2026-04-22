import { SCHEDULE, type Show } from "@/app/config/schedule";

const DAY_ORDER: Show["day"][] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

// Matches Intl.DateTimeFormat weekday output ("Sun", "Mon", etc) to our enum.
type Weekday = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

function nextDay(d: Weekday): Weekday {
  return DAY_ORDER[(DAY_ORDER.indexOf(d) + 1) % 7] as Weekday;
}

function parseHHMM(hm: string) {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + m;
}

// The schedule is authored in Eastern Time. Convert a wall-clock Date
// (browser local or server UTC) into the equivalent ET weekday + minutes
// so we can compare against the schedule table directly.
export function toEasternDayMinutes(now: Date) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Toronto",
    weekday: "short",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const parts = fmt.formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value as Weekday;
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  // Intl occasionally emits "24" for midnight on some platforms. Clamp.
  const h = hour === 24 ? 0 : hour;
  return { day: weekday, minutes: h * 60 + minute };
}

type Window = { day: Weekday | "Daily"; start: number; end: number; startAbs: number };

// A show like Friday 22:00–02:00 is actually two windows: Fri 22:00–24:00
// and Sat 00:00–02:00. "Daily" shows produce a single window that matches
// any day.
function windowsFor(show: Show): Window[] {
  const start = parseHHMM(show.start);
  const end = parseHHMM(show.end);

  if (show.day === "Daily") {
    return [{ day: "Daily", start, end: end <= start ? 1440 : end, startAbs: start }];
  }

  const day = show.day as Weekday;
  if (show.crossesMidnight || end <= start) {
    return [
      { day, start, end: 1440, startAbs: start },
      { day: nextDay(day), start: 0, end, startAbs: start },
    ];
  }
  return [{ day, start, end, startAbs: start }];
}

// Returns the show currently airing in ET, or null if only AutoDJ is on.
// When windows overlap (e.g., Sun 06:00–18:00 Gospel Sundays and
// Sun 17:00–19:00 Lick Samba both cover 17:30), prefer the latest-starting
// show — it's the more specific slot that's "taking over" the long block.
export function currentShow(now: Date = new Date()): Show | null {
  const { day, minutes } = toEasternDayMinutes(now);
  const matches: { show: Show; startAbs: number }[] = [];

  for (const show of SCHEDULE) {
    for (const w of windowsFor(show)) {
      const dayOk = w.day === "Daily" || w.day === day;
      if (dayOk && minutes >= w.start && minutes < w.end) {
        matches.push({ show, startAbs: w.startAbs });
        break;
      }
    }
  }

  if (!matches.length) return null;
  matches.sort((a, b) => b.startAbs - a.startAbs);
  return matches[0].show;
}

// Minutes until the currently-airing show ends, or null if nothing on.
export function minutesUntilShowEnds(now: Date = new Date()): number | null {
  const show = currentShow(now);
  if (!show) return null;
  const { day, minutes } = toEasternDayMinutes(now);
  for (const w of windowsFor(show)) {
    const dayOk = w.day === "Daily" || w.day === day;
    if (dayOk && minutes >= w.start && minutes < w.end) return w.end - minutes;
  }
  return null;
}
