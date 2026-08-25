import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable (404) — MONTÉO",
  description:
    "La page que vous recherchez n'existe pas ou a été déplacée. Retrouvez nos services de plomberie et électricité à Montpellier.",
};

const QUICK_LINKS = [
  { href: "/devis", label: "Demander un devis gratuit" },
  { href: "/services/plomberie", label: "Plomberie & Sanitaire" },
  { href: "/services/electricite", label: "Électricité & Normes" },
];

export default function NotFound() {
  return (
    <div id="not-found-view">
      {/* Ambient animated background blobs */}
      <div className="nf-bg" aria-hidden="true">
        <span className="nf-blob nf-blob-1" />
        <span className="nf-blob nf-blob-2" />
        <span className="nf-grid" />
      </div>

      <div className="shell nf-shell">
        <div className="nf-card">
          <div className="eyebrow tone-dark nf-eyebrow">
            <span className="dot pulse-dot" />
            <span>Erreur 404 — Page introuvable</span>
          </div>

          {/* Giant animated 404 */}
          <div className="nf-code" aria-hidden="true">
            <span className="nf-digit">4</span>
            <span className="nf-wrench">
              <svg viewBox="0 0 24 24">
                <path
                  d="M14.7 6.3a4.5 4.5 0 0 0-6.09 5.63L3 17.59 6.41 21l5.66-5.61a4.5 4.5 0 0 0 5.63-6.09l-2.83 2.83-2.12-.71-.71-2.12 2.66-3z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="nf-digit">4</span>
          </div>

          <h1 className="nf-title">Cette page a fui…</h1>
          <p className="nf-text">
            Pas de panique : chez MONTÉO, les fuites, on sait les réparer.
            La page que vous cherchez n'existe plus ou a été déplacée.
          </p>

          <div className="nf-actions">
            <Link href="/" className="pill-btn has-arrow btn-accent nf-btn">
              <span>Retour à l'accueil</span>
              <span className="arrow-badge arrow-right icon">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </Link>
            <a href="tel:0467000000" className="pill-btn no-arrow btn-outline nf-btn">
              <span>Urgence : 04 67 00 00 00</span>
            </a>
          </div>

          {/* Staggered quick links */}
          <div className="nf-links">
            {QUICK_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="nf-link-item"
                style={{ animationDelay: `${0.9 + i * 0.15}s` }}
              >
                <span className="nf-link-arrow">→</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
