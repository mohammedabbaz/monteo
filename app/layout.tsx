import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { PageLoader } from "@/components/layout/PageLoader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SpotlightCards } from "@/components/ui/SpotlightCards";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MONTÉO — Plomberie & Électricité à Montpellier | Dépannage 24/7",
  description:
    "MONTÉO accompagne particuliers et professionnels à Montpellier et sa métropole pour leurs travaux de plomberie, électricité, rénovation et dépannage d'urgence 24h/24.",
  keywords: [
    "plombier montpellier",
    "electricien montpellier",
    "depannage plomberie 24h/24",
    "urgence electricite montpellier",
    "renovation salle de bain montpellier",
    "remplacement chauffe-eau",
    "mise aux normes tableau electrique",
  ],
  openGraph: {
    title: "MONTÉO — Plomberie & Électricité à Montpellier",
    description:
      "Services premium de plomberie et électricité générale à Montpellier et sa métropole. Devis 100% gratuit & intervention rapide 7j/7.",
    url: "https://monteo.fr",
    siteName: "MONTÉO",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "MONTÉO Plomberie & Électricité",
    description:
      "Services premium de plomberie et électricité générale à Montpellier et sa métropole.",
    telephone: "04 67 00 00 00",
    areaServed: "Montpellier et sa métropole",
    openingHours: "Mo-Su 00:00-24:00",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montpellier",
      postalCode: "34000",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
  };

  return (
    <html lang="fr" className={onest.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <SmoothScroll />
        <PageLoader />
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* <MobileStickyBar /> */}
        <ScrollReveal />
        <SpotlightCards />
      </body>
    </html>
  );
}

