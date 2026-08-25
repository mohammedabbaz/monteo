import Link from "next/link";
import { SERVICES } from "@/data/services";

export function Footer() {
  return (
    <footer id="footer">
      <div className="shell">
        <div className="footer-inner">
          <div className="footer-cta-row reveal-fade-up">
            <div>
              <div className="eyebrow tone-light">
                <span className="dot" style={{ background: "var(--accent-light)" }} />
                <span>Besoin d'un artisan qualifié ?</span>
              </div>
              <h2 className="footer-h2">Une urgence ? Un projet ? Parlons-en ensemble.</h2>
            </div>
            <div>
              <Link href="/devis" className="pill-btn has-arrow btn-accent">
                <span>Demander un devis express</span>
                <span className="arrow-badge arrow-right icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          <div className="footer-columns reveal-fade-up">
            <div>
              <div className="col-title">MONTÉO</div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  maxWidth: "26ch",
                  marginBottom: "1rem",
                }}
              >
                Artisans plombiers et électriciens qualifiés à Montpellier. Dépannage express 7j/7,
                mise aux normes et rénovation.
              </p>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
                Assurance Décennale AXA • Normes DTU & NF
              </div>
            </div>

            <div>
              <div className="col-title">Services</div>
              <div className="col-links">
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`}>
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="col-title">Zone d'intervention</div>
              <div className="col-links">
                <span>Montpellier (34000)</span>
                <span>Castelnau-le-Lez</span>
                <span>Lattes & Pérols</span>
                <span>Juvignac & Saint-Jean-de-Védas</span>
              </div>
            </div>

            <div>
              <div className="col-title">Contact & Urgence</div>
              <div className="col-links">
                <a href="tel:0467000000" style={{ color: "var(--accent-light)", fontWeight: 600 }}>
                  04 67 00 00 00
                </a>
                <span>Astreinte 24h/24 & 7j/7</span>
                <span>Montpellier Méditerranée Métropole</span>
                <a href="mailto:contact@monteo.fr">contact@monteo.fr</a>
              </div>
            </div>
          </div>

          <div className="footer-legal-bar">
            <div>© 2026 MONTÉO — Plomberie & Électricité. Tous droits réservés.</div>
            <div>Garantie Décennale • Mentions légales • Réalisation locale</div>
          </div>

          <div className="footer-watermark" aria-hidden="true">
            MONTÉO
          </div>
        </div>
      </div>
    </footer>
  );
}