"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Sticky mobile action bar (call + express quote), visible under 768px.
 * Hides while the fullscreen navigation menu is open.
 */
export function MobileStickyBar() {
  const router = useRouter();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.classList.add("has-sticky-bar");

    const onMenu = (e: Event) => {
      const open = (e as CustomEvent<boolean>).detail;
      setHidden(open);
    };
    window.addEventListener("monteo:menu", onMenu);
    return () => {
      window.removeEventListener("monteo:menu", onMenu);
      document.body.classList.remove("has-sticky-bar");
    };
  }, []);

  return (
    <div
      id="mobile-sticky-bar"
      className={`mobile-sticky-action-bar ${hidden ? "" : "is-visible"}`}
      aria-label="Actions rapides MONTÉO"
    >
      <div className="mobile-sticky-inner">
        <a
          href="tel:0467000000"
          className="mobile-sticky-call-btn"
          aria-label="Appeler l'urgence 24/7"
        >
          <span className="mobile-sticky-icon-wrap">
            <svg
              viewBox="0 0 24 24"
              style={{
                width: "17px",
                height: "17px",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2.2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }}
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </span>
          <div className="mobile-sticky-text">
            <span className="mobile-sticky-label">Urgence 24/7</span>
            <span className="mobile-sticky-val">04 67 00 00 00</span>
          </div>
        </a>
        <button
          className="mobile-sticky-quote-btn"
          onClick={() => router.push("/devis")}
          aria-label="Demander un devis express"
        >
          <span className="mobile-sticky-icon-wrap">
            <svg
              viewBox="0 0 24 24"
              style={{
                width: "17px",
                height: "17px",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2.2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </span>
          <div className="mobile-sticky-text">
            <span className="mobile-sticky-label">Devis Express</span>
            <span className="mobile-sticky-val">100% Gratuit</span>
          </div>
        </button>
      </div>
    </div>
  );
}