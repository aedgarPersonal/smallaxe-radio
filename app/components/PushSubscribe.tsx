"use client";

import { useEffect, useState } from "react";

type Status = "unsupported" | "denied" | "unsubscribed" | "subscribed" | "loading";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const b64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

export function PushSubscribe() {
  const [status, setStatus] = useState<Status>("loading");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (
        typeof window === "undefined" ||
        !("serviceWorker" in navigator) ||
        !("PushManager" in window) ||
        !("Notification" in window)
      ) {
        setStatus("unsupported");
        return;
      }
      if (Notification.permission === "denied") {
        setStatus("denied");
        return;
      }
      try {
        const reg = await navigator.serviceWorker.ready;
        const existing = await reg.pushManager.getSubscription();
        if (cancelled) return;
        setStatus(existing ? "subscribed" : "unsubscribed");
      } catch {
        setStatus("unsubscribed");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const subscribe = async () => {
    setMsg(null);
    setStatus("loading");
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("denied");
        setMsg("Notifications blocked. Enable them in your browser settings.");
        return;
      }
      const keyRes = await fetch("/api/push/vapid-key");
      const { publicKey } = (await keyRes.json()) as { publicKey: string };
      if (!publicKey) {
        setStatus("unsubscribed");
        setMsg("Push isn't configured on the server yet. Try again soon.");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      const json = sub.toJSON() as {
        endpoint: string;
        keys: { p256dh: string; auth: string };
      };
      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });
      if (!res.ok) throw new Error(`subscribe ${res.status}`);
      setStatus("subscribed");
      setMsg("You're in — we'll ping you when shows go live.");
    } catch (e) {
      setStatus("unsubscribed");
      setMsg(e instanceof Error ? e.message : "Couldn't subscribe. Try again.");
    }
  };

  const unsubscribe = async () => {
    setMsg(null);
    setStatus("loading");
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setStatus("unsubscribed");
      setMsg("Notifications off. Come back anytime.");
    } catch {
      setStatus("subscribed");
      setMsg("Couldn't turn off notifications. Try again.");
    }
  };

  let label = "Enable alerts";
  let action: (() => void) | null = subscribe;
  let tone = "border-green-bright/60 text-green-bright hover:bg-green-bright hover:text-ink";

  if (status === "loading") {
    label = "…";
    action = null;
  } else if (status === "subscribed") {
    label = "Alerts on — tap to turn off";
    action = unsubscribe;
    tone = "border-gold/60 text-gold hover:bg-gold hover:text-ink";
  } else if (status === "denied") {
    label = "Alerts blocked by browser";
    action = null;
    tone = "border-red/40 text-red/80";
  } else if (status === "unsupported") {
    return null;
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={action ?? undefined}
        disabled={!action}
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 ${tone}`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12 2a6 6 0 0 0-6 6v3.3L4 15h16l-2-3.7V8a6 6 0 0 0-6-6Zm0 20a3 3 0 0 0 3-3H9a3 3 0 0 0 3 3Z" />
        </svg>
        {label}
      </button>
      {msg && <p className="mt-2 text-xs text-cream/60">{msg}</p>}
    </div>
  );
}
