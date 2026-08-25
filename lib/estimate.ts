export interface EstimateInput {
  trade: string;
  subOption?: string;
  housing: string;
  urgency: string;
}

export interface EstimateResult {
  priceRangeText: string;
  minPrice: number;
  maxPrice: number;
  tag: string;
  summary: string;
  isCustomQuote: boolean;
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const { trade, subOption, housing, urgency } = input;

  let min = 89;
  let max = 149;
  let isCustom = false;
  let tag = "ESTIMATION INDICATIVE MONTÉO";

  switch (trade) {
    case "plomberie":
      if (subOption?.includes("Recherche & Réparation")) {
        min = 120;
        max = 190;
      } else if (subOption?.includes("Remplacement robinetterie")) {
        min = 89;
        max = 160;
      } else if (subOption?.includes("Débouchage")) {
        min = 95;
        max = 175;
      } else if (subOption?.includes("Pose WC")) {
        min = 180;
        max = 350;
      } else if (subOption?.includes("cuivre / multicouche")) {
        min = 250;
        max = 600;
      } else {
        min = 89;
        max = 149;
      }
      break;

    case "electricite":
      if (subOption?.includes("Tableau")) {
        min = 650;
        max = 1250;
      } else if (subOption?.includes("Court-circuit")) {
        min = 95;
        max = 190;
      } else if (subOption?.includes("Mise aux normes")) {
        min = 450;
        max = 1100;
      } else {
        min = 95;
        max = 180;
      }
      break;

    case "chauffe-eau":
      min = 590;
      max = 1150;
      tag = "FORFAIT POSE & MATÉRIEL GARANTI";
      break;

    case "renovation":
      min = 1800;
      max = 6500;
      isCustom = true;
      tag = "ÉTUDE TECHNIQUE SUR-MESURE 100% OFFERTE";
      break;

    case "urgence":
      min = 110;
      max = 185;
      tag = "INTERVENTION IMMÉDIATE 24/7";
      break;

    case "autre":
    default:
      min = 90;
      max = 220;
      break;
  }

  // Multipliers based on housing & urgency
  if (housing.includes("Local") || housing.includes("Syndic")) {
    min = Math.round(min * 1.15);
    max = Math.round(max * 1.2);
  }

  if (urgency.includes("30 min")) {
    min = Math.round(min * 1.2);
    max = Math.round(max * 1.25);
  }

  const priceRangeText = isCustom
    ? "Sur devis gratuit (dès 1 800 € TTC)"
    : `${min} € - ${max} € HT`;

  const tradeName =
    trade === "plomberie"
      ? "Plomberie & Sanitaire"
      : trade === "electricite"
      ? "Électricité & Normes"
      : trade === "chauffe-eau"
      ? "Chauffe-eau & Ballon"
      : trade === "renovation"
      ? "Rénovation Salle de Bain"
      : trade === "urgence"
      ? "Dépannage Urgence 24/7"
      : "Climatisation & Autre";

  const summary = `Prestation : ${tradeName}${
    subOption ? ` • ${subOption}` : ""
  } • ${housing} • ${urgency}`;

  return {
    priceRangeText,
    minPrice: min,
    maxPrice: max,
    tag,
    summary,
    isCustomQuote: isCustom,
  };
}

