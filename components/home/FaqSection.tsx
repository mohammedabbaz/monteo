"use client";

import { useRef, useState } from "react";
import { GENERAL_FAQS } from "@/data/faqs";

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (idx: number) => {
    const isOpen = openIdx === idx;

    // Close all items first (single-open accordion, like the original)
    bodyRefs.current.forEach((body) => {
      if (body) body.style.maxHeight = "";
    });

    if (!isOpen) {
      setOpenIdx(idx);
      const body = bodyRefs.current[idx];
      if (body) body.style.maxHeight = body.scrollHeight + 30 + "px";
    } else {
      setOpenIdx(null);
    }
  };

  return (
    <section id="faq">
      <div className="shell">
        <div className="eyebrow tone-dark reveal-fade-up">
          <span className="dot" />
          <span>Questions fréquentes</span>
        </div>
        <h2 className="faq-h2 reveal-fade-up">Vous avez une question ?</h2>

        <div className="faq-list reveal-stagger">
          {GENERAL_FAQS.map((faq, idx) => (
            <div className={`faq-item ${openIdx === idx ? "open" : ""}`} key={faq.question}>
              <button
                className="faq-btn"
                aria-expanded={openIdx === idx}
                onClick={() => toggle(idx)}
              >
                <span>{faq.question}</span>
                <span className="faq-chevron icon">
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
                className="faq-body"
                ref={(el) => {
                  bodyRefs.current[idx] = el;
                }}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}