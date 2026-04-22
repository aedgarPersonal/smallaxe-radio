import { InstallPrompt } from "@/app/components/InstallPrompt";
import { PushSubscribe } from "@/app/components/PushSubscribe";

export function GetTheApp() {
  return (
    <section id="app" className="py-16 sm:py-24 border-t border-white/10">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
        <div>
          <p className="text-sm font-display tracking-[0.3em] text-green-bright">
            GET THE APP
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display text-cream">
            Riddim in your pocket.
          </h2>
          <p className="mt-4 text-cream/75 leading-relaxed max-w-xl">
            Install Riddim WSM on your phone and we&apos;ll ping you when your
            favourite shows go live. No app store needed — it installs straight
            from this page.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <InstallPrompt asButton />
          </div>
          <PushSubscribe />
        </div>

        <ol className="rounded-2xl border border-white/10 bg-ink-2/60 p-5 sm:p-6 space-y-4 text-sm text-cream/80">
          <li className="flex gap-3">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green/25 text-green-bright font-display text-sm">
              1
            </span>
            <div>
              <p className="font-medium text-cream">Install from this page</p>
              <p className="mt-0.5 text-cream/60 text-xs">
                iPhone: Safari → Share → Add to Home Screen. Android: tap the
                <em> Get the app</em> button.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/25 text-gold font-display text-sm">
              2
            </span>
            <div>
              <p className="font-medium text-cream">Turn on alerts</p>
              <p className="mt-0.5 text-cream/60 text-xs">
                Tap <em>Enable alerts</em> and allow notifications when your
                browser asks.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red/25 text-red font-display text-sm">
              3
            </span>
            <div>
              <p className="font-medium text-cream">Never miss a show</p>
              <p className="mt-0.5 text-cream/60 text-xs">
                We&apos;ll send a nudge when shows go live, when a guest
                drops in, and for breaking community news.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
