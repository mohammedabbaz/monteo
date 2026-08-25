"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  ArrowRight,
  CheckCircle2,
  Zap,
  Wrench,
  ShowerHead,
  AlertCircle,
  ShieldCheck,
  FileText,
  Clock,
  Truck,
} from "lucide-react";
import { ServiceData, SERVICES } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { ServiceGallery } from "@/components/services/ServiceGallery";
import { OtherServices } from "@/components/services/OtherServices";

interface ServiceDetailViewProps {
  service: ServiceData;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ service }) => {
  const getTabIcon = (id: string) => {
    switch (id) {
      case "plomberie":
        return <Wrench className="w-4 h-4" />;
      case "electricite":
        return <Zap className="w-4 h-4" />;
      case "renovation":
        return <ShowerHead className="w-4 h-4" />;
      case "depannage":
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 bg-background">
      <div className="shell">
        {/* 1. Top Navigation Bar: Retour à l'accueil & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-5">
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-surface hover:bg-white text-foreground border border-line shadow-sm hover:text-accent hover:-translate-x-1 transition-all min-h-[40px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l&apos;accueil</span>
            </Link>

            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted">
              <Link href="/" className="hover:text-foreground transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <span>Nos prestations</span>
              <span>/</span>
              <span className="text-accent font-semibold">{service.category}</span>
            </div>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-accent bg-accent/10 border border-accent/25 rounded-full px-3.5 py-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Intervention express 7j/7 • Montpellier & Métropole</span>
          </div>
        </div>

        {/* 2. Category Switcher Tabs Bar */}
        <div className="flex flex-col gap-2 p-3 sm:p-4 mb-6 sm:mb-8 bg-surface border border-line rounded-2xl shadow-sm">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Nos 4 corps d&apos;état & prestations spécialisées</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {SERVICES.map((tab) => {
              const isActive = tab.id === service.id;
              return (
                <Link
                  key={tab.id}
                  href={`/services/${tab.slug}`}
                  className={`inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-all text-center min-h-[44px] ${
                    isActive
                      ? "bg-accent text-white border-accent shadow-md scale-[1.01]"
                      : "bg-white text-foreground border-line hover:border-accent/40 hover:text-accent"
                  }`}
                >
                  {getTabIcon(tab.id)}
                  <span className="truncate">{tab.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 3. Hero Header Card for Current Service */}
        <div className="rounded-[2rem] bg-surface border border-line p-6 sm:p-10 mb-8 sm:mb-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <Eyebrow tone="dark">{service.category}</Eyebrow>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Artisans qualifiés à Montpellier & métropole
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                {service.heroTitle}
              </h1>

              <p className="text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
                {service.lead}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href="tel:0467000000"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-surface-2 text-foreground border border-line hover:bg-foreground hover:text-white transition-all min-h-[48px]"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>04 67 00 00 00</span>
              </a>

              <Button
                href="/devis"
                variant="accent"
                arrow="right"
                className="text-sm py-3 px-6 shadow-md min-h-[48px]"
              >
                Demander un devis gratuit
              </Button>
            </div>
          </div>
        </div>

        {/* 4. 2-Columns Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          {/* Left Column: Visual Card, Certifications & Commitments */}
          <div className="lg:col-span-5 rounded-[2rem] bg-surface border border-line p-5 sm:p-7 flex flex-col gap-6">
            {/* Gallery */}
            <ServiceGallery
              mainImage={service.mainImage}
              photoCaption={service.photoCaption}
              gallery={service.gallery}
            />

            {/* Certifications Box */}
            <div className="pt-4 border-t border-line flex flex-col gap-3">
              <div className="text-xs uppercase tracking-wider font-bold text-muted">
                Certifications & Garanties Légales
              </div>
              <div className="flex flex-wrap gap-2">
                {service.certifications.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{c}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 4 Commitments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl bg-surface-2 border border-line p-3 flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-foreground">Intervention rapide</div>
                  <div className="text-[11px] text-muted">Arrivée en 30 min en urgence</div>
                </div>
              </div>

              <div className="rounded-xl bg-surface-2 border border-line p-3 flex items-start gap-2.5">
                <Truck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-foreground">Véhicule atelier</div>
                  <div className="text-[11px] text-muted">Pièces neuves immédiatement</div>
                </div>
              </div>

              <div className="rounded-xl bg-surface-2 border border-line p-3 flex items-start gap-2.5">
                <FileText className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-foreground">Devis 100% gratuit</div>
                  <div className="text-[11px] text-muted">Chiffrage clair avant engagement</div>
                </div>
              </div>

              <div className="rounded-xl bg-surface-2 border border-line p-3 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-foreground">Garantie Décennale</div>
                  <div className="text-[11px] text-muted">Assurance AXA sur chaque chantier</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Tasks Scope, Workflow & Inline CTA */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Price Estimate Card */}
            <div className="rounded-[2rem] bg-surface border border-line p-6 sm:p-7 shadow-sm flex flex-col gap-2">
              <div className="text-xs uppercase tracking-wider font-bold text-muted">
                Estimation tarifaire & Délais
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-accent">
                {service.pricing}
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 mt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Tarifs transparents annoncés avant intervention — Zéro frais caché</span>
              </div>
            </div>

            {/* Scope of Work Tasks Grid */}
            <div className="rounded-[2rem] bg-surface border border-line p-6 sm:p-7 shadow-sm">
              <div className="text-xs uppercase tracking-wider font-bold text-muted mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Prestations & Interventions incluses</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {service.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-surface-2 border border-line text-xs sm:text-sm text-foreground leading-relaxed hover:border-accent/40 hover:translate-x-1 transition-all"
                  >
                    <span className="text-accent shrink-0 mt-0.5 font-bold">✓</span>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Workflow */}
            <div className="rounded-[2rem] bg-surface border border-line p-6 sm:p-7 shadow-sm">
              <div className="text-xs uppercase tracking-wider font-bold text-muted mb-4">
                Comment se déroule votre prestation
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.workflow.map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-surface-2 border border-line p-3.5 flex flex-col gap-1"
                  >
                    <div className="text-xs font-extrabold text-accent">{step.step}</div>
                    <div className="text-sm font-bold text-foreground">{step.title}</div>
                    <div className="text-xs text-muted leading-relaxed">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fast Quote Inline Banner */}
            <div className="rounded-[2rem] bg-gradient-to-br from-surface via-surface-2 to-surface border border-accent/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-foreground">
                  Besoin d&apos;une intervention ou d&apos;un conseil ?
                </h4>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  Nos artisans plombiers et électriciens vous répondent immédiatement.
                </p>
              </div>
              <Button
                href="/devis"
                variant="accent"
                arrow="right"
                className="text-xs sm:text-sm py-2.5 px-5 shrink-0"
              >
                Demander un chiffrage
              </Button>
            </div>
          </div>
        </div>

        {/* 5. Service-Specific FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="rounded-[2rem] bg-surface border border-line p-6 sm:p-10 mb-10 shadow-sm">
            <div className="mb-6">
              <Eyebrow tone="dark">Foire aux questions</Eyebrow>
              <h3 className="text-xl sm:text-3xl font-extrabold text-foreground mt-1">
                Questions fréquentes sur nos prestations de {service.title}
              </h3>
            </div>
            <Accordion items={service.faqs} />
          </div>
        )}

        {/* 6. Other Services Cross-Link Grid */}
        <OtherServices currentId={service.id} />
      </div>
    </div>
  );
};

