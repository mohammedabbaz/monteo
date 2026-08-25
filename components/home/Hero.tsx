"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import herosection from '@/assets/hero-mep-technical.jpg.jpg'

const SLIDES = [
  {
    cap: "INTERVENTION EXPRESS",
    title: "Fuite d'eau & Tuyauterie",
    icon: '<svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 9v4m0 4h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    bg: "var(--ink)",
  },
  {
    cap: "URGENCE 24/7",
    title: "Panne de courant & Court-circuit",
    icon: '<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bg: "#0f172a",
  },
  {
    cap: "INSTALLATION & DÉPANNAGE",
    title: "Chauffe-eau & Ballon d'eau chaude",
    icon: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="14" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 6h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    bg: "var(--ink)",
  },
  {
    cap: "SÉCURITÉ & CONFORMITÉ",
    title: "Tableau électrique & Disjoncteurs",
    icon: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 8h10M7 12h10M7 16h4m4 0h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    bg: "#0f172a",
  },
  {
    cap: "RÉNOVATION SANITAIRE",
    title: "Robinetterie & Salle de bain",
    icon: '<svg viewBox="0 0 24 24"><path d="M14 6h5v4h-5zM9 10h5v4H9z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 14h5v4H4z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 12V6a2 2 0 0 0-2-2H4" stroke="currentColor" stroke-width="2"/></svg>',
    bg: "var(--ink)",
  },
];

const HERO_REVEAL_IMG1 =
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2000&q=85";

  const HERO_REVEAL_IMG =
  herosection;
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const liquidWrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Carousel state
  const [slideIdx, setSlideIdx] = useState(0);
  const [watermarkReady, setWatermarkReady] = useState(false);
  const [linesActive, setLinesActive] = useState(false);
  const [fadesActive, setFadesActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetCarouselTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSlideIdx((i) => (i + 1) % SLIDES.length);
    }, 4500);
  }, []);

  useEffect(() => {
    resetCarouselTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetCarouselTimer]);

  /* ---------------- Mouse physics, parallax & liquid reveal ---------------- */
  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const watermark = watermarkRef.current;
    const liquidWrap = liquidWrapRef.current;
    const card = cardRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;

    const revealedImg = new Image();
    revealedImg.crossOrigin = "anonymous";
    revealedImg.src = HERO_REVEAL_IMG.src;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let brushRadius = 150;
    let isDesktop = window.innerWidth >= 1024;
    let trail: { x: number; y: number; radius: number; age: number }[] = [];

    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isInside: false };
    let currentTilt = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let currentCardTilt = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resizeCanvas();

    const onResize = () => {
      isDesktop = window.innerWidth >= 1024;
      resizeCanvas();
    };
    window.addEventListener("resize", onResize);

    const onPointerEnter = () => {
      mouse.isInside = true;
      if (glow) glow.style.opacity = "1";
    };
    const onPointerLeave = () => {
      mouse.isInside = false;
      if (glow) glow.style.opacity = "0";
      currentTilt.targetX = 0;
      currentTilt.targetY = 0;
      currentCardTilt.targetX = 0;
      currentCardTilt.targetY = 0;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;
      mouse.isInside = true;

      if (glow) {
        glow.style.opacity = "1";
        glow.style.left = mouse.targetX + "px";
        glow.style.top = mouse.targetY + "px";
      }

      const normX = (mouse.targetX / rect.width) * 2 - 1;
      const normY = (mouse.targetY / rect.height) * 2 - 1;
      currentTilt.targetX = normX;
      currentTilt.targetY = normY;

      if (canvas && isDesktop && ctx) {
        const cRect = canvas.getBoundingClientRect();
        const canvasX = (clientX - cRect.left) * dpr;
        const canvasY = (clientY - cRect.top) * dpr;
        if (
          canvasX >= 0 &&
          canvasY >= 0 &&
          canvasX <= canvas.width &&
          canvasY <= canvas.height
        ) {
          trail.push({ x: canvasX, y: canvasY, radius: brushRadius * dpr, age: 1.0 });
        }
      }
    };

    const onCardMove = (e: PointerEvent) => {
      if (!card) return;
      const cRect = card.getBoundingClientRect();
      const cx = (e.clientX - cRect.left) / cRect.width - 0.5;
      const cy = (e.clientY - cRect.top) / cRect.height - 0.5;
      currentCardTilt.targetX = cx * 18; // degrees
      currentCardTilt.targetY = -cy * 18;
    };
    const onCardLeave = () => {
      currentCardTilt.targetX = 0;
      currentCardTilt.targetY = 0;
    };

    if (section) {
      section.addEventListener("pointerenter", onPointerEnter);
      section.addEventListener("pointerleave", onPointerLeave);
      section.addEventListener("pointermove", onPointerMove);
    }
    if (card) {
      card.addEventListener("pointermove", onCardMove);
      card.addEventListener("pointerleave", onCardLeave);
    }

    let rafId = 0;
    const animate = () => {
      const ease = 0.08;
      currentTilt.x += (currentTilt.targetX - currentTilt.x) * ease;
      currentTilt.y += (currentTilt.targetY - currentTilt.y) * ease;

      const cardEase = 0.12;
      currentCardTilt.x += (currentCardTilt.targetX - currentCardTilt.x) * cardEase;
      currentCardTilt.y += (currentCardTilt.targetY - currentCardTilt.y) * cardEase;

      // Parallax 1: Left content
      if (left && window.innerWidth >= 768) {
        const moveX = currentTilt.x * -16;
        const moveY = currentTilt.y * -14;
        const rotY = currentTilt.x * 2.5;
        const rotX = -currentTilt.y * 2.5;
        left.style.transform = `translate3d(${moveX}px, ${moveY}px, 20px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      // Parallax 2: Right content
      if (right && window.innerWidth >= 768) {
        const moveX = currentTilt.x * 22;
        const moveY = currentTilt.y * 18;
        const rotY = currentTilt.x * 3.5;
        const rotX = -currentTilt.y * 3.5;
        right.style.transform = `translate3d(${moveX}px, ${moveY}px, 35px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      // Parallax 3: Background watermark
      if (watermark && watermark.classList.contains("ready")) {
        const wMoveX = currentTilt.x * -35;
        const wMoveY = currentTilt.y * -25;
        watermark.style.transform = `translate3d(${wMoveX}px, ${wMoveY}px, 0)`;
      }

      // Parallax 4: Background image counter-pan
      if (liquidWrap) {
        const bMoveX = currentTilt.x * -10;
        const bMoveY = currentTilt.y * -10;
        liquidWrap.style.transform = `scale(1.04) translate3d(${bMoveX}px, ${bMoveY}px, 0)`;
      }

      // Dynamic 3D tilt on the carousel card
      if (card) {
        if (Math.abs(currentCardTilt.x) > 0.1 || Math.abs(currentCardTilt.y) > 0.1) {
          card.style.transform = `perspective(800px) rotateY(${currentCardTilt.x}deg) rotateX(${currentCardTilt.y}deg) scale(1.02)`;
        } else if (!mouse.isInside) {
          card.style.transform = "";
        }
      }

      // Liquid reveal painting
      if (ctx && canvas && isDesktop) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (trail.length > 0 && revealedImg.complete) {
          ctx.save();
          for (let i = trail.length - 1; i >= 0; i--) {
            const p = trail[i];
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * p.age);
            grad.addColorStop(0, `rgba(0,0,0,${p.age * 0.95})`);
            grad.addColorStop(0.6, `rgba(0,0,0,${p.age * 0.45})`);
            grad.addColorStop(1, "rgba(0,0,0,0)");

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * p.age, 0, Math.PI * 2);
            ctx.fill();

            p.age -= 0.018;
            if (p.age <= 0) trail.splice(i, 1);
          }

          ctx.globalCompositeOperation = "source-in";
          ctx.drawImage(revealedImg, 0, 0, canvas.width, canvas.height);
          ctx.restore();
        }
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      if (section) {
        section.removeEventListener("pointerenter", onPointerEnter);
        section.removeEventListener("pointerleave", onPointerLeave);
        section.removeEventListener("pointermove", onPointerMove);
      }
      if (card) {
        card.removeEventListener("pointermove", onCardMove);
        card.removeEventListener("pointerleave", onCardLeave);
      }
    };
  }, []);

  /* ------------- Entrance animations coordinated with the loader ------------- */
  useEffect(() => {
    const trigger = () => {
      setWatermarkReady(true);
      setTimeout(() => setLinesActive(true), 200);
      setTimeout(() => setFadesActive(true), 400);
    };
    if (document.documentElement.dataset.monteoLoaded === "true") {
      trigger();
      return;
    }
    window.addEventListener("monteo:ready", trigger);
    return () => window.removeEventListener("monteo:ready", trigger);
  }, []);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIdx((i) => (i + 1) % SLIDES.length);
    resetCarouselTimer();
  };
  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);
    resetCarouselTimer();
  };
  const advanceSlide = () => {
    setSlideIdx((i) => (i + 1) % SLIDES.length);
    resetCarouselTimer();
  };

  const slide = SLIDES[slideIdx];

  return (
    <section id="home" ref={sectionRef}>
      <div className="hero-mouse-glow" ref={glowRef} aria-hidden="true" />

      <div className="liquid-reveal-wrap" ref={liquidWrapRef}>
        <img
          className="hero-base"
          src="https://images.unsplash.com/photo-1581244277943-fe4a9c77d389?auto=format&fit=crop&w=2400&q=85"
          alt="Artisan plombier électricien qualifié tuyauterie et cuivre"
        />
        <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />
      </div>

      <div className="hero-vignette" />
      <div
        className={`hero-watermark ${watermarkReady ? "ready" : ""}`}
        ref={watermarkRef}
      >
        MONTÉO
      </div>

      <div className="shell" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div className="hero-content">
          <div className="hero-left" ref={leftRef}>
            <div className={`eyebrow tone-dark reveal-fade-up ${fadesActive ? "active" : ""}`}>
              <span
                className="dot"
                style={{ background: "#10b981", boxShadow: "0 0 10px rgba(16,185,129,0.7)" }}
              />
              <span>Entreprise locale certifiée — Montpellier & Métropole</span>
            </div>

            <h1 className="hero-h1">
              <span className="reveal-line-wrap">
                <span className={`reveal-line ${linesActive ? "active" : ""}`}>Votre maison,</span>
              </span>
              <span className="reveal-line-wrap">
                <span className={`reveal-line ${linesActive ? "active" : ""}`}>
                  entre de{" "}
                  <span className="hero-accent-text">bonnes mains.</span>
                </span>
              </span>
            </h1>

            <p className={`hero-subtitle reveal-fade-up ${fadesActive ? "active" : ""}`}>
              Plomberie de précision, électricité sécurisée, dépannage express 7j/7 et rénovations
              sur-mesure. Des artisans chevronnés au service de votre confort.
            </p>

            <div className={`emergency-badge reveal-fade-up ${fadesActive ? "active" : ""}`}>
              <span className="pulse-dot" />
              <span>Urgence Dépannage 24h/24 & 7j/7 — Arrivée sous 30 min</span>
            </div>

            <div className={`cta-row reveal-fade-up ${fadesActive ? "active" : ""}`}>
              <Link href="/devis" className="pill-btn has-arrow btn-accent">
                <span>Demander une intervention</span>
                <span className="arrow-badge arrow-right icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </Link>
              <a href="#services" className="pill-btn no-arrow btn-outline">
                <span>Voir nos services</span>
              </a>
            </div>

            <div className={`hero-badges-row reveal-fade-up ${fadesActive ? "active" : ""}`}>
              <span className="hero-mini-pill">
                <svg
                  className="icon"
                  style={{ width: 14, height: 14, color: "#10b981" }}
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
                Devis 100% gratuit
              </span>
              <span className="hero-mini-pill">
                <svg
                  className="icon"
                  style={{ width: 14, height: 14, color: "var(--accent)" }}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                Intervention 30 min
              </span>
              <span className="hero-mini-pill">
                <svg
                  className="icon"
                  style={{ width: 14, height: 14, color: "#f59e0b" }}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill="currentColor"
                  />
                </svg>
                4.9/5 (+250 avis vérifiés)
              </span>
            </div>
          </div>

          <div className="hero-right" ref={rightRef}>
            {/* Hero Carousel Card */}
            <div className={`hero-card reveal-fade-up spotlight-card ${fadesActive ? "active" : ""}`} ref={cardRef}>
              <div className="hero-card-inner" id="hero-card-click" onClick={advanceSlide}>
                <div className="hero-card-tile" style={{ background: slide.bg }}>
                  <span
                    className="icon"
                    dangerouslySetInnerHTML={{ __html: slide.icon }}
                  />
                </div>
                <div className="hero-card-panel">
                  <div>
                    <div className="carousel-caption">{slide.cap}</div>
                    <div className="carousel-title">{slide.title}</div>
                  </div>
                  <div className="carousel-bottom">
                    <div className="carousel-dashes">
                      {SLIDES.map((_, i) => (
                        <div
                          key={i}
                          className={`carousel-dash ${i === slideIdx ? "active" : "inactive"}`}
                        />
                      ))}
                    </div>
                    <div className="carousel-arrows">
                      <button className="carousel-nav-btn" onClick={prevSlide} aria-label="Service précédent">
                        <span className="icon" style={{ transform: "rotate(180deg)" }}>
                          <svg viewBox="0 0 24 24">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                      <button className="carousel-nav-btn" onClick={nextSlide} aria-label="Service suivant">
                        <span className="icon">
                          <svg viewBox="0 0 24 24">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Grid */}
            <div className={`hero-trust-grid reveal-fade-up ${fadesActive ? "active" : ""}`}>
              <div className="trust-indicator-item spotlight-card">
                <div className="trust-indicator-val">
                  15+ <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--muted)" }}>ans</span>
                </div>
                <div className="trust-indicator-lbl">Savoir-faire artisanal</div>
              </div>
              <div className="trust-indicator-item spotlight-card">
                <div className="trust-indicator-val">
                  4.9/5 <span style={{ fontSize: "0.95rem", color: "#f59e0b" }}>★</span>
                </div>
                <div className="trust-indicator-lbl">+250 avis certifiés</div>
              </div>
              <div className="trust-indicator-item spotlight-card">
                <div className="trust-indicator-val">
                  30 <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--muted)" }}>min</span>
                </div>
                <div className="trust-indicator-lbl">Délai d'urgence moyen</div>
              </div>
              <div className="trust-indicator-item spotlight-card">
                <div className="trust-indicator-val">
                  100% <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#10b981" }}>✓</span>
                </div>
                <div className="trust-indicator-lbl">Garantie décennale</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`hero-status-bar reveal-fade-up ${fadesActive ? "active" : ""}  mx-9`}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#10b981",
              display: "inline-block",
            }}
          />
          Artisans en service 7j/7
        </span>
        <span>Montpellier • Métropole & 25 km</span>
        <span style={{ color: "var(--accent)" }}>Faites défiler pour explorer ↓</span>
      </div>
    </section>
  );
}