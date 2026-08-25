import Link from "next/link";
import { SERVICE_AREAS } from "@/data/areas";

export function AreaSection() {
  return (
    <section id="areas">
      <div className="shell">
        <div className="areas-grid">
          <div className="reveal-fade-up">
            <div className="eyebrow tone-dark">
              <span className="dot" />
              <span>Zone d'intervention</span>
            </div>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: 600,
                margin: "1rem 0",
                letterSpacing: "-0.02em",
              }}
            >
              Présents à Montpellier et autour.
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--muted)",
                lineHeight: 1.5,
                maxWidth: "28rem",
              }}
            >
              Nos techniciens sont déployés sur l'ensemble de la métropole pour garantir des délais
              d'intervention records.
            </p>
            <div style={{ marginTop: "2rem" }}>
              <Link href="/devis" className="pill-btn has-arrow btn-dark">
                <span>Vérifier ma zone</span>
                <span className="arrow-badge arrow-right icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          <div className="reveal-fade-up">
            <div className="locations-cluster reveal-stagger">
              {SERVICE_AREAS.map((area) => (
                <div className="loc-pill" key={area.name}>
                  <span className="loc-dot" />
                  {area.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}