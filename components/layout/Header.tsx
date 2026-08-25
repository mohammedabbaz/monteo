"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { scrollToElement, scrollToTop, startScroll, stopScroll } from "@/lib/scroll";

const NAV_ITEMS: { label: string; target: string }[] = [
  { label: "Accueil", target: "home" },
  { label: "Nos services", target: "services" },
  { label: "Urgence 24/7", target: "emergency-band" },
  { label: "Réalisations", target: "works" },
  { label: "À propos", target: "about" },
  { label: "FAQ", target: "faq" },
];

const MENU_ITEMS = [...NAV_ITEMS];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Entrance animation after the page loader finishes
  useEffect(() => {
    if (document.documentElement.dataset.monteoLoaded === "true") {
      setReady(true);
      return;
    }
    const onReady = () => setReady(true);
    window.addEventListener("monteo:ready", onReady);
    return () => window.removeEventListener("monteo:ready", onReady);
  }, []);

  const goToSection = useCallback(
    (target: string) => {
      setMenuOpen(false);
      startScroll();
      window.dispatchEvent(new CustomEvent("monteo:menu", { detail: false }));

      const doScroll = () => {
        if (target === "home" || !target) {
          scrollToTop();
          return;
        }
        const el = document.getElementById(target);
        if (el) scrollToElement(el);
      };

      if (pathname !== "/") {
        router.push("/");
        setTimeout(doScroll, 450);
      } else {
        setTimeout(doScroll, 60);
      }
    },
    [pathname, router]
  );

  const goHome = useCallback(() => {
    setMenuOpen(false);
    startScroll();
    window.dispatchEvent(new CustomEvent("monteo:menu", { detail: false }));
    if (pathname !== "/") {
      router.push("/");
    } else {
      scrollToTop();
    }
  }, [pathname, router]);

  const openMenu = () => {
    setMenuOpen(true);
    stopScroll();
    window.dispatchEvent(new CustomEvent("monteo:menu", { detail: true }));
  };

  const closeMenu = () => {
    setMenuOpen(false);
    startScroll();
    window.dispatchEvent(new CustomEvent("monteo:menu", { detail: false }));
  };

  // Escape closes the fullscreen menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

  return (
    <>
      <header id="header" className={ready ? "ready" : undefined}>
        <div className="shell">
          <div className="header-inner">
            <button className="brand-btn" onClick={goHome} aria-label="MONTÉO Accueil">
              <span className="icon" style={{ color: "var(--accent)", fontSize: "1.5rem" }}>
                <svg viewBox="0 0 32 32">
                  <path d="M16 3C11 11 7 16.5 7 21a9 9 0 0 0 18 0c0-4.5-4-10-9-18zm0 7l4 7h-3v5h-2v-5h-3l4-7z" />
                </svg>
              </span>
              <div>
                <span>MONTÉO</span>
                <span className="brand-sub">Plomberie & Électricité</span>
              </div>
            </button>

            <nav aria-label="Navigation Principale">
              <ul className="nav-list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.target}>
                    <button className="nav-item" onClick={() => goToSection(item.target)}>
                      {item.label}
                    </button>
                  </li>
                ))}
                <li>
                  <Link className="nav-item" href="/devis">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="header-right">
              <Link href="/devis" className="header-cta-btn" aria-label="Demander un devis gratuit">
                <span>Devis express</span>
                <span className="icon" style={{ fontSize: "0.8125rem" }}>
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </Link>

              {/* Mobile Only Menu Button: Hidden on Large Screens */}
              <button className="menu-btn" onClick={openMenu} aria-label="Ouvrir le menu">
                <span className="icon" style={{ fontSize: "1rem" }}>
                  <svg viewBox="0 0 24 24">
                    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="menu-btn-label">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Navigation Menu Overlay */}
      <div
        id="nav-menu"
        className={menuOpen ? "open" : undefined}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        <div className="shell" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div className="menu-top-bar">
            <button className="brand-btn" onClick={goHome} aria-label="MONTÉO Accueil">
              <span className="icon" style={{ color: "var(--accent)", fontSize: "1.5rem" }}>
                <svg viewBox="0 0 32 32">
                  <path d="M16 3C11 11 7 16.5 7 21a9 9 0 0 0 18 0c0-4.5-4-10-9-18zm0 7l4 7h-3v5h-2v-5h-3l4-7z" />
                </svg>
              </span>
              <span style={{ color: "#fff", fontWeight: 700, letterSpacing: "-0.02em" }}>MONTÉO</span>
            </button>

            <button className="menu-close-btn" onClick={closeMenu} aria-label="Fermer le menu">
              <span className="icon" style={{ fontSize: "1rem" }}>
                <svg viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
              <span>Fermer</span>
            </button>
          </div>

          <div className="menu-body">
            <div className="menu-items">
              {MENU_ITEMS.map((item, i) => (
                <button key={item.target} className="menu-item-btn" onClick={() => goToSection(item.target)}>
                  <span className="menu-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="menu-txt">{item.label}</span>
                </button>
              ))}
              <button
                className="menu-item-btn"
                onClick={() => {
                  setMenuOpen(false);
                  startScroll();
                  window.dispatchEvent(new CustomEvent("monteo:menu", { detail: false }));
                  router.push("/devis");
                }}
              >
                <span className="menu-num">07</span>
                <span className="menu-txt" style={{ color: "var(--accent-light)" }}>
                  Demander un devis
                </span>
              </button>
            </div>

            <div
              style={{
                marginTop: "1.5rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <a href="tel:0467000000" className="phone-btn" style={{ width: "100%", justifyContent: "center" }}>
                <span className="icon">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>
                <span>Appel direct : 04 67 00 00 00</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}