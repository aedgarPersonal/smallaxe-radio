import { STATION } from "@/app/config/station";

export function Support() {
  return (
    <section id="support" className="py-16 sm:py-24 border-t border-white/10">
      <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-gold/15 via-sun/10 to-red/10 p-8 sm:p-12">
        <div className="absolute inset-x-0 top-0 h-1 flag-stripes" aria-hidden />
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] items-center">
          <div>
            <p className="text-sm font-display tracking-[0.3em] text-gold">
              SUPPORT THE STATION
            </p>
            <h2 className="mt-2 text-4xl sm:text-5xl font-display text-cream">
              Keep the riddim rolling.
            </h2>
            <p className="mt-4 text-cream/80 leading-relaxed max-w-xl">
              {STATION.donate.pitch} Every dollar helps cover streaming,
              hosting, and the equipment that keeps our DJs on the air. One-time
              or monthly — any amount makes a difference.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <a
              href={STATION.donate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold text-ink px-7 py-3 text-base font-semibold hover:bg-green-bright hover:text-cream transition-colors shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 21s-7.5-4.5-9.5-9.1C1.2 8.8 2.8 5 6.2 5c2 0 3.4 1.1 4.3 2.7h3c.9-1.6 2.3-2.7 4.3-2.7 3.4 0 5 3.8 3.7 6.9C19.5 16.5 12 21 12 21Z" />
              </svg>
              {STATION.donate.label}
            </a>
            <p className="text-xs text-cream/60 sm:text-right max-w-[240px]">
              Secure checkout via Ko-fi. No account needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
