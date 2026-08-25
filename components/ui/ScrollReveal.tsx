"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global scroll-triggered reveal engine.
 * Observes every .reveal-fade-up / .reveal-scale-up / .reveal-stagger element
 * and adds the .active class when it enters the viewport (threshold 0.12),
 * exactly like the original IntersectionObserver implementation.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const els = document.querySelectorAll(
      ".reveal-fade-up, .reveal-scale-up, .reveal-stagger"
    );
    els.forEach((el) => {
      if (!el.classList.contains("active")) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}