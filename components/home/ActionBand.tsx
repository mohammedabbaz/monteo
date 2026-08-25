export function ActionBand() {
  return (
    <section id="create-band">
      <div className="shell">
        <div className="band-list reveal-stagger">
          <div className="band-item">
            <div className="band-tile tile-light">On</div>
          </div>
          <div className="band-item">
            <div className="band-tile tile-accent">Répare</div>
          </div>
          <div className="band-item">
            <div className="band-tile tile-dark">→</div>
          </div>
          <div className="band-item">
            <div className="band-tile tile-light">Mieux</div>
          </div>
        </div>
      </div>
    </section>
  );
}