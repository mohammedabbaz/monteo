"use client";

import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { EstimateResult } from "@/lib/estimate";
import { SERVICE_AREAS } from "@/data/areas";

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
}

interface StepContactProps {
  estimate: EstimateResult;
  formData: ContactFormData;
  onChangeField: (field: keyof ContactFormData, value: string) => void;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

export const StepContact: React.FC<StepContactProps> = ({
  estimate,
  formData,
  onChangeField,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Live Estimate Summary Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-ink text-white p-5 sm:p-6 border border-white/10 shadow-lg">
        {/* Glow corner */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-accent-light">
                {estimate.tag}
              </div>
              <div className="text-xl sm:text-3xl font-extrabold text-white mt-0.5">
                {estimate.priceRangeText}
              </div>
            </div>

            <div className="text-right text-xs text-white/80">
              <div className="font-bold text-white">Montpellier & 30 km</div>
              <div>Déplacement & Devis 100% Gratuit</div>
            </div>
          </div>

          <div className="text-xs text-white/70 leading-relaxed font-medium">
            {estimate.summary}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-white/85 pt-1">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-light" />
              Garantie Décennale AXA
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Zéro frais caché
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              TVA réduite 10% (logement &gt; 2 ans)
            </span>
          </div>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs uppercase tracking-wider font-bold text-muted">
            Nom complet *
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => onChangeField("name", e.target.value)}
            placeholder="Ex: Sophie Martin"
            className={`w-full rounded-xl border bg-surface p-3 text-xs sm:text-sm text-foreground focus:bg-white outline-none transition-all ${
              errors.name
                ? "border-red-500 ring-2 ring-red-500/20"
                : "border-line focus:border-accent focus:ring-2 focus:ring-accent/20"
            }`}
          />
          {errors.name && (
            <span className="text-[11px] text-red-500">{errors.name}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs uppercase tracking-wider font-bold text-muted">
            Téléphone portable *
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => onChangeField("phone", e.target.value)}
            placeholder="Ex: 06 12 34 56 78"
            className={`w-full rounded-xl border bg-surface p-3 text-xs sm:text-sm text-foreground focus:bg-white outline-none transition-all ${
              errors.phone
                ? "border-red-500 ring-2 ring-red-500/20"
                : "border-line focus:border-accent focus:ring-2 focus:ring-accent/20"
            }`}
          />
          {errors.phone && (
            <span className="text-[11px] text-red-500">{errors.phone}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs uppercase tracking-wider font-bold text-muted">
            Adresse Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => onChangeField("email", e.target.value)}
            placeholder="sophie.martin@exemple.fr"
            className={`w-full rounded-xl border bg-surface p-3 text-xs sm:text-sm text-foreground focus:bg-white outline-none transition-all ${
              errors.email
                ? "border-red-500 ring-2 ring-red-500/20"
                : "border-line focus:border-accent focus:ring-2 focus:ring-accent/20"
            }`}
          />
          {errors.email && (
            <span className="text-[11px] text-red-500">{errors.email}</span>
          )}
        </div>

        {/* City Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="city" className="text-xs uppercase tracking-wider font-bold text-muted">
            Ville / Commune *
          </label>
          <select
            id="city"
            value={formData.city}
            onChange={(e) => onChangeField("city", e.target.value)}
            className="w-full rounded-xl border border-line bg-surface p-3 text-xs sm:text-sm text-foreground focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
          >
            {SERVICE_AREAS.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name} ({a.postal})
              </option>
            ))}
            <option value="Autre commune Métropole">
              Autre commune Métropole (rayon de 30 km)
            </option>
          </select>
        </div>

        {/* Street Address */}
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label htmlFor="address" className="text-xs uppercase tracking-wider font-bold text-muted">
            Adresse postale ou précision d&apos;accès (facultatif)
          </label>
          <input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => onChangeField("address", e.target.value)}
            placeholder="Ex: 14 Rue de la Loge, Bâtiment B, Digicode 1234..."
            className="w-full rounded-xl border border-line bg-surface p-3 text-xs sm:text-sm text-foreground focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
};

