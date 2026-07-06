import React from "react";
import { useTranslation } from "react-i18next";
import { Award, Briefcase, Users, Heart, ArrowRight } from "lucide-react";

interface DistributorSectionProps {
  onApplyClick: () => void;
}

export const DistributorSection: React.FC<DistributorSectionProps> = ({
  onApplyClick,
}) => {
  const { t } = useTranslation("contact");

  const benefitIcons: Record<string, any> = {
    market: Briefcase,
    product: Award,
    training: Users,
    network: Heart,
  };

  const keys = ["market", "product", "training", "network"];

  return (
    <div id="distributor-section" className="scroll-mt-24 bg-brand-green-deep rounded-3xl p-8 md:p-12 mb-12 text-white relative overflow-hidden shadow-premium">
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left text column */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <span className="inline-block px-3 py-1.5 text-[10px] md:text-xs font-black tracking-widest text-brand-accent-sunlight uppercase bg-white/10 rounded-full mb-4 border border-white/10 shadow-sm">
            {t("distributor.badge")}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 leading-tight">
            {t("distributor.title")}
          </h2>
          <p className="text-xs md:text-sm text-brand-green-light font-bold leading-relaxed mb-6">
            {t("distributor.desc")}
          </p>
          <button
            onClick={onApplyClick}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs md:text-sm font-black text-brand-green-deep bg-brand-accent-sunlight hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
          >
            {t("distributor.cta")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right benefits grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {keys.map((key) => {
            const Icon = benefitIcons[key];
            return (
              <div
                key={key}
                className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/25 hover:bg-white/15 transition-all duration-350 flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-brand-accent-sunlight shrink-0 group-hover:scale-110 group-hover:bg-brand-accent-sunlight group-hover:text-brand-green-deep transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-tight text-white mb-1">
                    {t(`distributor.benefits.${key}.title`)}
                  </h4>
                  <p className="text-[11px] text-brand-green-light font-semibold leading-relaxed">
                    {t(`distributor.benefits.${key}.desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DistributorSection;
