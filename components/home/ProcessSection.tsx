const STEPS = [
  {
    num: "01",
    title: "Vous nous contactez",
    text: "Par téléphone ou en ligne en précisant votre demande et votre localisation.",
  },
  {
    num: "02",
    title: "Nous diagnostiquons",
    text: "Évaluation précise du besoin et établissement d'un devis clair et transparent.",
  },
  {
    num: "03",
    title: "Nous intervenons",
    text: "Déplacement rapide et exécution des travaux selon les normes de sécurité en vigueur.",
  },
  {
    num: "04",
    title: "Vous profitez",
    text: "Une installation pérenne, testée, propre et assortie de nos garanties professionnelles.",
  },
];

export function ProcessSection() {
  return (
    <section id="process">
      <div className="shell">
        <div className="eyebrow tone-dark reveal-fade-up">
          <span className="dot" />
          <span>Notre méthode</span>
        </div>

        <h2 className="process-h2 reveal-fade-up">
          Simple du premier appel à la dernière finition.
        </h2>

        <div className="process-steps-grid reveal-stagger">
          {STEPS.map((step) => (
            <div className="process-card" key={step.num}>
              <div className="process-num">{step.num}</div>
              <div className="process-title">{step.title}</div>
              <div className="process-text">{step.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}