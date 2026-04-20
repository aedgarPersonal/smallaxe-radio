import { STATION } from "@/app/config/station";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 border-t border-white/10">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
        <div>
          <p className="text-sm font-display tracking-[0.3em] text-green-bright">
            ABOUT THE STATION
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display text-cream">
            World sound,<br />one riddim.
          </h2>
          <p className="mt-6 text-cream/75 leading-relaxed max-w-xl">
            {STATION.name} is an independent internet radio station streaming
            from Canada to listeners worldwide. We exist to amplify the music,
            voices, and businesses of the Caribbean diaspora — from roots reggae
            to fresh dancehall, from carnival soca to soulful lovers rock.
          </p>
          <p className="mt-4 text-cream/75 leading-relaxed max-w-xl">
            The stream runs 24/7. Live shows, community events, and local
            sponsors power the station. Got a story to tell or a business to
            shout out? We want to hear from you.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#schedule"
              className="rounded-full bg-green text-cream px-5 py-2.5 text-sm font-medium hover:bg-green-bright transition-colors"
            >
              See the schedule
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 text-cream px-5 py-2.5 text-sm font-medium hover:border-gold hover:text-gold transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-ink-2/60 p-6 sm:p-8">
          <h3 className="font-display text-2xl text-gold">The stream</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-cream/60">Origin</dt>
              <dd className="text-cream text-right">{STATION.origin}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-cream/60">Format</dt>
              <dd className="text-cream text-right">Reggae · Dancehall · Soca · Roots</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-cream/60">Hours</dt>
              <dd className="text-cream text-right">24 / 7</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-cream/60">Audience</dt>
              <dd className="text-cream text-right">Caribbean diaspora worldwide</dd>
            </div>
          </dl>

          <div className="mt-6 flex h-2 w-full rounded-full overflow-hidden flag-stripes" aria-hidden="true" />
          <p className="mt-3 text-xs text-cream/50">
            Inspired by — and in solidarity with — the Caribbean communities
            that built this sound.
          </p>
        </div>
      </div>
    </section>
  );
}
