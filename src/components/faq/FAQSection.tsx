import React from "react";
import { useTranslation } from "react-i18next";
import FAQAccordion from "./FAQAccordion";
import { Sprout, ShoppingBag, Droplets, CloudSun, FileText, Briefcase, ExternalLink } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  categoryKey: string;
  title: string;
  subtitle: string;
  items: FAQItem[];
  searchQuery?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  categoryKey,
  title,
  subtitle,
  items,
  searchQuery = "",
}) => {
  const { t } = useTranslation("faq");
  // Render Category-Specific Visuals
  const renderVisual = () => {
    switch (categoryKey) {
      case "product":
        return (
          <div className="rounded-3xl border border-brand-green/10 bg-white p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 text-brand-green">
              <ShoppingBag className="w-5 h-5" />
              <h4 className="text-sm font-black text-brand-green-deep uppercase tracking-wider">{t("visuals.product.title")}</h4>
            </div>
            <p className="text-xs text-brand-text-muted font-bold">
              {t("visuals.product.description")}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { size: "5 kg", label: t("visuals.product.packHome") },
                { size: "20 kg", label: t("visuals.product.packMedium") },
                { size: "50 kg", label: t("visuals.product.packBulk") },
              ].map((pack, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-brand-green-light/30 border border-brand-green/10 text-center flex flex-col items-center justify-center">
                  <span className="text-sm font-black text-brand-green-deep">{pack.size}</span>
                  <span className="text-[9px] font-bold text-brand-text-muted mt-1">{pack.label}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "biochar":
        return (
          <div className="rounded-3xl border border-brand-green/10 bg-white p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 text-brand-green">
              <Sprout className="w-5 h-5" />
              <h4 className="text-sm font-black text-brand-green-deep uppercase tracking-wider">{t("visuals.biochar.title")}</h4>
            </div>
            {/* Interactive SVG Diagram */}
            <div className="w-full bg-brand-beige-cream/40 rounded-2xl p-4 border border-brand-green/5 flex flex-col items-center">
              <svg className="w-full max-w-[280px]" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Soil line */}
                <rect x="10" y="80" width="180" height="30" rx="6" fill="#dfc29a" opacity="0.3" />
                <line x1="10" y1="80" x2="190" y2="80" stroke="#8b5a2b" strokeWidth="2" strokeDasharray="3 3" />
                {/* Plant stem */}
                <path d="M100 80 V 40" stroke="#5c7f2f" strokeWidth="4" />
                <path d="M100 50 Q 80 40 70 45" stroke="#5c7f2f" strokeWidth="3" />
                <path d="M100 60 Q 120 50 130 55" stroke="#5c7f2f" strokeWidth="3" />
                {/* Biochar sponge pores */}
                <rect x="75" y="85" width="50" height="20" rx="4" fill="#1f2f1b" />
                <circle cx="85" cy="95" r="3" fill="#5c7f2f" className="animate-ping" />
                <circle cx="100" cy="95" r="3" fill="#5c7f2f" />
                <circle cx="115" cy="95" r="3" fill="#5c7f2f" />
                <text x="100" y="115" fill="#385629" fontSize="8" fontWeight="bold" textAnchor="middle">{t("visuals.biochar.waterLockText")}</text>
              </svg>
              <p className="text-[10px] text-brand-text-muted font-bold text-center mt-2 leading-relaxed">
                {t("visuals.biochar.description")}
              </p>
            </div>
          </div>
        );

      case "benefits":
        return (
          <div className="rounded-3xl border border-brand-brown/10 bg-white p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 text-brand-brown">
              <Droplets className="w-5 h-5 text-brand-brown-warm" />
              <h4 className="text-sm font-black text-brand-green-deep uppercase tracking-wider">{t("visuals.benefits.title")}</h4>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { metric: t("visuals.benefits.metricWaterCost"), detail: t("visuals.benefits.detailWaterCost") },
                { metric: t("visuals.benefits.metricChemical"), detail: t("visuals.benefits.detailChemical") },
                { metric: t("visuals.benefits.metricYield"), detail: t("visuals.benefits.detailYield") },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center p-3 rounded-2xl bg-brand-accent-soft border border-brand-brown-warm/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-brown-warm" />
                  <div>
                    <span className="text-xs font-black text-brand-green-deep block leading-tight">{item.metric}</span>
                    <span className="text-[10px] font-semibold text-brand-text-muted">{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "weather":
        return (
          <div className="rounded-3xl border border-brand-green/10 bg-white p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 text-brand-green">
              <CloudSun className="w-5 h-5" />
              <h4 className="text-sm font-black text-brand-green-deep uppercase tracking-wider">{t("visuals.weather.title")}</h4>
            </div>
            <p className="text-xs text-brand-text-muted font-bold">
              {t("visuals.weather.description")}
            </p>
            <div className="p-3 rounded-2xl bg-brand-green-light/30 border border-brand-green/10 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs font-black text-brand-green-deep">
                <span>{t("visuals.weather.soilMoisture")}</span>
                <span>42% ({t("visuals.weather.optimal")})</span>
              </div>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-brand-green/5">
                <div className="bg-brand-green h-full w-[42%]" />
              </div>
              <span className="text-[10px] text-brand-brown font-black mt-1 block">{t("visuals.weather.recommendation")}</span>
            </div>
          </div>
        );

      case "schemes":
        return (
          <div className="rounded-3xl border border-brand-green/10 bg-white p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 text-brand-green">
              <FileText className="w-5 h-5" />
              <h4 className="text-sm font-black text-brand-green-deep uppercase tracking-wider">{t("visuals.schemes.title")}</h4>
            </div>
            <p className="text-xs text-brand-text-muted font-bold">
              {t("visuals.schemes.description")}
            </p>
            <div className="p-3.5 rounded-2xl bg-brand-green-light/20 border border-brand-green/5 text-xs font-semibold text-brand-green-deep flex flex-col gap-2">
              <div className="flex gap-2">
                <span className="text-brand-green font-black">✓</span>
                <span>{t("visuals.schemes.pkvy")}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-brand-green font-black">✓</span>
                <span>{t("visuals.schemes.soilHealth")}</span>
              </div>
            </div>
          </div>
        );

      case "distributors":
        return (
          <div className="rounded-3xl border border-brand-brown/10 bg-white p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 text-brand-brown">
              <Briefcase className="w-5 h-5 text-brand-brown-warm" />
              <h4 className="text-sm font-black text-brand-green-deep uppercase tracking-wider">{t("visuals.distributors.title")}</h4>
            </div>
            <p className="text-xs text-brand-text-muted font-bold">
              {t("visuals.distributors.description")}
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-brand-green/10 bg-brand-green-light/20 text-xs font-black text-brand-green-deep">
                <span>{t("visuals.distributors.hotline")}</span>
                <span className="text-[10px] text-brand-green">+91 96259 00369</span>
              </div>
              <a
                href="https://wa.me/919625900369"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors text-center"
              >
                <span>{t("visuals.distributors.whatsapp")}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-8 border-t border-brand-green/10 first:border-t-0">
      {/* FAQ Accordion block */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-brand-green-deep leading-snug">
            {title}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-brand-text-muted mt-1 leading-relaxed">
            {subtitle}
          </p>
        </div>
        <div className="mt-4">
          <FAQAccordion items={items} searchQuery={searchQuery} />
        </div>
      </div>

      {/* Visual Component block */}
      <div className="lg:col-span-4 lg:sticky lg:top-24 mt-6 lg:mt-0">
        {renderVisual()}
      </div>
    </div>
  );
};

export default FAQSection;
