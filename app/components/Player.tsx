"use client";

import { useEffect, useRef, useState } from "react";
import { STATION } from "@/app/config/station";

type NowPlaying = {
  online: boolean;
  title: string | null;
  stationName: string;
  description: string;
  genre: string | null;
  listeners: number;
  bitrate: number | null;
};

export function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let stop = false;
    const tick = async () => {
      try {
        const r = await fetch("/api/now-playing", { cache: "no-store" });
        if (!r.ok) return;
        const j = (await r.json()) as NowPlaying;
        if (!stop) setInfo(j);
      } catch {
        // swallow — just stays on previous state
      }
    };
    tick();
    const iv = setInterval(tick, 15_000);
    return () => {
      stop = true;
      clearInterval(iv);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    setError(null);
    if (playing) {
      el.pause();
      // Force re-fetch next time — live streams shouldn't resume from buffered.
      el.removeAttribute("src");
      el.load();
      setPlaying(false);
      return;
    }
    setLoading(true);
    // Connect the audio element directly to the upstream HTTPS stream. This
    // keeps audio bytes off the Vercel function path entirely.
    // Cache-bust so the browser always opens a fresh stream instead of
    // replaying stale buffer.
    const sep = STATION.streamUrl.includes("?") ? "&" : "?";
    el.src = `${STATION.streamUrl}${sep}t=${Date.now()}`;
    try {
      await el.play();
      setPlaying(true);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Couldn't start stream. Try again.",
      );
      setPlaying(false);
    } finally {
      setLoading(false);
    }
  };

  const nowPlaying = info?.title ?? "Live stream";
  const listeners = info?.listeners ?? 0;

  return (
    <div className="rounded-3xl bg-ink-2/80 backdrop-blur border border-white/10 p-5 sm:p-7 shadow-2xl">
      <div className="flex items-center gap-3 text-xs font-display tracking-widest text-green-bright">
        <span
          className={`inline-block h-2.5 w-2.5 rounded-full bg-green-bright ${playing ? "live-dot" : ""}`}
        />
        <span>{playing ? "ON AIR" : info?.online ? "LIVE · STANDBY" : "OFFLINE"}</span>
        {info?.bitrate && (
          <span className="ml-auto text-cream/50 tracking-normal font-sans">
            {info.bitrate} kbps
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={toggle}
          disabled={loading}
          aria-label={playing ? "Pause stream" : "Play stream"}
          className="group h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-full bg-gold text-ink flex items-center justify-center shadow-lg hover:bg-green-bright hover:text-cream transition-colors disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-block h-5 w-5 border-2 border-ink/80 border-t-transparent rounded-full animate-spin" />
          ) : playing ? (
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-8 w-8 ml-1" fill="currentColor">
              <path d="M7 4.5v15a1 1 0 0 0 1.54.84l12-7.5a1 1 0 0 0 0-1.68l-12-7.5A1 1 0 0 0 7 4.5Z" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 h-4">
            {playing
              ? [0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="eq-bar inline-block w-1.5 bg-green-bright rounded-sm h-4"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))
              : null}
          </div>
          <div className="mt-1 text-xs uppercase tracking-widest text-cream/60 font-display">
            Now Playing
          </div>
          <div className="text-lg sm:text-xl font-semibold text-cream truncate">
            {nowPlaying}
          </div>
          <div className="mt-0.5 text-sm text-cream/60 truncate">
            {info?.genre ? `${info.genre} · ` : ""}
            {listeners} listener{listeners === 1 ? "" : "s"} tuned in
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-cream/70" fill="currentColor">
          <path d="M3 10v4a1 1 0 0 0 1 1h3l4.3 3.7A1 1 0 0 0 13 18V6a1 1 0 0 0-1.7-.7L7 9H4a1 1 0 0 0-1 1Z" />
          <path d="M16.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
          className="w-full accent-green-bright"
        />
      </div>

      {error && (
        <p className="mt-3 text-sm text-red/90" role="alert">
          {error}
        </p>
      )}

      {/* No crossOrigin attribute: the upstream Icecast doesn't send CORS
          headers, and simple playback doesn't need them. Setting
          crossOrigin="anonymous" would fail the CORS preflight and block
          audio entirely. */}
      <audio ref={audioRef} preload="none" />
    </div>
  );
}
