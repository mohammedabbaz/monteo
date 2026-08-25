import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "accent" | "dark" | "light" | "outline";
  arrow?: "right" | "up-right" | "none";
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "accent",
  arrow = "none",
  href,
  children,
  className,
  ...props
}) => {
  const variantClass = {
    accent: "btn-accent",
    dark: "btn-dark",
    light: "btn-light",
    outline: "btn-outline",
  }[variant];

  const arrowClass = arrow !== "none" ? "has-arrow" : "no-arrow";
  const combinedClassName = cn("pill-btn", variantClass, arrowClass, className);

  const content = (
    <>
      <span>{children}</span>
      {arrow === "right" && (
        <span className="arrow-badge arrow-right">
          <ArrowRight className="w-4 h-4" />
        </span>
      )}
      {arrow === "up-right" && (
        <span className="arrow-badge arrow-up-right">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {content}
    </button>
  );
};

