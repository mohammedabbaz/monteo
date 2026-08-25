import Link from "next/link";

export function EmergencyBanner() {
  return (
    <section className="shell" id="emergency-band-anchor">
      <div id="emergency-band" className="reveal-scale-up">
        <div className="emergency-grid">
          <div className="emergency-left reveal-fade-up">
            <div className="eyebrow tone-light">
              <span className="pulse-dot" />
              <span>URGENT ?</span>
            </div>
            <h2 className="emergency-h2">
              Une fuite ?
              <br />
              Une panne ?
              <br />
              On intervient.
            </h2>
            <p className="emergency-p">
              Notre équipe intervient rapidement à Montpellier et dans les communes voisines 24h/24
              et 7j/7.
            </p>
          </div>

          <div className="emergency-actions reveal-fade-up">
            <a href="tel:0467000000" className="phone-btn">
              <span className="icon">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <span>04 67 00 00 00</span>
            </a>
            <Link
              href="/devis"
              className="pill-btn has-arrow btn-outline"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}
            >
              <span>Demander une intervention</span>
              <span className="arrow-badge arrow-right icon">
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}