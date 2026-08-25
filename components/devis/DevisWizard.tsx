"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { calculateEstimate } from "@/lib/estimate";
import { getLenis } from "@/lib/scroll";

/* ----------------------------- Configuration ----------------------------- */

const TRADES = [
  {
    key: "plomberie",
    title: "Plomberie & Sanitaire",
    desc: "Fuites, tuyauterie, robinetterie, WC",
    price: "Dès 89 € HT",
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: "electricite",
    title: "Électricité & Normes",
    desc: "Tableau, disjoncteur, panne, NF C 15-100",
    price: "Dès 95 € HT",
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: "chauffe-eau",
    title: "Chauffe-eau & Ballon",
    desc: "Remplacement, pose express, panne eau chaude",
    price: "Forfait dès 590 € TTC",
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
        <rect x="4" y="2" width="16" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="14" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 6h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "renovation",
    title: "Rénovation Salle de Bain",
    desc: "Douche à l'italienne, meuble vasque, clé en main",
    price: "Sur-mesure • Étude 0€",
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
        <path d="M14 6h5v4h-5zM9 10h5v4H9z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M4 14h5v4H4z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M9 12V6a2 2 0 0 0-2-2H4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: "urgence",
    title: "Dépannage Urgence 24/7",
    desc: "Intervention sous 30 min chrono",
    price: "Intervention immédiate",
    urgent: true,
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: "autre",
    title: "Climatisation & Autre",
    desc: "Pompe à chaleur, VMC, maintenance pro",
    price: "Sur devis rapide",
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const SUB_OPTIONS: Record<string, string[]> = {
  plomberie: [
    "Recherche & Réparation de fuite",
    "Remplacement robinetterie / mitigeur",
    "Débouchage & évacuation",
    "Pose WC ou Bâti-support",
    "Réseau cuivre / multicouche",
  ],
  electricite: [
    "Remplacement tableau électrique NF C 15-100",
    "Recherche de panne & court-circuit",
    "Ajout prises & éclairage LED",
    "Diagnostic de conformité Consuel",
    "Borne de recharge véhicule électrique",
  ],
  "chauffe-eau": [
    "Remplacement ballon d'eau chaude complet",
    "Dépannage groupe de sécurité / fuite",
    "Chauffe-eau thermodynamique RGE",
    "Détartrage & entretien cuve",
  ],
  renovation: [
    "Création douche à l'italienne & SPEC",
    "Rénovation salle de bain clé en main",
    "Remplacement baignoire par douche",
    "Plomberie & électricité cuisine",
  ],
  urgence: [
    "Fuite d'eau majeure sous pression",
    "Coupure électrique générale / disjonction",
    "Canalisation / WC totalement bouché",
    "Ballon d'eau chaude percé",
  ],
  autre: [
    "Climatisation réversible / Pompe à chaleur",
    "VMC & ventilation mécanique",
    "Maintenance tertiaire / syndic",
    "Autre projet sur-mesure",
  ],
};

const HOUSING_OPTIONS = [
  { value: "Appartement", icon: "🏢", title: "Appartement", sub: "Résidence / Étage" },
  { value: "Maison individuelle", icon: "🏠", title: "Maison", sub: "Villa / Pavillon" },
  { value: "Local professionnel / Commerce", icon: "🏪", title: "Commerce / Pro", sub: "Boutique, bureau" },
  { value: "Copropriété / Syndic", icon: "🏛️", title: "Syndic / Immeuble", sub: "Parties communes" },
];

const URGENCY_OPTIONS = [
  { value: "Urgence immédiate (< 30 min)", icon: "⚡", title: "Urgence 30 min", sub: "Aujourd'hui / 24h/24", danger: true },
  { value: "Dans les 24h à 48h", icon: "🕒", title: "Sous 24h - 48h", sub: "Intervention rapide" },
  { value: "Projet planifié (sous 1 mois)", icon: "📅", title: "Projet planifié", sub: "Dans les semaines à venir" },
];

const CITY_OPTIONS = [
  "Montpellier (34000 / 34070 / 34080 / 34090)",
  "Castelnau-le-Lez (34170)",
  "Lattes / Maurin (34970)",
  "Pérols (34470)",
  "Mauguio / Carnon (34130)",
  "Saint-Jean-de-Védas (34430)",
  "Juvignac (34990)",
  "Grabels (34790)",
  "Clapiers / Montferrier (34830)",
  "Palavas-les-Flots / La Grande-Motte",
  "Autre commune Métropole Montpellier (rayon de 30 km)",
];

const SERVICE_TO_TRADE: Record<string, string> = {
  plomberie: "plomberie",
  electricite: "electricite",
  renovation: "renovation",
  depannage: "urgence",
};

interface Recap {
  ref: string;
  service: string;
  housing: string;
  urgency: string;
  city: string;
  phone: string;
  price: string;
}

/* ------------------------------- Component ------------------------------- */

export function DevisWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [trade, setTrade] = useState("plomberie");
  const [subOption, setSubOption] = useState(SUB_OPTIONS.plomberie[0]);
  const [housing, setHousing] = useState("Appartement");
  const [urgency, setUrgency] = useState("Dans les 24h à 48h");
  const [description, setDescription] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState(CITY_OPTIONS[0]);
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [submitting, setSubmitting] = useState(false);
  const [recap, setRecap] = useState<Recap | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  // Prefill from ?service=slug (e.g. coming from a service detail page)
  useEffect(() => {
    const svc = searchParams.get("service");
    if (!svc) return;
    const mapped = SERVICE_TO_TRADE[svc];
    if (!mapped) return;
    setTrade(mapped);
    setSubOption(SUB_OPTIONS[mapped][0]);
  }, [searchParams]);

  const estimate = useMemo(
    () => calculateEstimate({ trade, subOption, housing, urgency }),
    [trade, subOption, housing, urgency]
  );

  const tradeTitle =
    TRADES.find((t) => t.key === trade)?.title ?? trade;

  // Smooth-scroll so the wizard card sits just under the header (Lenis-aware)
  const scrollCardIntoView = () => {
    const cardEl = cardRef.current;
    if (!cardEl) return;
    const top = Math.max(0, cardEl.getBoundingClientRect().top + window.pageYOffset - 90);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(top);
    else window.scrollTo({ top, behavior: "smooth" });
  };

  const goToStep = (target: number) => {
    if (target > maxStepReached) return;
    setStep(target);
    requestAnimationFrame(scrollCardIntoView);
  };

  const nextStep = () => {
    const target = step + 1;
    setMaxStepReached((m) => Math.max(m, target));
    goToStep(target);
  };

  const selectTrade = (key: string) => {
    setTrade(key);
    setSubOption(SUB_OPTIONS[key][0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (!name.trim()) newErrors.name = true;
    if (!phone.trim()) newErrors.phone = true;
    if (!email.trim()) newErrors.email = true;
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const first = newErrors.name ? "name" : newErrors.phone ? "phone" : "email";
      document.getElementById(`devis-field-${first}`)?.focus();
      return;
    }

    setSubmitting(true);
    const refNumber = "#DEV-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);

    setTimeout(() => {
      setRecap({
        ref: refNumber,
        service: `${tradeTitle} (${subOption})`,
        housing,
        urgency,
        city,
        phone,
        price: `${estimate.priceRangeText} (Déplacement gratuit)`,
      });
      setSubmitting(false);
      requestAnimationFrame(scrollCardIntoView);
    }, 700);
  };

  const progressWidth = step === 1 ? "15%" : step === 2 ? "55%" : "100%";

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="devis-page-top-bar reveal-fade-up">
        <div className="service-breadcrumb-wrap">
          <button className="btn-back-home" onClick={() => router.push("/")} aria-label="Retour à l'accueil">
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
            <span className="service-breadcrumb-current">Demande de devis</span>
          </div>
        </div>

        <div className="service-top-emergency-badge">
          <span className="service-live-dot" />
          <span>Devis gratuit & sans engagement • Réponse sous 30 min</span>
        </div>
      </div>

      {/* Devis Main Container Card */}
      <div className="devis-page-card reveal-fade-up" ref={cardRef}>
        {/* Page Header Info */}
        <div className="devis-page-header">
          <div className="eyebrow tone-dark" style={{ marginBottom: "0.35rem" }}>
            <span className="dot" style={{ background: "var(--accent)" }} />
            <span>Estimation immédiate & Devis 100% gratuit</span>
          </div>
          <h1 className="devis-page-h1">Configurez votre demande de devis</h1>
          <p className="devis-page-lead">
            Complétez ces 3 étapes simples pour recevoir votre chiffrage transparent et planifier
            l'intervention de nos artisans certifiés.
          </p>
        </div>

        {/* Wizard Progress Steps Bar */}
        {!recap && (
          <div className="devis-progress-wrap">
            <div className="devis-progress-track">
              <div className="devis-progress-bar-fill" style={{ width: progressWidth }} />
            </div>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`devis-step-point ${step === n ? "active" : ""} ${
                  n < step ? "completed" : ""
                }`}
                data-step-target={n}
                onClick={() => goToStep(n)}
              >
                <div className="devis-step-circle">{n}</div>
                <span className="devis-step-label">
                  {n === 1 ? "1. Prestation" : n === 2 ? "2. Logement & Délai" : "3. Coordonnées"}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Multi-Step Form View */}
        {!recap && (
          <form id="devis-multistep-form" onSubmit={handleSubmit} noValidate>
            {/* STEP 1: Prestation */}
            {step === 1 && (
              <div className="devis-step-panel active">
                <div className="devis-step-instruction">
                  1. Choisissez le domaine de votre intervention :
                </div>

                <div className="devis-trade-grid">
                  {TRADES.map((t) => (
                    <div
                      key={t.key}
                      className={`devis-trade-card ${trade === t.key ? "selected" : ""}`}
                      data-trade={t.key}
                      onClick={() => selectTrade(t.key)}
                    >
                      <div className="devis-trade-header">
                        <div
                          className="devis-trade-icon"
                          style={
                            t.key === "urgence"
                              ? { background: "#ef4444", color: "#fff" }
                              : undefined
                          }
                        >
                          {t.icon}
                        </div>
                        <div className="devis-check-dot">✓</div>
                      </div>
                      <div>
                        <div className="devis-trade-title">{t.title}</div>
                        <div className="devis-trade-desc">{t.desc}</div>
                      </div>
                      <div
                        className="devis-trade-price"
                        style={t.key === "urgence" ? { color: "#ef4444" } : undefined}
                      >
                        {t.price}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dynamic Specific Options */}
                <div style={{ marginTop: "1.5rem" }}>
                  <div className="form-label">
                    Précisez votre besoin spécifique (facultatif) :
                  </div>
                  <div className="devis-chips-group">
                    {(SUB_OPTIONS[trade] ?? []).map((opt) => (
                      <div
                        key={opt}
                        className={`devis-chip ${subOption === opt ? "selected" : ""}`}
                        onClick={() => setSubOption(opt)}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="devis-footer-actions">
                  <span style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
                    Étape 1 sur 3 • Gratuit & sans engagement
                  </span>
                  <button type="button" className="pill-btn has-arrow btn-accent" onClick={nextStep}>
                    <span>Étape suivante : Logement</span>
                    <span className="arrow-badge arrow-right icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Logement & Urgence */}
            {step === 2 && (
              <div className="devis-step-panel active">
                <div className="form-group">
                  <label className="form-label">Type de bâtiment / lieu d'intervention :</label>
                  <div className="devis-options-grid">
                    {HOUSING_OPTIONS.map((opt) => (
                      <div
                        key={opt.value}
                        className={`devis-option-btn ${housing === opt.value ? "selected" : ""}`}
                        onClick={() => setHousing(opt.value)}
                      >
                        <span className="devis-option-icon">{opt.icon}</span>
                        <span className="devis-option-title">{opt.title}</span>
                        <span className="devis-option-sub">{opt.sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: "1.25rem" }}>
                  <label className="form-label">Délai d'intervention souhaité :</label>
                  <div className="devis-options-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                    {URGENCY_OPTIONS.map((opt) => (
                      <div
                        key={opt.value}
                        className={`devis-option-btn ${urgency === opt.value ? "selected" : ""}`}
                        onClick={() => setUrgency(opt.value)}
                      >
                        <span className="devis-option-icon">{opt.icon}</span>
                        <span
                          className="devis-option-title"
                          style={opt.danger ? { color: "#ef4444" } : undefined}
                        >
                          {opt.title}
                        </span>
                        <span className="devis-option-sub">{opt.sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: "1.25rem" }}>
                  <label className="form-label" htmlFor="devis-description">
                    Précisions supplémentaires sur vos travaux (facultatif) :
                  </label>
                  <textarea
                    className="form-control"
                    id="devis-description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: Fuite sous évier cuisine, disjoncteur qui saute, marque de l'ancien chauffe-eau, etc."
                  />
                </div>

                <div className="devis-footer-actions">
                  <button type="button" className="devis-back-btn" onClick={() => goToStep(1)}>
                    <span>← Retour</span>
                  </button>
                  <button type="button" className="pill-btn has-arrow btn-accent" onClick={nextStep}>
                    <span>Étape suivante : Estimation & Coordonnées</span>
                    <span className="arrow-badge arrow-right icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Coordonnées & Validation */}
            {step === 3 && (
              <div className="devis-step-panel active">
                {/* Live Estimate Banner Preview */}
                <div className="devis-estimate-banner">
                  <div className="devis-estimate-head">
                    <div>
                      <div className="devis-estimate-tag">{estimate.tag}</div>
                      <div className="devis-estimate-price">{estimate.priceRangeText}</div>
                    </div>
                    <div
                      style={{
                        fontSize: "0.8125rem",
                        textAlign: "right",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      <div style={{ fontWeight: 700, color: "#ffffff" }}>Montpellier & 25 km</div>
                      <div>Déplacement & Devis 100% Gratuit</div>
                    </div>
                  </div>
                  <div className="devis-estimate-details">{estimate.summary}</div>
                  <div className="devis-estimate-perks">
                    <span className="devis-estimate-perk">✓ Garantie Décennale AXA</span>
                    <span className="devis-estimate-perk">✓ 0 € de frais cachés</span>
                    <span className="devis-estimate-perk">
                      {"✓ TVA réduite 10% (si logement > 2 ans)"}
                    </span>
                    <span className="devis-estimate-perk">✓ Devis validé avant travaux</span>
                  </div>
                </div>

                <div className="devis-fields-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="devis-user-name">
                      Nom complet *
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="devis-user-name"
                      required
                      placeholder="Ex: Sophie Martin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={errors.name ? { borderColor: "var(--accent)" } : undefined}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="devis-user-phone">
                      Téléphone portable *
                    </label>
                    <input
                      className="form-control"
                      type="tel"
                      id="devis-user-phone"
                      required
                      placeholder="06 12 34 56 78"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={errors.phone ? { borderColor: "var(--accent)" } : undefined}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="devis-user-email">
                      Adresse Email *
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="devis-user-email"
                      required
                      placeholder="sophie.martin@exemple.fr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={errors.email ? { borderColor: "var(--accent)" } : undefined}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="devis-user-city">
                      Ville / Commune *
                    </label>
                    <select
                      className="form-control"
                      id="devis-user-city"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      {CITY_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="devis-user-address">
                      Adresse postale ou précision d'accès (facultatif)
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="devis-user-address"
                      placeholder="Ex: 14 Rue de la Loge, Bâtiment B, Digicode 1234"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="devis-footer-actions">
                  <button type="button" className="devis-back-btn" onClick={() => goToStep(2)}>
                    <span>← Modifier mes critères</span>
                  </button>
                  <button className="pill-btn has-arrow btn-accent" type="submit" disabled={submitting}>
                    <span>
                      {submitting ? "Enregistrement de votre devis…" : "Confirmer ma demande de devis"}
                    </span>
                    <span className="arrow-badge arrow-right icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </form>
        )}

        {/* SUCCESS & RECAP SCREEN */}
        {recap && (
          <div className="devis-success-card active">
            <div className="success-badge">
              <span className="icon">
                <svg viewBox="0 0 24 24">
                  <polyline
                    points="20 6 9 17 4 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div className="eyebrow tone-dark" style={{ marginBottom: 0 }}>
              <span className="dot" style={{ background: "#10b981" }} />
              <span>Demande enregistrée avec succès</span>
            </div>
            <h3
              style={{
                fontSize: "clamp(1.4rem, 4vw, 1.85rem)",
                fontWeight: 700,
                color: "var(--foreground)",
                marginTop: "0.25rem",
              }}
            >
              Votre devis MONTÉO est en cours
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--muted)",
                lineHeight: 1.5,
                maxWidth: "42ch",
              }}
            >
              Merci pour votre confiance. Notre technicien référent analyse votre demande et vous
              rappelle sous <strong>30 minutes</strong> pour confirmer l'horaire précis.
            </p>

            {/* Detailed Recap Box */}
            <div className="devis-recap-box">
              <div className="recap-row">
                <span className="recap-label">Référence du dossier</span>
                <span className="recap-val accent">{recap.ref}</span>
              </div>
              <div className="recap-row">
                <span className="recap-label">Prestation demandée</span>
                <span className="recap-val">{recap.service}</span>
              </div>
              <div className="recap-row">
                <span className="recap-label">Type de logement</span>
                <span className="recap-val">{recap.housing}</span>
              </div>
              <div className="recap-row">
                <span className="recap-label">Délai d'intervention</span>
                <span className="recap-val">{recap.urgency}</span>
              </div>
              <div className="recap-row">
                <span className="recap-label">Commune d'intervention</span>
                <span className="recap-val">{recap.city}</span>
              </div>
              <div className="recap-row">
                <span className="recap-label">Numéro de contact</span>
                <span className="recap-val">{recap.phone}</span>
              </div>
              <div className="recap-row">
                <span className="recap-label">Estimation indicative</span>
                <span className="recap-val accent">{recap.price}</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                justifyContent: "center",
                marginTop: "1.25rem",
                width: "100%",
              }}
            >
              <a href="tel:0467000000" className="phone-btn" style={{ textDecoration: "none" }}>
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
                <span>Appel direct : 04 67 00 00 00</span>
              </a>
              <button type="button" className="pill-btn no-arrow btn-outline" onClick={() => window.print()}>
                <span>Imprimer / Télécharger</span>
              </button>
              <button
                type="button"
                className="pill-btn no-arrow btn-dark"
                onClick={() => router.push("/")}
              >
                <span>Retour à l'accueil</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}