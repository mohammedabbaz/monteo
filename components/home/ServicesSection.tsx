import Link from "next/link";
import { SERVICES } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="services">
      <div className="shell">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
          }}
        >
          <div>
            <div className="eyebrow tone-dark reveal-fade-up">
              <span className="dot" />
              <span>Nos domaines d'expertise</span>
            </div>
            <h2 className="services-h2 reveal-fade-up" style={{ margin: "0.75rem 0 0.5rem" }}>
              Tout ce dont votre bâtiment a besoin.
            </h2>
            <p
              className="reveal-fade-up"
              style={{ color: "var(--muted)", fontSize: "0.9375rem", maxWidth: "48ch" }}
            >
              Cliquez sur un service pour explorer le détail des prestations, nos galeries photos de
              chantiers et nos forfaits transparents.
            </p>
          </div>
        </div>

        <div className="services-list reveal-stagger">
          {SERVICES.map((service) => (
            <div className="service-row-item" key={service.slug}>
              <Link href={`/services/${service.slug}`} className="service-row">
                <div className="service-index">{service.index}</div>
                <div className="service-title">{service.title}</div>
                <div className="service-desc">{service.shortDesc}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div className="service-badge icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}