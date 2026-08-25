export interface ServiceTask {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  id: string;
  slug: string;
  index: string;
  title: string;
  heroTitle: string;
  category: string;
  shortDesc: string;
  lead: string;
  pricing: string;
  priceStartingFrom: number;
  mainImage: string;
  photoCaption: string;
  gallery: { url: string; caption: string }[];
  certifications: string[];
  tasks: string[];
  workflow: { step: string; title: string; desc: string }[];
  faqs: ServiceFAQ[];
}

export const SERVICES: ServiceData[] = [
  {
    id: "plomberie",
    slug: "plomberie",
    index: "01",
    title: "Plomberie & Sanitaire",
    heroTitle: "Plomberie Générale, Sanitaire & Chauffe-eau",
    category: "Plomberie & Sanitaire",
    shortDesc: "Fuites, canalisations, chauffe-eau, robinetterie et réseaux cuivre/multicouche.",
    lead: "Spécialistes de la plomberie résidentielle, commerciale et d'urgence à Montpellier. De la détection de fuite non-destructive au remplacement de chauffe-eau thermodynamique et réfection complète de réseaux.",
    pricing: "À partir de 89 € HT • Devis gratuit sans engagement",
    priceStartingFrom: 89,
    mainImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c77d389?auto=format&fit=crop&w=1200&q=85",
    photoCaption: "Chantier plomberie cuivre • Montpellier Centre",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1581244277943-fe4a9c77d389?auto=format&fit=crop&w=800&q=80",
        caption: "Réseau cuivre soigné et raccords sertis",
      },
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        caption: "Installation sanitaire moderne et robinetterie encastrée",
      },
      {
        url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
        caption: "Pose de chauffe-eau thermodynamique haute performance",
      },
    ],
    certifications: [
      "Qualibat RGE",
      "Garantie Décennale AXA",
      "Normes DTU 60.1",
      "Agrément Assurances Dégâts des Eaux",
    ],
    tasks: [
      "Recherche & réparation de fuite d'eau (caméra thermique, gaz traceur)",
      "Remplacement & détartrage de chauffe-eau électrique / thermodynamique",
      "Rénovation complète des réseaux d'alimentation (cuivre, multicouche, PER)",
      "Débouchage express de canalisations et curage hydrodynamique",
      "Pose & remplacement de robinetterie haut de gamme (Grohe, Hansgrohe)",
      "Installation de WC suspendus Geberit, bâti-support et broyeurs",
      "Remplacement de colonnes montantes et évacuations fonte/PVC",
      "Diagnostic pression, pose de réducteurs de pression et clapets anti-pollution",
    ],
    workflow: [
      {
        step: "01. CONTACT",
        title: "Échange express",
        desc: "Diagnostic préliminaire par téléphone ou via formulaire en ligne.",
      },
      {
        step: "02. DEVIS",
        title: "Validation du prix",
        desc: "Chiffrage clair et précis soumis avant le début des travaux.",
      },
      {
        step: "03. RÉALISATION",
        title: "Chantier soigné",
        desc: "Intervention aux normes avec protection stricte de votre habitat.",
      },
      {
        step: "04. CONTRÔLE",
        title: "Nettoyage & Garantie",
        desc: "Tests de mise en service, site rendu impeccable et certificat remis.",
      },
    ],
    faqs: [
      {
        question: "Quel est le tarif pour une recherche de fuite d'eau à Montpellier ?",
        answer: "Notre forfait recherche de fuite commence à 120 € HT. Dans la majorité des cas, cette prestation est prise en charge à 100% par votre assurance habitation au titre de la garantie Dégât des Eaux.",
      },
      {
        question: "En combien de temps remplacez-vous un chauffe-eau en panne ?",
        answer: "Nous disposons d'un stock permanent de cumulus toutes capacités (50L à 300L) à notre dépôt de Montpellier. Un remplacement standard s'effectue en 2 à 4 heures maximum après validation du devis.",
      },
      {
        question: "Fournissez-vous les attestations pour les assurances ?",
        answer: "Oui, un rapport d'intervention technique complet avec photos et facture acquittée vous est remis immédiatement pour transmission à votre assureur.",
      },
      {
        question: "Quelles marques de matériel installez-vous ?",
        answer: "Nous privilégions exclusivement du matériel professionnel certifié NF : Atlantic, Thermor, Grohe, Geberit, Nicoll pour garantir une longévité maximale.",
      },
    ],
  },
  {
    id: "electricite",
    slug: "electricite",
    index: "02",
    title: "Électricité & Tableaux",
    heroTitle: "Électricité Générale, Tableaux & Normes NF C 15-100",
    category: "Électricité & Tableaux",
    shortDesc: "Mise aux normes NF C 15-100, réfection tableau, disjoncteurs et dépannage panne.",
    lead: "Installations électriques sécurisées pour logements et commerces à Montpellier. Remplacement de tableaux vétustes, mise en sécurité, ajout de circuits dédiés (IRVE / bornes de recharge) et conformité Consuel.",
    pricing: "À partir de 95 € HT • Diagnostic de sécurité inclus",
    priceStartingFrom: 95,
    mainImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85",
    photoCaption: "Câblage tableau électrique Schneider • Castelnau-le-Lez",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
        caption: "Tableau électrique repéré avec différentiels 30mA Type A/AC",
      },
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
        caption: "Éclairage architectural LED et appareillage Legrand Celiane",
      },
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        caption: "Mise en sécurité et passage de gaines encastrées",
      },
    ],
    certifications: [
      "Certification Qualifelec",
      "Attestation Consuel",
      "Normes NF C 15-100",
      "Garantie Décennale AXA",
    ],
    tasks: [
      "Remplacement complet et mise en conformité de tableau électrique",
      "Recherche de court-circuit, panne de courant et disjoncteur qui saute",
      "Mise à la terre, mesure de résistance et protection différentielle 30mA",
      "Installation de prises renforcées et bornes de recharge pour véhicules électriques",
      "Création de pieuvres électriques et distribution pour rénovation d'appartements",
      "Éclairage intérieur et extérieur design (spots LED dimmables, bandeaux LED)",
      "Pose de VMC simple et double flux pour renouvellement d'air",
      "Installation de domotique, thermostats connectés et gestionnaires d'énergie",
    ],
    workflow: [
      {
        step: "01. DIAGNOSTIC",
        title: "Audit de l'installation",
        desc: "Contrôle visuel et mesures de terre, calibres et sections.",
      },
      {
        step: "02. CONCEPTION",
        title: "Schéma & Devis",
        desc: "Établissement du plan de câblage et chiffrage au juste prix.",
      },
      {
        step: "03. POSE",
        title: "Travaux normalisés",
        desc: "Raccordements soignés sous goulotte ou encastrés sous gaine ICTA.",
      },
      {
        step: "04. CERTIFICATION",
        title: "Mesures & Attestation",
        desc: "Contrôle au mesureur d'isolement et remise du rapport de conformité.",
      },
    ],
    faqs: [
      {
        question: "Mon installation doit-elle être mise aux normes pour la vente ou location ?",
        answer: "Oui, un diagnostic électrique obligatoire (DEO) est requis pour les biens de plus de 15 ans. Nous intervenons pour lever les anomalies signalées et délivrer une attestation de mise en sécurité.",
      },
      {
        question: "Combien coûte le remplacement d'un tableau électrique complet ?",
        answer: "Le remplacement d'un tableau électrique standard 2 à 4 rangées équipé de disjoncteurs magnétothermiques et interrupteurs différentiels 30mA se situe généralement entre 650 € et 1 400 € TTC selon la taille du logement.",
      },
      {
        question: "Quelle garantie proposez-vous sur l'électricité ?",
        answer: "Tout notre matériel est garanti constructeur (Schneider, Legrand, Hager) de 2 à 5 ans, et la pose bénéficie de notre garantie décennale AXA.",
      },
    ],
  },
  {
    id: "renovation",
    slug: "renovation",
    index: "03",
    title: "Rénovation Complète",
    heroTitle: "Rénovation Clé-en-Main de Salles de Bain & Cuisines",
    category: "Rénovation Complète",
    shortDesc: "Salles de bain modernes, douches à l'italienne, cuisines et modernisation globale.",
    lead: "De la conception 3D à la livraison impeccable : rénovation globale de vos pièces d'eau, plomberie intégrée, électricité design, carrelage grand format et finitions soignées à Montpellier et ses alentours.",
    pricing: "Étude personnalisée & Plans 3D offerts sur rendez-vous",
    priceStartingFrom: 1800,
    mainImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=85",
    photoCaption: "Création salle de bain italienne • Lattes",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
        caption: "Douche à l'italienne avec receveur extra-plat et paroi vitrée",
      },
      {
        url: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
        caption: "Meuble double vasque suspendu et robinetterie noir mat",
      },
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        caption: "Transformation baignoire en douche sécurisée pour seniors",
      },
    ],
    certifications: [
      "Garantie Décennale AXA",
      "Qualification Tous Corps d'État",
      "Éco-Artisan RGE",
      "Assurance Dommages Ouvrage",
    ],
    tasks: [
      "Transformation de baignoire vétuste en douche à l'italienne spacieuse",
      "Étanchéité sous carrelage (SPEC / SEL) et évacuations grand débit",
      "Pose de receveurs résine extra-plats antidérapants et rigoles inox",
      "Installation de meubles suspendus, miroirs rétroéclairés LED et colonnes",
      "Création de niches éclairées encastrées et cloisons en carreaux de plâtre hydrofuge",
      "Pose de carrelage grès cérame grand format et faïence murale rectifiée",
      "Raccordement complet arrivée d'eau, évacuations et alimentation électroménager",
      "Sèche-serviettes soufflant mixte ou programmable connecté",
    ],
    workflow: [
      {
        step: "01. RENCONTRE",
        title: "Visite technique",
        desc: "Prise de cotes précises, écoute de vos envies et étude de faisabilité.",
      },
      {
        step: "02. PROJET",
        title: "Plan & Sélection",
        desc: "Proposition des matériaux, carrelages et sanitaires de notre showroom partenaire.",
      },
      {
        step: "03. CHANTIER",
        title: "Réalisation clé-en-main",
        desc: "Démolition propre, plomberie, électricité, étanchéité et pose.",
      },
      {
        step: "04. RÉCEPTION",
        title: "Livraison parfaite",
        desc: "Procès-verbal de réception, nettoyage approfondi et garanties.",
      },
    ],
    faqs: [
      {
        question: "Quelle est la durée moyenne d'une rénovation de salle de bain ?",
        answer: "Une rénovation complète de salle de bain dure généralement entre 5 et 10 jours ouvrés selon la complexité du chantier et les modifications de cloisons.",
      },
      {
        question: "Prenez-vous en charge la démolition et l'évacuation des gravats ?",
        answer: "Absolument. Nous protégeons les zones de passage, démontons l'existant et évacuons l'ensemble des gravats en déchetterie professionnelle agréée.",
      },
      {
        question: "Avez-vous un seul interlocuteur pour tout le chantier ?",
        answer: "Oui, votre conducteur de travaux dédié MONTÉO coordonne l'ensemble des interventions (plombier, électricien, carreleur) pour garantir respect du planning et qualité sans faille.",
      },
    ],
  },
  {
    id: "depannage",
    slug: "depannage",
    index: "04",
    title: "Dépannage Urgence 24/7",
    heroTitle: "Dépannage Express 24h/24 & 7j/7 — Arrivée sous 30 min",
    category: "Dépannage Urgence 24/7",
    shortDesc: "Intervention sous 30 min chrono pour fuites graves, pannes électriques et coupures.",
    lead: "Un artisan qualifié chez vous en 30 minutes à Montpellier et dans toute la métropole. Véhicules ateliers équipés de pièces détachées d'origine pour un dépannage immédiat et garanti.",
    pricing: "Forfait déplacement & diagnostic clair • Pas de mauvaise surprise",
    priceStartingFrom: 89,
    mainImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
    photoCaption: "Intervention nocturne express • Montpellier",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        caption: "Véhicule d'astreinte équipé de pièces d'urgence",
      },
      {
        url: "https://images.unsplash.com/photo-1581244277943-fe4a9c77d389?auto=format&fit=crop&w=800&q=80",
        caption: "Colmatage d'urgence sur conduite cuivre sous pression",
      },
      {
        url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
        caption: "Remplacement immédiat de disjoncteur général défaillant",
      },
    ],
    certifications: [
      "Astreinte 24h/24 & 7j/7",
      "Devis Annoncé Avant Intervention",
      "Agréé Toutes Assurances",
      "Garantie Pièces & Main d'Œuvre",
    ],
    tasks: [
      "Dépannage fuite d'eau importante, rupture de canalisation et inondation",
      "Débouchage en urgence de WC, colonne d'immeuble et évier bouché",
      "Coupure totale d'électricité, odeur de brûlé ou tableau qui fume",
      "Chauffe-eau qui disjoncte ou perte brutale d'eau chaude sanitaire",
      "Remplacement d'urgence de vanne d'arrêt générale bloquée",
      "Sécurisation suite à un sinistre ou dégât des eaux",
      "Mise en sécurité provisoire et rapport pour votre assureur",
      "Intervention le week-end, jours fériés et en pleine nuit",
    ],
    workflow: [
      {
        step: "01. ALERTE",
        title: "Appel direct 24/7",
        desc: "Notre technicien d'astreinte évalue la situation et vous guide par téléphone.",
      },
      {
        step: "02. DÉPLACEMENT",
        title: "Arrivée sous 30 min",
        desc: "Départ immédiat du technicien le plus proche de votre adresse.",
      },
      {
        step: "03. SÉCURISATION",
        title: "Devis & Réparation",
        desc: "Prix annoncé avant travaux, réparation immédiate avec pièces du camion.",
      },
      {
        step: "04. RAPPORT",
        title: "Facture & Assurance",
        desc: "Facture détaillée remise pour votre prise en charge par l'assurance.",
      },
    ],
    faqs: [
      {
        question: "Quel est le délai réel d'arrivée en urgence à Montpellier ?",
        answer: "Nos véhicules d'astreinte sont pré-positionnés dans les secteurs stratégiques (Port Marianne, Centre, Hôpitaux-Facultés, Castelnau, Lattes) pour assurer une arrivée effective entre 20 et 40 minutes.",
      },
      {
        question: "Les tarifs de nuit ou du dimanche sont-ils annoncés ?",
        answer: "Oui, systématiquement. Nous vous indiquons le montant exact du forfait avant même le départ du technicien pour une transparence totale.",
      },
      {
        question: "Mon assurance prend-elle en charge le dépannage d'urgence ?",
        answer: "La plupart des contrats multirisques habitation (MRH) remboursent les frais de recherche de fuite et de mise en sécurité d'urgence. Nous vous aidons à monter votre dossier.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug || s.id === slug);
}

