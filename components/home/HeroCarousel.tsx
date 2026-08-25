"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Wrench, Zap, ShowerHead, AlertCircle } from "lucide-react";
import { SERVICES } from "@/data/services";

export const HeroCarousel: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const icons = [
    <Wrench key="plomb" className="w-7 h-7 text-accent" />,
    <Zap key="elec" className="w-7 h-7 text-accent" />,
    <ShowerHead key="renov" className="w-7 h-7 text-accent" />,
    <AlertCircle key="urg" className="w-7 h-7 text-accent" />,
  ];

  const captions = [
    "INTERVENTION EXPRESS",
    "MISE AUX NORMES NF",
    "PROJET CLÉ-EN-MAIN",
    "ASTREINTE 24H/24 7J/7",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SERVICES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const next = () => setActiveIdx((prev) => (prev + 1) % SERVICES.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);

  const currentService = SERVICES[activeIdx];

  return (
    <div className="w-full max-w-full sm:max-w-md rounded-2xl bg-white/95 p-3 sm:p-3.5 shadow-2xl border border-line/90 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.15)] hover:border-accent/40 spotlight-card">
      <Link
        href={`/services/${currentService.slug}`}
        className="flex gap-3 rounded-xl cursor-pointer group"
      >
        {/* Tile Icon */}
        <div className="aspect-square w-16 sm:w-20 rounded-xl bg-ink grid place-items-center shrink-0 shadow-lg group-hover:scale-105 group-hover:-rotate-2 transition-transform">
          {icons[activeIdx]}
        </div>

        {/* Panel Content */}
        <div className="flex-1 rounded-xl bg-surface/60 p-3 sm:p-3.5 flex flex-col justify-between overflow-hidden border border-line/60">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-accent">
              {captions[activeIdx]}
            </div>
            <div className="text-sm sm:text-base font-bold text-foreground mt-0.5 line-clamp-1 group-hover:text-accent transition-colors">
              {currentService.title}
            </div>
          </div>

          {/* Bottom Indicators & Navigation */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-line/40">
            {/* Dashes */}
            <div className="flex gap-1 items-center">
              {SERVICES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIdx(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIdx === idx ? "w-5 bg-accent" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
                  }`}
                  aria-label={`Aller au service ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  prev();
                }}
                className="w-7 h-7 rounded-full bg-white border border-line grid place-items-center text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all"
                aria-label="Service précédent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  next();
                }}
                className="w-7 h-7 rounded-full bg-white border border-line grid place-items-center text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all"
                aria-label="Service suivant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

