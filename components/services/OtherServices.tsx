import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Badge";
import { SERVICES } from "@/data/services";

interface OtherServicesProps {
  currentId: string;
}

export const OtherServices: React.FC<OtherServicesProps> = ({ currentId }) => {
  const others = SERVICES.filter((s) => s.id !== currentId);

  return (
    <div className="my-10 sm:my-14">
      <div className="mb-6">
        <Eyebrow tone="dark">Nos autres métiers</Eyebrow>
        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mt-1">
          Découvrez également toutes nos expertises
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {others.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="rounded-2xl bg-surface border border-line p-5 sm:p-6 flex flex-col justify-between gap-4 hover:border-accent hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
          >
            <div>
              <div className="text-xs font-bold text-accent">{service.index}</div>
              <h4 className="text-base sm:text-lg font-bold text-foreground group-hover:text-accent transition-colors mt-1">
                {service.title}
              </h4>
              <p className="text-xs sm:text-sm text-muted mt-2 line-clamp-2 leading-relaxed">
                {service.shortDesc}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              <span>Voir la prestation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

