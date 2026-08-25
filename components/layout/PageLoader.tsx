"use client";

import { useEffect, useState } from "react";
import { startScroll } from "@/lib/scroll";

const SPLASH_MS = 1300;

/**
 * Branded splash screen with logo + slogan animations.
 * Locks scrolling while visible, then slides away and broadcasts
 * a `monteo:ready` window event that triggers hero entrance animations.
 */
export function PageLoader() {
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Already played once (e.g. remount after HMR) — skip entirely
    if (document.documentElement.dataset.monteoLoaded === "true") {
      setGone(true);
      return;
    }

    document.body.style.overflow = "hidden";
    // Hide the scrollbar (html + body) while the splash is visible
    document.documentElement.style.overflow = "hidden";

    const exitTimer = setTimeout(() => {
      setExiting(true);
      document.documentElement.dataset.monteoLoaded = "true";
      window.dispatchEvent(new CustomEvent("monteo:ready"));
      startScroll();
      setTimeout(() => setGone(true), 800);
    }, SPLASH_MS);

    return () => {
      clearTimeout(exitTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      id="page-loader"
      className={exiting ? "exit" : undefined}
      role="dialog"
      aria-modal="true"
      aria-label="Chargement de MONTÉO"
    >
      <div className="loader-center">
        <div className="loader-brand">
          <span className="icon" style={{ color: "var(--accent-light)" }}>
            <svg viewBox="0 0 32 32">
              <path d="M16 3C11 11 7 16.5 7 21a9 9 0 0 0 18 0c0-4.5-4-10-9-18zm0 7l4 7h-3v5h-2v-5h-3l4-7z" />
            </svg>
          </span>
          <span>MONTÉO</span>
        </div>
        <p className="loader-tagline">
          Des interventions fiables. Des installations pensées pour durer.
        </p>
      </div>
    </div>
  );
}