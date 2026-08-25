import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
  dotColor?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  tone = "dark",
  className,
  dotColor,
}) => {
  return (
    <div className={cn("eyebrow", tone === "dark" ? "tone-dark" : "tone-light", className)}>
      <span
        className="dot"
        style={dotColor ? { backgroundColor: dotColor } : undefined}
      />
      <span>{children}</span>
    </div>
  );
};

export const EmergencyPulseBadge: React.FC<{
  text?: string;
  className?: string;
}> = ({ text = "Urgence Dépannage 24h/24 & 7j/7 — Arrivée sous 30 min", className }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-orange-500/40 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-[0_4px_20px_rgba(232,93,42,0.2)] backdrop-blur-md text-foreground transition-all duration-300 hover:scale-[1.02] hover:border-orange-500",
        className
      )}
    >
      <span className="pulse-dot" />
      <span>{text}</span>
    </div>
  );
};

