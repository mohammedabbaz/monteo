"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  className,
  allowMultiple = false,
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, idx) => {
        const isOpen = openIndexes.includes(idx);
        return (
          <div
            key={idx}
            className="border-t border-line last:border-b transition-colors duration-200"
          >
            <button
              type="button"
              onClick={() => toggleIndex(idx)}
              className="w-full flex justify-between items-center py-4 sm:py-5 text-left text-sm sm:text-base md:text-lg font-semibold text-foreground gap-3 hover:text-accent transition-colors"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span
                className={cn(
                  "w-6 h-6 flex items-center justify-center text-accent shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              >
                <ChevronDown className="w-5 h-5" />
              </span>
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out text-muted text-xs sm:text-sm md:text-base leading-relaxed",
                isOpen ? "max-h-96 pb-4 sm:pb-6 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
};

