import { Player } from "@/app/components/Player";
import { Schedule } from "@/app/components/Schedule";
import { Sponsors } from "@/app/components/Sponsors";
import { About } from "@/app/components/About";
import { STATION } from "@/app/config/station";

export default function Home() {
  return (
    <>
      <header className="relative overflow-hidden caribbean-gradient">
        <div className="absolute inset-x-0 top-0 h-1 flag-stripes" aria-hidden />
        <nav className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-ink font-display text-lg">
              SA
            </span>
            <span className="font-display text-xl tracking-wider">
              {STATION.name}
            </span>
          </a>
          <div className="hidden sm:flex gap-6 text-sm text-cream/80">
            <a href="#schedule" className="hover:text-gold transition-colors">
              Schedule
            </a>
            <a href="#sponsors" className="hover:text-gold transition-colors">
              Sponsors
            </a>
            <a href="#about" className="hover:text-gold transition-colors">
              About
            </a>
          </div>
        </nav>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-14 pb-16 sm:pt-24 sm:pb-24 grid gap-10 lg:grid-cols-[1.2fr_1fr] items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-display tracking-[0.3em] text-gold">
              <span className="inline-block h-2 w-2 rounded-full bg-red" />
              LIVE FROM THE 6IX TO KINGSTON
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
        <About />
      </main>

      <footer className="mt-20 border-t border-white/10">
        <div className="h-1 flag-stripes" aria-hidden />
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-wrap gap-4 items-center justify-between text-sm text-cream/60">
          <div>
            © {new Date().getFullYear()} {STATION.name}. One love.
          </div>
          <div className="flex gap-4">
            {STATION.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
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
