import { Player } from "@/app/components/Player";
import { Schedule } from "@/app/components/Schedule";
import { Sponsors } from "@/app/components/Sponsors";
import { About } from "@/app/components/About";
import { Contact } from "@/app/components/Contact";
import { Support } from "@/app/components/Support";
import { TawkChat } from "@/app/components/TawkChat";
import { STATION } from "@/app/config/station";

export default function Home() {
  const thisYear = new Date().getFullYear();
  const copyYears =
    thisYear > STATION.copyrightSince
      ? `${STATION.copyrightSince}–${thisYear}`
      : `${STATION.copyrightSince}`;

  return (
    <>
      <header className="relative overflow-hidden caribbean-gradient">
        <div className="absolute inset-x-0 top-0 h-1 flag-stripes" aria-hidden />
        <nav className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="inline-flex h-9 px-2 items-center justify-center rounded-lg bg-gold text-ink font-display text-base tracking-widest">
              WSM
            </span>
            <span className="font-display text-xl tracking-wider">
              {STATION.name}
            </span>
          </a>
          <div className="hidden sm:flex items-center gap-6 text-sm text-cream/80">
            <a href="#schedule" className="hover:text-gold transition-colors">
              Schedule
            </a>
            <a href="#sponsors" className="hover:text-gold transition-colors">
              Spotlight
            </a>
            <a href="#about" className="hover:text-gold transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-gold transition-colors">
              Contact
            </a>
            <a
              href={STATION.donate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold text-ink px-4 py-1.5 font-medium hover:bg-green-bright hover:text-cream transition-colors"
            >
              {STATION.donate.label}
            </a>
          </div>
        </nav>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-14 pb-16 sm:pt-24 sm:pb-24 grid gap-10 lg:grid-cols-[1.2fr_1fr] items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-display tracking-[0.3em] text-gold">
              <span className="inline-block h-2 w-2 rounded-full bg-red" />
              LIVE FROM THE 6IX TO THE WORLD
            </p>
            <h1 className="mt-5 font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.95] text-cream">
              Caribbean sounds{" "}
              <span className="text-green-bright">from the</span>{" "}
              <span className="text-gold">North</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/75 leading-relaxed">
              {STATION.description}
            </p>
          </div>

          <Player />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <Schedule />
        <Sponsors />
        <Support />
        <About />
        <Contact />
      </main>

      <TawkChat />

      <footer className="mt-20 border-t border-white/10">
        <div className="h-1 flag-stripes" aria-hidden />
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 grid gap-6 sm:grid-cols-[1fr_auto] items-center">
          <div className="text-sm text-cream/60 space-y-1">
            <div>
              Copyright © {copyYears} riddimwsm. All rights reserved.
            </div>
            <div className="text-cream/40 italic text-xs">
              The views expressed by the hosts of the various shows are not
              necessarily the views of Riddim WSM.
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-cream/60">
            {STATION.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="hover:text-gold transition-colors"
              >
                {s.label}
              </a>
            ))}
            <a
              href="https://github.com/aedgarPersonal/smallaxe-radio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              Source
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
