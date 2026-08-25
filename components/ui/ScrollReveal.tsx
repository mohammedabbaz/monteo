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
    const REVEAL_SELECTOR =
      ".reveal-fade-up, .reveal-scale-up, .reveal-stagger";

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

    const scan = () => {
      document
        .querySelectorAll(REVEAL_SELECTOR)
        .forEach((el) => {
          if (!el.classList.contains("active")) observer.observe(el);
        });
    };

    // Catch elements mounted AFTER this effect runs (e.g. Suspense-resolved
    // client components like DevisWizard that hydrate late).
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldScan = false;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (
              node.matches(REVEAL_SELECTOR) ||
              node.querySelector(REVEAL_SELECTOR)
            ) {
              shouldScan = true;
            }
          }
        });
      });
      if (shouldScan) scan();
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Initial pass + delayed passes for content that mounts right after
    // navigation/hydration (Suspense boundaries resolve asynchronously).
    scan();
    const raf = requestAnimationFrame(scan);
    const timeout = setTimeout(scan, 150);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}