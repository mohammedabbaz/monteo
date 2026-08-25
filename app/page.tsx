import React from "react";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { EmergencyBanner } from "@/components/home/EmergencyBanner";
import { TrustBar } from "@/components/home/TrustBar";
import { AboutSection } from "@/components/home/AboutSection";
import { ActionBand } from "@/components/home/ActionBand";
import { ProcessSection } from "@/components/home/ProcessSection";
import { WorksSection } from "@/components/home/WorksSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AreaSection } from "@/components/home/AreaSection";
import { FaqSection } from "@/components/home/FaqSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <EmergencyBanner />
      <TrustBar />
      <AboutSection />
      <ActionBand />
      <ProcessSection />
      <WorksSection />
      <StatsSection />
      <TestimonialsSection />
      <AreaSection />
      <FaqSection />
    </>
  );
}

