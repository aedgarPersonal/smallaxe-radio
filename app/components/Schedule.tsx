import { SCHEDULE, type Show } from "@/app/config/schedule";

const DAY_ORDER: Show["day"][] = [
  "Daily",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

function format12(hm: string) {
  const [h, m] = hm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hr = ((h + 11) % 12) + 1;
  return `${hr}:${m.toString().padStart(2, "0")} ${period}`;
}

export function Schedule() {
  const shows = [...SCHEDULE].sort(
    (a, b) =>
      DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day) ||
      a.start.localeCompare(b.start),
  );

  return (
    <section id="schedule" className="py-16 sm:py-24">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm font-display tracking-[0.3em] text-gold">
            THE WEEK AHEAD
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display text-cream">
            Shows & selectors
          </h2>
        </div>
        <p className="text-cream/60 max-w-md">
          Times shown in Eastern Time. Between live shows the autoDJ keeps the
          riddim rolling 24/7.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shows.map((s) => (
          <article
            key={s.id}
            className="group rounded-2xl border border-white/10 bg-ink-2/60 p-5 hover:border-green-bright/50 transition-colors"
          >
            <div className="flex items-center gap-2 text-xs font-display tracking-widest">
              <span className="px-2 py-0.5 rounded bg-green/20 text-green-bright">
                {s.day}
              </span>
              <span className="text-cream/60">
                {format12(s.start)} – {format12(s.end)}
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-display text-cream">
              {s.title}
            </h3>
            <p className="mt-0.5 text-sm text-gold">{s.host}</p>
            <p className="mt-3 text-sm text-cream/70 leading-relaxed">
              {s.description}
            </p>
            <p className="mt-4 text-xs uppercase tracking-widest text-cream/40">
              {s.genre}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
