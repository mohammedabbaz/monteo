"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle, Phone, Printer, Home } from "lucide-react";
import { Eyebrow } from "@/components/ui/Badge";
import { ContactFormData } from "./StepContact";
import { EstimateResult } from "@/lib/estimate";

interface DevisSuccessProps {
  reference: string;
  formData: ContactFormData;
  tradeTitle: string;
  housing: string;
  urgency: string;
  estimate: EstimateResult;
  onReset: () => void;
}

export const DevisSuccess: React.FC<DevisSuccessProps> = ({
  reference,
  formData,
  tradeTitle,
  housing,
  urgency,
  estimate,
  onReset,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center text-center p-4 sm:p-8 gap-5 animate-in fade-in duration-500">
      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-full bg-ink text-accent flex items-center justify-center shadow-xl">
        <CheckCircle className="w-9 h-9" />
      </div>

      <div>
        <Eyebrow tone="dark" dotColor="#10b981">
          Demande enregistrée avec succès
        </Eyebrow>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
          Votre devis MONTÉO est en cours
        </h2>
        <p className="text-xs sm:text-sm text-muted max-w-md mx-auto mt-2 leading-relaxed">
          Merci pour votre confiance. Notre technicien référent analyse votre demande et vous rappelle sous <strong>30 minutes</strong> pour confirmer l&apos;horaire précis.
        </p>
      </div>

      {/* Recap Table Box */}
      <div className="w-full max-w-lg rounded-2xl bg-surface border border-line p-5 sm:p-6 text-left flex flex-col gap-3 text-xs sm:text-sm shadow-sm">
        <div className="flex justify-between items-center pb-2.5 border-b border-dashed border-line">
          <span className="text-muted">Référence du dossier</span>
          <span className="font-mono font-bold text-accent">{reference}</span>
        </div>

        <div className="flex justify-between items-center pb-2.5 border-b border-dashed border-line">
          <span className="text-muted">Prestation demandée</span>
          <span className="font-bold text-foreground">{tradeTitle}</span>
        </div>

        <div className="flex justify-between items-center pb-2.5 border-b border-dashed border-line">
          <span className="text-muted">Type de logement</span>
          <span className="font-semibold text-foreground">{housing}</span>
        </div>

        <div className="flex justify-between items-center pb-2.5 border-b border-dashed border-line">
          <span className="text-muted">Délai d&apos;intervention</span>
          <span className="font-semibold text-foreground">{urgency}</span>
        </div>

        <div className="flex justify-between items-center pb-2.5 border-b border-dashed border-line">
          <span className="text-muted">Commune</span>
          <span className="font-semibold text-foreground">{formData.city}</span>
        </div>

        <div className="flex justify-between items-center pb-2.5 border-b border-dashed border-line">
          <span className="text-muted">Numéro de contact</span>
          <span className="font-semibold text-foreground">{formData.phone}</span>
        </div>

        <div className="flex justify-between items-center pt-1">
          <span className="text-muted">Estimation indicative</span>
          <span className="font-bold text-accent text-right">
            {estimate.priceRangeText} (Déplacement gratuit)
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4 w-full">
        <a
          href="tel:0467000000"
          className="phone-btn text-xs sm:text-sm py-2.5 px-5 shadow-md"
        >
          <Phone className="w-4 h-4" />
          <span>Appel direct : 04 67 00 00 00</span>
        </a>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line bg-white hover:bg-surface text-xs sm:text-sm font-semibold text-foreground shadow-sm transition-all min-h-[44px]"
        >
          <Printer className="w-4 h-4 text-muted" />
          <span>Imprimer / Télécharger</span>
        </button>

        <Link
          href="/"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all min-h-[44px]"
        >
          <Home className="w-4 h-4" />
          <span>Retour à l&apos;accueil</span>
        </Link>
      </div>
    </div>
  );
};

