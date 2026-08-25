import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  return window.__lenis ?? null;
}

/** Lock page scrolling (used by loader & fullscreen menu). */
export function stopScroll() {
  const lenis = getLenis();
  if (lenis) lenis.stop();
  document.body.style.overflow = "hidden";
}

/** Release page scrolling. Always clears any leftover overflow locks. */
export function startScroll() {
  const lenis = getLenis();
  if (lenis) lenis.start();
  document.body.style.removeProperty("overflow");
  document.documentElement.style.removeProperty("overflow");
}

export function scrollToTop(immediate = false) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }
}

export function scrollToElement(el: HTMLElement, offset = -60) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}