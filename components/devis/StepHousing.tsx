"use client";

import React from "react";
import { Building, Home, Store, Landmark, Zap, Clock, Calendar } from "lucide-react";

interface StepHousingProps {
  housing: string;
  onSelectHousing: (h: string) => void;
  urgency: string;
  onSelectUrgency: (u: string) => void;
  description: string;
  onChangeDescription: (d: string) => void;
}

export const StepHousing: React.FC<StepHousingProps> = ({
  housing,
  onSelectHousing,
  urgency,
  onSelectUrgency,
  description,
  onChangeDescription,
}) => {
  const housingOptions = [
    {
      id: "Appartement",
      title: "Appartement",
      sub: "Résidence / Étage",
      icon: Building,
    },
    {
      id: "Maison individuelle",
      title: "Maison",
      sub: "Villa / Pavillon",
      icon: Home,
    },
    {
      id: "Local professionnel / Commerce",
      title: "Commerce / Pro",
      sub: "Boutique, bureau",
      icon: Store,
    },
    {
      id: "Copropriété / Syndic",
      title: "Syndic / Immeuble",
      sub: "Parties communes",
      icon: Landmark,
    },
  ];

  const urgencyOptions = [
    {
      id: "Urgence immédiate (< 30 min)",
      title: "Urgence 30 min",
      sub: "Aujourd'hui / 24h/24",
      icon: Zap,
      color: "text-red-500",
    },
    {
      id: "Dans les 24h à 48h",
      title: "Sous 24h - 48h",
      sub: "Intervention rapide",
      icon: Clock,
      color: "text-accent",
    },
    {
      id: "Projet planifié (sous 1 mois)",
      title: "Projet planifié",
      sub: "Dans les semaines à venir",
      icon: Calendar,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Housing Type */}
      <div>
        <label className="text-xs uppercase tracking-wider font-bold text-muted block mb-2">
          Type de bâtiment / lieu d&apos;intervention :
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {housingOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = housing === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectHousing(opt.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? "border-accent bg-accent/5 ring-2 ring-accent/20 shadow-sm"
                    : "border-line bg-surface hover:bg-white hover:border-accent/40"
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? "text-accent" : "text-muted"}`} />
                <span className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                  {opt.title}
                </span>
                <span className="text-[11px] text-muted">{opt.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Urgency Level */}
      <div>
        <label className="text-xs uppercase tracking-wider font-bold text-muted block mb-2">
          Délai d&apos;intervention souhaité :
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {urgencyOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = urgency === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectUrgency(opt.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? "border-accent bg-accent/5 ring-2 ring-accent/20 shadow-sm"
                    : "border-line bg-surface hover:bg-white hover:border-accent/40"
                }`}
              >
                <Icon className={`w-5 h-5 ${opt.color}`} />
                <span className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                  {opt.title}
                </span>
                <span className="text-[11px] text-muted">{opt.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description Textarea */}
      <div>
        <label htmlFor="description" className="text-xs uppercase tracking-wider font-bold text-muted block mb-2">
          Précisions supplémentaires sur vos travaux (facultatif) :
        </label>
        <textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          placeholder="Ex: Fuite sous évier cuisine, disjoncteur qui saute, marque de l'ancien cumulus, étage, digicode..."
          className="w-full rounded-xl border border-line bg-surface p-3 sm:p-3.5 text-xs sm:text-sm text-foreground focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
        />
      </div>
    </div>
  );
};

