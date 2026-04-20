import { SCHEDULE, type Show } from "@/app/config/schedule";

const DAY_ORDER: Show["day"][] = [
  "Daily",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const DAY_FULL: Record<Show["day"], string> = {
  Daily: "Every Day",
  Sun: "Sunday",
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
};

function format12(hm: string) {
  const [h, m] = hm.split(":").map(Number);
  if (h === 0 && m === 0) return "12 AM";
  const period = h >= 12 ? "PM" : "AM";
  const hr = ((h + 11) % 12) + 1;
  return m === 0
    ? `${hr} ${period}`
    : `${hr}:${m.toString().padStart(2, "0")} ${period}`;
}

function groupByDay(shows: Show[]) {
  const map = new Map<Show["day"], Show[]>();
  for (const d of DAY_ORDER) map.set(d, []);
  for (const s of shows) map.get(s.day)?.push(s);
  for (const list of map.values()) list.sort((a, b) => a.start.localeCompare(b.start));
  return Array.from(map.entries()).filter(([, list]) => list.length);
}

export function Schedule() {
  const grouped = groupByDay(SCHEDULE);

  return (
    <section id="schedule" className="py-16 sm:py-24">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm font-display tracking-[0.3em] text-gold">
            THE WEEK AHEAD
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display text-cream">
            Shows &amp; selectors
          </h2>
        </div>
        <p className="text-cream/60 max-w-md">
          Times shown in Eastern Time. Between live shows the autoDJ keeps the
          riddim rolling 24/7.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {grouped.map(([day, shows]) => (
          <div
            key={day}
            className="rounded-2xl border border-white/10 bg-ink-2/60 overflow-hidden"
          >
            <div className="px-5 sm:px-6 py-3 border-b border-white/10 flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-green-bright" />
              <h3 className="font-display text-xl tracking-widest text-cream">
                {DAY_FULL[day]}
              </h3>
            </div>
            <ul className="divide-y divide-white/5">
              {shows.map((s) => (
                <li
                  key={s.id}
                  className="px-5 sm:px-6 py-4 grid gap-2 sm:grid-cols-[180px_1fr_auto] sm:items-center"
                >
                  <div className="text-sm font-mono text-gold">
                    {format12(s.start)} – {format12(s.end)}
                    {s.crossesMidnight && (
                      <span className="ml-2 text-[10px] uppercase tracking-widest text-cream/40">
                        late
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-display text-2xl text-cream leading-tight">
                      {s.title}
                    </p>
                    <p className="text-sm text-cream/60 mt-0.5">
                      with {s.host}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-cream/40 italic max-w-2xl">
        The views expressed by the hosts of the various shows are not
        necessarily the views of Riddim WSM.
      </p>
    </section>
  );
}
