"use client";

import { useEffect, useRef } from "react";

const STATS: { target?: number; suffix?: string; text?: string; label: string }[] = [
  { target: 150, suffix: "+", label: "Interventions réalisées" },
  { target: 98, suffix: "%", label: "Clients satisfaits" },
  { target: 15, suffix: "+", label: "Années d'expérience" },
  { text: "24/7", label: "Disponibilité urgence" },
];

export function StatsSection() {
  const panelRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const doneRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    if (panelRef.current) observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    if (doneRef.current) return;
    doneRef.current = true;

    STATS.forEach((stat, idx) => {
      const el = numberRefs.current[idx];
      if (!el || stat.target === undefined) return;
      let cur = 0;
      const inc = stat.target / 35;
      const timer = setInterval(() => {
        cur += inc;
        if (cur >= stat.target!) {
          el.textContent = stat.target! + (stat.suffix || "");
          clearInterval(timer);
        } else {
          el.textContent = Math.round(cur) + (stat.suffix || "");
        }
      }, 30);
    });
  };

  return (
    <section id="stats">
      <div className="shell">
        <div className="stats-panel reveal-scale-up" ref={panelRef}>
          <div className="eyebrow tone-light reveal-fade-up">
            <span className="dot" />
            <span>Notre engagement</span>
          </div>
          <h2 className="stats-h2 reveal-fade-up">
            La confiance se mesure dans le travail réalisé.
          </h2>

          <div className="stats-grid reveal-stagger">
            {STATS.map((stat, idx) => (
              <div key={stat.label}>
                <div
                  className="stat-number"
                  ref={(el) => {
                    numberRefs.current[idx] = el;
                  }}
                >
                  {stat.text ?? "0"}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}