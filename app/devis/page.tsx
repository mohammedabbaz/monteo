import type { Metadata } from "next";
import { Suspense } from "react";
import { DevisWizard } from "@/components/devis/DevisWizard";

export const metadata: Metadata = {
  title: "Devis Gratuit en 3 Étapes — MONTÉO Montpellier",
  description:
    "Configurez votre demande de devis MONTÉO : plomberie, électricité, chauffe-eau, rénovation ou dépannage d'urgence à Montpellier. Estimation immédiate, 100% gratuit et sans engagement.",
};

const PERKS = [
  {
    icon: "🛡️",
    title: "Garantie Décennale AXA",
    desc: "Couverture légale complète sur tous nos chantiers",
  },
  {
    icon: "⚡",
    title: "Intervention rapide 7j/7",
    desc: "Montpellier et métropole sous 30 min en urgence",
  },
  {
    icon: "📋",
    title: "Zéro frais caché",
    desc: "Devis détaillé & validé avant tout démarrage",
  },
  {
    icon: "🏆",
    title: "Artisans certifiés",
    desc: "Conformité stricte aux normes DTU & NF C 15-100",
  },
];

export default function DevisPage() {
  return (
    <div id="devis-page-view">
      <div className="shell">
        <Suspense fallback={null}>
          <DevisWizard />
        </Suspense>

        {/* Devis Reassurance / Perks Strip */}
        <div className="devis-perks-strip reveal-fade-up">
          {PERKS.map((perk) => (
            <div className="devis-perk-item" key={perk.title}>
              <div className="devis-perk-icon">{perk.icon}</div>
              <div>
                <strong>{perk.title}</strong>
                <div style={{ color: "var(--muted)", fontSize: "0.78125rem" }}>{perk.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}