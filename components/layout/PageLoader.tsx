"use client";

import { useEffect, useRef, useState } from "react";
import { startScroll } from "@/lib/scroll";

const FILL_MS = 1300;

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/**
 * Branded page loader with eased progress counter.
 * Locks scrolling while visible, then slides away and broadcasts
 * a `monteo:ready` window event that triggers hero entrance animations.
 */
export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    // Already played once (e.g. remount after HMR) — skip entirely
    if (document.documentElement.dataset.monteoLoaded === "true") {
      setGone(true);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    startedRef.current = true;

    document.body.style.overflow = "hidden";

    const step = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const rawProgress = Math.min(elapsed / FILL_MS, 1);
      const val = Math.round(easeInOutCubic(rawProgress) * 100);
      setProgress(val);

      if (rawProgress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setExiting(true);
          document.documentElement.dataset.monteoLoaded = "true";
          window.dispatchEvent(new CustomEvent("monteo:ready"));
          startScroll();
          setTimeout(() => setGone(true), 800);
        }, 200);
      }
    };
    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
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
      <div className="loader-progress-box">
        <div className="loader-track">
          <div className="loader-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader-info">
          <span>Montpellier</span>
          <span className="loader-counter">
            {String(progress).padStart(3, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}