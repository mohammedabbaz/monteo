const TESTIMONIALS = [
  {
    text: "Intervention extrêmement rapide. Le technicien a trouvé la fuite en quelques minutes et le travail était impeccable.",
    author: "Sophie M.",
    city: "Montpellier",
  },
  {
    text: "Très professionnel du premier appel jusqu'à la fin du chantier. Nous recommandons sans hésiter.",
    author: "Thomas R.",
    city: "Castelnau-le-Lez",
  },
  {
    text: "Installation électrique réalisée proprement et dans les délais annoncés.",
    author: "Claire D.",
    city: "Lattes",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials">
      <div className="shell">
        <div className="eyebrow tone-dark reveal-fade-up">
          <span className="dot" />
          <span>Avis clients</span>
        </div>
        <h2 className="testimonials-h2 reveal-fade-up">Ils parlent de leur expérience.</h2>

        <div className="testimonials-grid reveal-stagger">
          {TESTIMONIALS.map((t) => (
            <div className="testimonial-card" key={t.author}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div>
                <div className="testimonial-author">{t.author}</div>
                <div className="testimonial-city">{t.city}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}