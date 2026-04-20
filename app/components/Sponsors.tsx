import { ADS, type Ad } from "@/app/config/ads";

const ACCENT: Record<Ad["accent"], string> = {
  green: "from-green/40 to-green/5 border-green/40",
  gold: "from-gold/30 to-gold/5 border-gold/40",
  red: "from-red/30 to-red/5 border-red/40",
  sun: "from-sun/30 to-sun/5 border-sun/40",
};

export function Sponsors() {
  return (
    <section id="sponsors" className="py-16 sm:py-24">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm font-display tracking-[0.3em] text-red">
            BACKED BY OUR COMMUNITY
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display text-cream">
            Local sponsors
          </h2>
        </div>
        <a
          href="mailto:RiddimWSM@gmail.com?subject=Sponsor%20Riddim%20WSM"
          className="inline-flex items-center gap-2 rounded-full border border-gold/60 text-gold px-5 py-2 text-sm hover:bg-gold hover:text-ink transition-colors"
        >
          Become a sponsor →
        </a>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ADS.map((ad) => (
          <a
            key={ad.id}
            href={ad.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`group block rounded-2xl border bg-gradient-to-br ${ACCENT[ad.accent]} p-5 min-h-[220px] flex flex-col justify-between transition-transform hover:-translate-y-0.5`}
          >
            <div>
              <p className="text-xs font-display tracking-widest text-cream/60">
                SPONSORED
              </p>
              <h3 className="mt-2 text-xl font-display text-cream">
                {ad.sponsor}
              </h3>
              <p className="mt-2 text-sm text-cream/80 leading-snug">
                {ad.tagline}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              {ad.location && (
                <span className="text-xs text-cream/50">{ad.location}</span>
              )}
              <span className="text-sm font-medium text-cream group-hover:translate-x-0.5 transition-transform">
                {ad.cta}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
