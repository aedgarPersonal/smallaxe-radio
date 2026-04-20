import { FEATURED, type FeaturedBusiness } from "@/app/config/ads";

const ACCENT: Record<FeaturedBusiness["accent"], string> = {
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
            COMMUNITY SPOTLIGHT
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display text-cream">
            Caribbean Ottawa.
          </h2>
          <p className="mt-3 max-w-xl text-cream/70 leading-relaxed">
            A round-up of Ottawa&apos;s Caribbean restaurants and Afro-Caribbean
            grocers. Go support them — tell them Riddim WSM sent you.
          </p>
        </div>
        <a
          href="mailto:RiddimWSM@gmail.com?subject=Feature%20my%20business%20on%20Riddim%20WSM"
          className="inline-flex items-center gap-2 rounded-full border border-gold/60 text-gold px-5 py-2 text-sm hover:bg-gold hover:text-ink transition-colors"
        >
          Suggest a business →
        </a>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED.map((biz) => (
          <a
            key={biz.id}
            href={biz.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block rounded-2xl border bg-gradient-to-br ${ACCENT[biz.accent]} p-5 min-h-[200px] flex flex-col justify-between transition-transform hover:-translate-y-0.5`}
          >
            <div>
              <p className="text-xs font-display tracking-widest text-cream/60">
                {biz.category.toUpperCase()}
              </p>
              <h3 className="mt-2 text-xl font-display text-cream leading-tight">
                {biz.name}
              </h3>
              <p className="mt-2 text-sm text-cream/75 leading-snug">
                {biz.location}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <span className="text-sm font-medium text-cream group-hover:translate-x-0.5 transition-transform">
                {biz.linkLabel}
              </span>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-6 text-xs text-cream/40 max-w-2xl">
        Editorial feature, not paid placement. Businesses listed independently.
        Verify hours and availability with each business directly.
      </p>
    </section>
  );
}
