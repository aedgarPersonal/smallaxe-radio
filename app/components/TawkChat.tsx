"use client";

import { useEffect, useRef, useState } from "react";
import { STATION } from "@/app/config/station";

declare global {
  interface Window {
    Tawk_API?: {
      maximize?: () => void;
      minimize?: () => void;
      toggle?: () => void;
      hideWidget?: () => void;
      showWidget?: () => void;
      onLoad?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

function loadTawk(propertyId: string, widgetId: string) {
  if (typeof window === "undefined") return;
  if (document.getElementById("tawk-script")) return;
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  const s = document.createElement("script");
  s.id = "tawk-script";
  s.async = true;
  s.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
  s.charset = "UTF-8";
  s.setAttribute("crossorigin", "*");
  document.body.appendChild(s);
}

export function TawkChat() {
  const { tawkPropertyId, tawkWidgetId } = STATION.chat;
  const enabled = !!tawkPropertyId && !!tawkWidgetId;
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (enabled) loadTawk(tawkPropertyId, tawkWidgetId);
  }, [enabled, tawkPropertyId, tawkWidgetId]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const onClick = () => {
    if (enabled) {
      window.Tawk_API?.maximize?.();
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label="Open live chat"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-green text-cream px-5 py-3 shadow-xl hover:bg-green-bright transition-colors"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2Z" />
        </svg>
        <span className="text-sm font-medium">Chat</span>
      </button>

      {!enabled && (
        <dialog
          ref={dialogRef}
          onClose={() => setOpen(false)}
          className="max-w-md w-[92vw] rounded-2xl bg-ink-2 text-cream border border-white/10 p-0 backdrop:bg-black/70"
        >
          <div className="p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-2xl text-gold">
                Live chat — coming soon
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-cream/60 hover:text-cream text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="mt-3 text-cream/75 leading-relaxed text-sm">
              We&apos;re wiring up a live chat so you can connect with DJs and
              fellow listeners during shows. In the meantime, get in touch
              directly:
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`tel:+1${STATION.contact.landline.replace(/\D/g, "")}`}
                  className="text-gold hover:underline"
                >
                  Landline: {STATION.contact.landline}
                </a>
              </li>
              <li>
                <a
                  href={`sms:+1${STATION.contact.mobile.replace(/\D/g, "")}`}
                  className="text-gold hover:underline"
                >
                  Call or text: {STATION.contact.mobile}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STATION.contact.email}`}
                  className="text-gold hover:underline"
                >
                  Email: {STATION.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </dialog>
      )}
    </>
  );
}
