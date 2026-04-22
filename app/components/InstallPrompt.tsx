"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "riddim-install-dismissed-at";
const DISMISS_MS = 1000 * 60 * 60 * 24 * 14; // 14 days

function detectPlatform() {
  if (typeof navigator === "undefined")
    return { isMobile: false, isIOS: false, isAndroid: false, isStandalone: false };
  const ua = navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isMobile = isIOS || isAndroid;
  const isStandalone =
    window.matchMedia?.("(display-mode: standalone)").matches ||
    // iOS Safari
    (navigator as unknown as { standalone?: boolean }).standalone === true;
  return { isMobile, isIOS, isAndroid, isStandalone };
}

function recentlyDismissed() {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < DISMISS_MS;
  } catch {
    return false;
  }
}

export function InstallPrompt({ asButton = false }: { asButton?: boolean }) {
  const [platform, setPlatform] = useState({
    isMobile: false,
    isIOS: false,
    isAndroid: false,
    isStandalone: false,
  });
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [banner, setBanner] = useState<null | "android" | "ios">(null);
  const [modal, setModal] = useState<null | "ios" | "desktop">(null);

  useEffect(() => {
    const p = detectPlatform();
    setPlatform(p);

    // Register the service worker — required for the PWA to be installable
    // and to receive push messages.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* ignore */
      });
    }

    const onBIP = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
      if (p.isMobile && !p.isStandalone && !recentlyDismissed()) {
        setBanner("android");
      }
    };
    window.addEventListener("beforeinstallprompt", onBIP);

    // On iOS there is no beforeinstallprompt — show our own banner.
    if (p.isIOS && !p.isStandalone && !recentlyDismissed()) {
      setBanner("ios");
    }

    return () => window.removeEventListener("beforeinstallprompt", onBIP);
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setBanner(null);
  };

  const runInstall = async () => {
    if (promptEvent) {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === "accepted") setBanner(null);
      setPromptEvent(null);
      return;
    }
    if (platform.isIOS) {
      setModal("ios");
      return;
    }
    setModal("desktop");
  };

  // --- Button mode: used in the nav ---
  if (asButton) {
    if (platform.isStandalone) return null;
    return (
      <>
        <button
          type="button"
          onClick={runInstall}
          className="rounded-full border border-green-bright/60 text-green-bright px-4 py-1.5 text-sm font-medium hover:bg-green-bright hover:text-ink transition-colors flex items-center gap-1.5"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M12 3a1 1 0 0 1 1 1v9.6l3.3-3.3a1 1 0 0 1 1.4 1.4l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.4L11 13.6V4a1 1 0 0 1 1-1Zm-7 16a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1Z" />
          </svg>
          Get the app
        </button>
        <InstallModal modal={modal} setModal={setModal} />
      </>
    );
  }

  // --- Banner mode: auto-shown on mobile ---
  if (!banner || platform.isStandalone) return null;

  return (
    <div
      role="dialog"
      aria-label="Install Riddim WSM"
      className="fixed inset-x-3 bottom-3 z-40 sm:left-auto sm:right-5 sm:bottom-5 sm:w-[360px] rounded-2xl bg-ink-2 border border-gold/40 shadow-2xl p-4 flex items-start gap-3"
    >
      <div className="h-10 w-10 shrink-0 rounded-lg bg-gold text-ink font-display flex items-center justify-center text-sm tracking-widest">
        WSM
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display text-base text-cream leading-tight">
          Install Riddim WSM
        </p>
        <p className="mt-1 text-xs text-cream/70 leading-snug">
          {banner === "ios"
            ? "Tap Share, then “Add to Home Screen”."
            : "Add to your home screen for quick access and show alerts."}
        </p>
        <div className="mt-3 flex items-center gap-2">
          {banner === "android" && (
            <button
              type="button"
              onClick={runInstall}
              className="rounded-full bg-gold text-ink text-xs font-semibold px-3 py-1.5 hover:bg-green-bright hover:text-cream transition-colors"
            >
              Install
            </button>
          )}
          {banner === "ios" && (
            <button
              type="button"
              onClick={() => setModal("ios")}
              className="rounded-full bg-gold text-ink text-xs font-semibold px-3 py-1.5 hover:bg-green-bright hover:text-cream transition-colors"
            >
              Show me how
            </button>
          )}
          <button
            type="button"
            onClick={dismiss}
            className="text-xs text-cream/60 hover:text-cream transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="text-cream/50 hover:text-cream text-xl leading-none"
      >
        ×
      </button>
      <InstallModal modal={modal} setModal={setModal} />
    </div>
  );
}

function InstallModal({
  modal,
  setModal,
}: {
  modal: null | "ios" | "desktop";
  setModal: (m: null | "ios" | "desktop") => void;
}) {
  if (!modal) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-4"
      onClick={() => setModal(null)}
    >
      <div
        className="max-w-md w-full rounded-2xl bg-ink-2 border border-white/10 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-2xl text-gold">
            {modal === "ios" ? "Add to iPhone" : "Install on desktop"}
          </h3>
          <button
            type="button"
            onClick={() => setModal(null)}
            aria-label="Close"
            className="text-cream/60 hover:text-cream text-2xl leading-none"
          >
            ×
          </button>
        </div>
        {modal === "ios" ? (
          <ol className="mt-4 space-y-3 text-sm text-cream/80 list-decimal list-inside">
            <li>
              Open this page in <strong>Safari</strong> (other browsers won&apos;t work).
            </li>
            <li>
              Tap the <strong>Share</strong> icon at the bottom of the screen.
            </li>
            <li>
              Scroll down and tap <strong>Add to Home Screen</strong>.
            </li>
            <li>Tap <strong>Add</strong> in the top-right.</li>
          </ol>
        ) : (
          <ol className="mt-4 space-y-3 text-sm text-cream/80 list-decimal list-inside">
            <li>
              In Chrome or Edge, click the <strong>install</strong> icon in the
              address bar (looks like a monitor with an arrow).
            </li>
            <li>Confirm the install dialog.</li>
            <li>
              Safari on macOS: File menu → <strong>Add to Dock</strong>.
            </li>
          </ol>
        )}
      </div>
    </div>
  );
}
