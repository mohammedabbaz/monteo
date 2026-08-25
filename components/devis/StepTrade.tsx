"use client";

import React from "react";
import {
  Wrench,
  Zap,
  Flame,
  ShowerHead,
  AlertTriangle,
  Wind,
  Check,
} from "lucide-react";

interface StepTradeProps {
  selectedTrade: string;
  onSelectTrade: (trade: string) => void;
  selectedSubOption: string;
  onSelectSubOption: (sub: string) => void;
}

export const StepTrade: React.FC<StepTradeProps> = ({
  selectedTrade,
  onSelectTrade,
  selectedSubOption,
  onSelectSubOption,
}) => {
  const trades = [
    {
      id: "plomberie",
      title: "Plomberie & Sanitaire",
      desc: "Fuites, tuyauterie, robinetterie, WC",
      price: "Dès 89 € HT",
      icon: Wrench,
      chips: [
        "Recherche & Réparation de fuite",
        "Remplacement robinetterie / mitigeur",
        "Débouchage canalisation express",
        "Pose WC ou Bâti-support Geberit",
        "Réseau cuivre / multicouche",
      ],
    },
    {
      id: "electricite",
      title: "Électricité & Normes",
      desc: "Tableau, disjoncteur, panne, NF C 15-100",
      price: "Dès 95 € HT",
      icon: Zap,
      chips: [
        "Tableau électrique & disjoncteurs",
        "Court-circuit & panne générale",
        "Mise aux normes NF C 15-100",
        "Prise renforcée / Borne recharge VE",
        "Éclairage LED & appareillage",
      ],
    },
    {
      id: "chauffe-eau",
      title: "Chauffe-eau & Ballon",
      desc: "Remplacement, pose express, panne eau chaude",
      price: "Forfait dès 590 € TTC",
      icon: Flame,
      chips: [
        "Remplacement cumulus électrique",
        "Chauffe-eau thermodynamique RGE",
        "Panne résistance / thermostat",
        "Détartrage & vidange de cuve",
      ],
    },
    {
      id: "renovation",
      title: "Rénovation Salle de Bain",
      desc: "Douche à l'italienne, meuble vasque, clé en main",
      price: "Sur-mesure • Étude 0€",
      icon: ShowerHead,
      chips: [
        "Douche à l'italienne complète",
        "Remplacement baignoire par douche",
        "Meuble vasque & robinetterie",
        "Carrelage & faïence murale",
      ],
    },
    {
      id: "urgence",
      title: "Dépannage Urgence 24/7",
      desc: "Intervention sous 30 min chrono",
      price: "Intervention immédiate",
      icon: AlertTriangle,
      chips: [
        "Fuite d'eau majeure / inondation",
        "Panne de courant totale",
        "Débouchage WC urgent",
        "Vanne générale bloquée",
      ],
    },
    {
      id: "autre",
      title: "Climatisation & Autre",
      desc: "Pompe à chaleur, VMC, maintenance pro",
      price: "Sur devis rapide",
      icon: Wind,
      chips: [
        "Installation / entretien climatisation",
        "Pose VMC simple / double flux",
        "Contrat d'entretien professionnel",
        "Autre besoin spécifique",
      ],
    },
  ];

  const currentTradeObj = trades.find((t) => t.id === selectedTrade) || trades[0];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-foreground">
          1. Choisissez le domaine de votre intervention :
        </h3>
        <p className="text-xs sm:text-sm text-muted mt-0.5">
          Sélectionnez la catégorie correspondant à votre besoin principal.
        </p>
      </div>

      {/* 6 Trade Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
        {trades.map((trade) => {
          const Icon = trade.icon;
          const isSelected = selectedTrade === trade.id;
          return (
            <button
              key={trade.id}
              type="button"
              onClick={() => {
                onSelectTrade(trade.id);
                if (trade.chips.length > 0) {
                  onSelectSubOption(trade.chips[0]);
                }
              }}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 relative cursor-pointer ${
                isSelected
                  ? "border-accent bg-accent/5 shadow-md ring-2 ring-accent/20 scale-[1.01]"
                  : "border-line bg-surface hover:bg-white hover:border-accent/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-9 h-9 rounded-xl grid place-items-center transition-colors ${
                    isSelected ? "bg-accent text-white" : "bg-ink text-accent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div
                  className={`w-5 h-5 rounded-full border grid place-items-center text-[10px] font-bold ${
                    isSelected
                      ? "bg-accent border-accent text-white"
                      : "border-line text-transparent"
                  }`}
                >
                  <Check className="w-3 h-3" />
                </div>
              </div>

              <div>
                <div className="text-sm font-bold text-foreground leading-tight">
                  {trade.title}
                </div>
                <div className="text-xs text-muted mt-1 leading-snug">
                  {trade.desc}
                </div>
              </div>

              <div
                className={`text-xs font-bold ${
                  trade.id === "urgence" ? "text-red-500" : "text-accent"
                }`}
              >
                {trade.price}
              </div>
            </button>
          );
        })}
      </div>

      {/* Sub-Options Specific Chips */}
      {currentTradeObj.chips && (
        <div className="pt-2">
          <label className="text-xs uppercase tracking-wider font-bold text-muted block mb-2.5">
            Précisez votre besoin spécifique :
          </label>
          <div className="flex flex-wrap gap-2">
            {currentTradeObj.chips.map((chip) => {
              const isSelected = selectedSubOption === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => onSelectSubOption(chip)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-ink text-white border-ink shadow-sm"
                      : "bg-surface text-foreground border-line hover:border-accent hover:bg-white"
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

