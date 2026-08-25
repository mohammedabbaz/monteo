const CLIENTS = [
  "Résidences",
  "Commerces",
  "Restaurants",
  "Bureaux",
  "Syndics",
  "Propriétaires",
];

export function TrustBar() {
  return (
    <section id="trust-bar" className="reveal-fade-up">
      <div className="shell">
        <div className="trust-bar-inner">
          <div className="trust-bar-label reveal-fade-up">Ils nous font confiance</div>
          <div className="trust-bar-logos reveal-stagger">
            {CLIENTS.map((client) => (
              <div className="trust-logo-item" key={client}>
                <span className="icon" style={{ color: "var(--accent)" }}>
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}