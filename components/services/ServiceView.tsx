"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ServiceData } from "@/data/services";

const BREADCRUMB_LABELS: Record<string, string> = {
  plomberie: "Plomberie",
  electricite: "Électricité",
  renovation: "Rénovation",
  depannage: "Dépannage 24/7",
};

const TAB_ICONS: Record<string, React.ReactNode> = {
  plomberie: (
    <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  electricite: (
    <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  renovation: (
    <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  depannage: (
    <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

const COMMITMENTS = [
  { icon: "⚡", title: "Intervention rapide", desc: "Arrivée en 30 min en cas d'urgence" },
  { icon: "🛠️", title: "Véhicule atelier", desc: "Matériel & pièces neuves immédiatement" },
  { icon: "📋", title: "Devis gratuit", desc: "Chiffrage clair avant tout engagement" },
  { icon: "🛡️", title: "Garantie Décennale", desc: "Tranquillité totale sur chaque chantier" },
];

interface ServiceViewProps {
  service: ServiceData;
  others: ServiceData[];
}

export function ServiceView({ service, others }: ServiceViewProps) {
  const router = useRouter();
  const [activeImg, setActiveImg] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqBodyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const breadcrumbLabel = BREADCRUMB_LABELS[service.slug] ?? service.category;
  const currentImage = service.gallery[activeImg] ?? {
    url: service.mainImage,
    caption: service.photoCaption,
  };

  const selectImage = (idx: number) => {
    if (idx === activeImg) return;
    setImgOpacity(0.4);
    setTimeout(() => {
      setActiveImg(idx);
      setImgOpacity(1);
    }, 100);
  };

  const toggleFaq = (idx: number) => {
    const isOpen = openFaq === idx;
    faqBodyRefs.current.forEach((body) => {
      if (body) body.style.maxHeight = "";
    });
    if (!isOpen) {
      setOpenFaq(idx);
      const body = faqBodyRefs.current[idx];
      if (body) body.style.maxHeight = body.scrollHeight + 30 + "px";
    } else {
      setOpenFaq(null);
    }
  };

  return (
    <div id="service-page-view">
      <div className="shell">
        {/* 1) Top Navigation Bar */}
        <div className="service-page-top-bar reveal-fade-up">
          <div className="service-breadcrumb-wrap">
            <button
              className="btn-back-home"
              onClick={() => router.push("/")}
              aria-label="Retour à l'accueil"
            >
              <svg
                style={{ width: 15, height: 15 }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Retour à l'accueil</span>
            </button>
            <div className="service-breadcrumb-trail">
              <button onClick={() => router.push("/")}>Accueil</button>
              <span>/</span>
              <span>Nos prestations</span>
              <span>/</span>
              <span className="service-breadcrumb-current">{breadcrumbLabel}</span>
            </div>
          </div>

          <div className="service-top-emergency-badge">
            <span className="service-live-dot" />
            <span>Intervention express 7j/7 • Montpellier & Métropole</span>
          </div>
        </div>

        {/* 2) Services Switcher Bar */}
        <div className="service-page-services-bar reveal-fade-up">
          <div className="service-page-services-header">
            <div className="service-page-services-label">
              <span className="dot" />
              <span>Nos 4 corps d'état & prestations spécialisées</span>
            </div>
          </div>
          <div className="service-page-tabs" role="tablist" aria-label="Sélectionner une prestation">
            {[service, ...others]
              .sort((a, b) => a.index.localeCompare(b.index))
              .map((s) => (
                <button
                  key={s.slug}
                  className={`service-page-tab-btn ${s.slug === service.slug ? "active" : ""}`}
                  role="tab"
                  aria-selected={s.slug === service.slug}
                  onClick={() => router.push(`/services/${s.slug}`)}
                >
                  {TAB_ICONS[s.slug]}
                  <span>{s.title}</span>
                </button>
              ))}
          </div>
        </div>

        {/* Service Hero Header Card */}
        <div className="service-page-header-card reveal-fade-up">
          <div className="service-page-header-grid">
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  marginBottom: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <div className="eyebrow tone-dark" style={{ marginBottom: 0 }}>
                  <span className="dot" />
                  <span>{service.category}</span>
                </div>
                <div className="service-status-pill">
                  <span className="service-live-dot" />
                  <span>Artisans qualifiés à Montpellier & métropole</span>
                </div>
              </div>
              <h1 className="service-page-title">{service.heroTitle}</h1>
              <p className="service-page-lead">{service.lead}</p>
            </div>

            <div className="service-page-cta-group">
              <a href="tel:0467000000" className="btn-service-call">
                <svg
                  style={{ width: 17, height: 17, color: "var(--accent)" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>04 67 00 00 00</span>
              </a>
              <button
                className="btn-service-quote"
                onClick={() => router.push(`/devis?service=${service.slug}`)}
              >
                <span>Demander un devis gratuit</span>
                <span className="arrow-badge arrow-right icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 2 Columns Main Body */}
        <div className="service-page-main-grid">
          {/* Left Visual & Guarantees Column */}
          <div className="service-page-visual-card reveal-fade-up">
            <div className="service-main-photo-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentImage.url} alt={currentImage.caption} style={{ opacity: imgOpacity }} />
              <div className="service-photo-badge">
                <span className="service-live-dot" />
                <span>{currentImage.caption}</span>
              </div>
            </div>

            {/* Gallery Thumbs */}
            <div className="service-gallery-grid-thumbs">
              {service.gallery.map((img, i) => (
                <div
                  key={img.url}
                  className={`service-page-thumb ${i === activeImg ? "active" : ""}`}
                  onClick={() => selectImage(i)}
                  aria-label={`Photo ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={`${service.title} - photo ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>

            {/* Certifications & Norms */}
            <div className="service-certifications-box">
              <div className="service-cert-title">Certifications & Garanties Légales</div>
              <div className="service-cert-list">
                {service.certifications.map((cert) => (
                  <span className="service-cert-pill" key={cert}>
                    <svg
                      style={{ width: 14, height: 14, color: "#10b981", flexShrink: 0 }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Commitments */}
            <div className="service-commitments-grid">
              {COMMITMENTS.map((c) => (
                <div className="service-commit-item" key={c.title}>
                  <span className="service-commit-icon">{c.icon}</span>
                  <div>
                    <strong>{c.title}</strong>
                    <div style={{ color: "var(--muted)", fontSize: "0.75rem" }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content Column */}
          <div className="service-page-content-card">
            {/* Price Estimate Card */}
            <div className="service-page-price-card reveal-fade-up">
              <div className="price-card-label">Estimation tarifaire & Délais</div>
              <div className="price-card-val">{service.pricing}</div>
              <div className="price-card-note">
                <svg
                  style={{ width: 15, height: 15 }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>Tarifs transparents annoncés avant intervention — Zéro frais caché</span>
              </div>
            </div>

            {/* Scope of Work */}
            <div className="service-scope-card reveal-fade-up">
              <div className="service-scope-header">
                <svg
                  style={{ width: 18, height: 18, color: "var(--accent)" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <span>Prestations & Interventions incluses</span>
              </div>
              <div className="service-tasks-page-grid">
                {service.tasks.map((task) => (
                  <div className="service-task-page-item" key={task}>
                    <span className="service-task-check">
                      <svg
                        style={{ width: 15, height: 15 }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Steps Workflow */}
            <div className="service-workflow-card reveal-fade-up">
              <div className="service-workflow-title">Comment se déroule votre prestation</div>
              <div className="service-workflow-steps">
                {service.workflow.map((step) => (
                  <div className="service-workflow-step" key={step.step}>
                    <div className="service-step-num">{step.step}</div>
                    <div className="service-step-name">{step.title}</div>
                    <div className="service-step-desc">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inline CTA Card */}
            <div className="service-inline-cta-card reveal-fade-up">
              <div className="service-inline-cta-text">
                <h4>Besoin d'une intervention ou d'un conseil ?</h4>
                <p>Nos artisans plombiers et électriciens vous répondent immédiatement.</p>
              </div>
              <Link href={`/devis?service=${service.slug}`} className="pill-btn has-arrow btn-accent">
                <span>Demander un chiffrage</span>
                <span className="arrow-badge arrow-right icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Service-Specific FAQ Accordion Section */}
        <div className="service-page-faq-section reveal-fade-up">
          <div className="service-faq-header">
            <div className="eyebrow tone-dark" style={{ marginBottom: 0 }}>
              <span className="dot" />
              <span>Foire aux questions</span>
            </div>
            <h3 className="service-faq-h3">
              Questions fréquentes sur nos prestations de {breadcrumbLabel}
            </h3>
          </div>
          <div className="service-faq-list">
            {service.faqs.map((faq, idx) => (
              <div className={`service-faq-item ${openFaq === idx ? "open" : ""}`} key={faq.question}>
                <button
                  className="service-faq-btn"
                  aria-expanded={openFaq === idx}
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.question}</span>
                  <span className="icon">
                    <svg viewBox="0 0 24 24">
                      <polyline
                        points="6 9 12 15 18 9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className="service-faq-answer"
                  ref={(el) => {
                    faqBodyRefs.current[idx] = el;
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Services Grid */}
        <div className="other-services-section reveal-fade-up">
          <div className="other-services-header">
            <div className="eyebrow tone-dark" style={{ marginBottom: 0 }}>
              <span className="dot" />
              <span>Nos autres métiers</span>
            </div>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 800,
                color: "var(--foreground)",
                marginTop: "0.4rem",
              }}
            >
              Découvrez également toutes nos expertises
            </h3>
          </div>
          <div className="other-services-grid">
            {others.map((o) => (
              <div
                className="other-service-card"
                key={o.slug}
                onClick={() => router.push(`/services/${o.slug}`)}
              >
                <div>
                  <div className="other-service-cat">{o.category}</div>
                  <div className="other-service-title">{o.heroTitle}</div>
                </div>
                <div className="other-service-desc">{o.shortDesc}</div>
                <div className="other-service-link">
                  <span>Découvrir cette prestation</span>
                  <span className="icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}