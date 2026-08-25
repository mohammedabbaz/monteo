export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  type: string;
  year: string;
  desc: string;
  tags: string[];
}

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: "renov-plomb-mtp",
    title: "Rénovation plomberie & sanitaires",
    location: "Appartement — Montpellier Écusson",
    type: "Plomberie",
    year: "2026",
    desc: "Remplacement complet du réseau d'eau en cuivre, pose d'un chauffe-eau extra-plat et installation de sanitaires suspendus.",
    tags: ["Plomberie", "Sanitaire", "Chauffe-eau", "2026"],
  },
  {
    id: "elec-castelnau",
    title: "Installation électrique & Tableau",
    location: "Villa — Castelnau-le-Lez",
    type: "Électricité",
    year: "2026",
    desc: "Refonte du tableau électrique 4 rangées, passage aux normes NF C 15-100 et création de ligne dédiée pour borne de recharge de véhicule.",
    tags: ["Électricité", "Tableau", "Bornes IRVE", "2026"],
  },
  {
    id: "tertiaire-mtp",
    title: "Électricité tertiaire & Éclairage",
    location: "Commerce — Montpellier Port Marianne",
    type: "Commerce",
    year: "2025",
    desc: "Éclairage sur rail LED architectural, prises réseaux RJ45 et adaptation sécurisée de la distribution électrique pour restaurant.",
    tags: ["Commerce", "Mise aux normes", "Éclairage LED", "2025"],
  },
  {
    id: "chauffage-lattes",
    title: "Plomberie & Pompe à chaleur",
    location: "Maison — Lattes",
    type: "Chauffe-eau",
    year: "2025",
    desc: "Création d'un réseau sanitaire complet et installation d'un chauffe-eau thermodynamique haute performance énergétique.",
    tags: ["Chauffe-eau", "Réseau", "Économie d'énergie", "2025"],
  },
];

