export function AboutSection() {
  return (
    <section id="about">
      <div className="shell">
        <div className="about-grid">
          <div className="about-graphic-box reveal-scale-up">
            <div className="about-graphic-watermark">M</div>
            <div className="graphic-center-cluster">
              <div className="cluster-icons">
                <div className="cluster-badge orange">
                  <span className="icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                  </span>
                </div>
                <div className="cluster-badge blue">
                  <span className="icon">
                    <svg viewBox="0 0 24 24">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </span>
                </div>
                <div className="cluster-badge dark">
                  <span className="icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textAlign: "center",
                  color: "var(--foreground)",
                }}
              >
                Savoir-faire artisanal & rigueur technique
              </div>
            </div>
          </div>

          <div className="about-statement">
            <div className="eyebrow tone-dark reveal-fade-up">
              <span className="dot" />
              <span>Notre savoir-faire</span>
            </div>

            <h2 className="about-h2 reveal-fade-up">
              Le bon geste, au bon moment, sans mauvaise surprise.
            </h2>

            <p className="about-p reveal-fade-up">
              MONTÉO accompagne les particuliers, professionnels et syndics à Montpellier et dans sa
              métropole pour tous leurs besoins en plomberie et électricité.
            </p>
            <p className="about-p reveal-fade-up">
              De l'urgence au chantier complet, nous privilégions un travail propre, transparent
              et durable.
            </p>

            <div className="about-pillars reveal-stagger">
              <div className="about-pillar-item">
                <div className="pillar-title">Équipe locale</div>
                <div className="pillar-desc">Artisans basés à Montpellier</div>
              </div>
              <div className="about-pillar-item">
                <div className="pillar-title">Expertise complète</div>
                <div className="pillar-desc">Plomberie & électricité certifiées</div>
              </div>
              <div className="about-pillar-item">
                <div className="pillar-title">Un seul interlocuteur</div>
                <div className="pillar-desc">Suivi clair du devis à la livraison</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}