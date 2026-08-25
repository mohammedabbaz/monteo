import Link from "next/link";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio";

export function WorksSection() {
  return (
    <section id="works">
      <div className="shell">
        <div className="portfolio-header">
          <div className="eyebrow tone-dark reveal-fade-up">
            <span className="dot" />
            <span>Nos réalisations</span>
          </div>
          <h2 className="portfolio-h2 reveal-fade-up">Des chantiers faits pour durer.</h2>
        </div>

        <div className="portfolio-grid reveal-stagger">
          {PORTFOLIO_PROJECTS.map((project) => (
            <Link href="/devis" className="portfolio-card" key={project.id}>
              <div className="portfolio-meta">
                <span>{project.location}</span>
                <div className="portfolio-badge icon">
                  <svg viewBox="0 0 24 24">
                    <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="2" />
                    <polyline
                      points="7 7 17 7 17 17"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <div className="portfolio-watermark">{project.year}</div>
              <div className="portfolio-bottom">
                <div className="portfolio-title">{project.title}</div>
                <div className="portfolio-desc">{project.desc}</div>
                <div className="portfolio-tags">
                  {project.tags.map((tag) => (
                    <span className="tag-chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}