"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const INTERACTIVE_SELECTOR =
  "button, a, input, select, textarea, .pill-btn, .hero-card, .service-tab-btn, .service-thumb, .service-card, .testimonial-card, .work-card, .nav-item, .loc-pill, .stat-item, .hero-mini-pill, .emergency-badge";

/**
 * Custom interactive follower cursor (dot + lerped ring).
 * Ring grows over interactive targets (.cursor-hover), compresses on
 * pointer-down (.cursor-active) and can display a contextual label.
 */
export function CustomCursor() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    const label = document.getElementById("cursor-label");
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isVisible = false;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.classList.add("visible");
        ring.classList.add("visible");
      }
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const onDown = () => ring.classList.add("cursor-active");
    const onUp = () => ring.classList.remove("cursor-active");
    const onLeave = () => {
      dot.classList.remove("visible");
      ring.classList.remove("visible");
      isVisible = false;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);

    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    // Interactive hover growth
    const hoverTargets = Array.from(
      document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR)
    );
    const enterHandlers = new WeakMap<HTMLElement, () => void>();
    hoverTargets.forEach((el) => {
      const enter = () => ring.classList.add("cursor-hover");
      const leave = () => ring.classList.remove("cursor-hover");
      enterHandlers.set(el, leave);
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
    });

    // Contextual label on hero carousel card
    const carouselTile = document.getElementById("hero-card-click");
    let tileEnter: (() => void) | null = null;
    let tileLeave: (() => void) | null = null;
    if (carouselTile && label) {
      tileEnter = () => {
        ring.classList.add("has-label");
        label.textContent = "Changer";
      };
      tileLeave = () => {
        ring.classList.remove("has-label");
        label.textContent = "";
      };
      carouselTile.addEventListener("pointerenter", tileEnter);
      carouselTile.addEventListener("pointerleave", tileLeave);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      hoverTargets.forEach((el) => {
        const leave = enterHandlers.get(el);
        if (leave) el.removeEventListener("pointerleave", leave);
      });
      if (carouselTile && tileEnter && tileLeave) {
        carouselTile.removeEventListener("pointerenter", tileEnter);
        carouselTile.removeEventListener("pointerleave", tileLeave);
      }
    };
  }, [pathname]);

  return (
    <>
      <div className="custom-cursor-dot" id="cursor-dot" />
      <div className="custom-cursor-ring" id="cursor-ring">
        <span className="cursor-label" id="cursor-label" />
      </div>
    </>
  );
}