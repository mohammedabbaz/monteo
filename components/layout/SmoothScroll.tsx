"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { scrollToTop } from "@/lib/scroll";

/**
 * Global smooth-scroll engine (Lenis) + adaptive font scaling above 1920px,
 * faithfully ported from the original single-file site.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  // Adaptive scaling grid mechanism (>1920px screens)
  useEffect(() => {
    const applyAdaptiveGrid = () => {
      const FONT_BASE = 16;
      const baseWidth = 1920;
      const coef = 0.6666;
      const w = window.innerWidth;
      const widthReduction = ((baseWidth - w) / baseWidth) * 100;
      const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;
      if (size > FONT_BASE) {
        document.documentElement.style.fontSize = size + "px";
      } else {
        document.documentElement.style.removeProperty("font-size");
      }
    };
    applyAdaptiveGrid();
    window.addEventListener("resize", applyAdaptiveGrid);
    return () => window.removeEventListener("resize", applyAdaptiveGrid);
  }, []);

  // Lenis smooth wheel physics
  useEffect(() => {
    let rafId = 0;
    let instance: Lenis | null = null;

    try {
      window.scrollTo(0, 0);
      // Only enable Lenis virtual scrolling on fine-pointer (mouse/trackpad)
      // devices. On touch devices, native momentum scrolling must be preserved
      // — hijacking it breaks mobile scrolling entirely.
      const isFinePointer =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: fine)").matches;

      if (!isFinePointer) {
        instance = null;
      } else {
        instance = new Lenis({ smoothWheel: true });
        window.__lenis = instance;
        const raf = (time: number) => {
          instance?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      }
    } catch (e) {
      console.warn("Lenis scroll fallback", e);
    }

    return () => {
      cancelAnimationFrame(rafId);
      instance?.destroy();
      window.__lenis = null;
    };
  }, []);

  // Reset scroll position on route change (immediate, like the SPA views)
  useEffect(() => {
    scrollToTop(true);
  }, [pathname]);

  return null;
}