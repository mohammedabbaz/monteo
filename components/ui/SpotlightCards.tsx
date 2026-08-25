"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Card spotlight sheen pseudo-lighting.
 * Tracks the pointer over every .spotlight-card and feeds --mouse-x/--mouse-y
 * to the radial-gradient sheen defined in CSS.
 */
export function SpotlightCards() {
  const pathname = usePathname();

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".spotlight-card")
    );

    const handlers = new WeakMap<
      HTMLElement,
      (e: PointerEvent) => void
    >();

    cards.forEach((card) => {
      const onMove = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      };
      handlers.set(card, onMove);
      card.addEventListener("pointermove", onMove);
    });

    return () => {
      cards.forEach((card) => {
        const h = handlers.get(card);
        if (h) card.removeEventListener("pointermove", h);
      });
    };
  }, [pathname]);

  return null;
}