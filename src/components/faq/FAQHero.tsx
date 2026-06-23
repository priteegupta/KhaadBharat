import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HelpCircle, Sparkles, Sprout, CloudSun, ShieldCheck, ArrowRight } from "lucide-react";

interface FAQHeroProps {
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  btnBrowse: string;
  btnSupport: string;
  onBrowseClick: () => void;
  onSupportClick: () => void;
}

export const FAQHero: React.FC<FAQHeroProps> = ({
  badge,
  headline,
  subheadline,
  description,
  btnBrowse,
  btnSupport,
  onBrowseClick,
  onSupportClick,
}) => {
  const { t } = useTranslation("faq");
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-beige-cream to-white border border-brand-green/10 shadow-premium p-8 md:p-12 lg:p-16">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green-light/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-brown-soft/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Copy Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-black tracking-widest text-brand-brown uppercase bg-brand-brown-warm/10 rounded-full mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-brown-warm fill-brand-brown-warm" />
            {badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-green-deep tracking-tight leading-none mb-4"
          >
            {headline}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl font-bold text-brand-brown leading-snug mb-4"
          >
            {subheadline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base text-brand-text-muted leading-relaxed font-semibold mb-8 max-w-xl"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onBrowseClick}
              className="px-6 py-3.5 rounded-full text-sm font-black bg-brand-green text-white hover:bg-brand-green-deep hover:shadow-lg transition-all flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              {btnBrowse}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onSupportClick}
              className="px-6 py-3.5 rounded-full text-sm font-black bg-white border border-brand-green/20 text-brand-text hover:bg-brand-green-light/40 transition-all w-full sm:w-auto text-center"
            >
              {btnSupport}
            </button>
          </motion.div>
        </div>

        {/* Right Visual Dashboard Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[380px] aspect-square rounded-3xl bg-white/40 border border-white/60 shadow-premium p-6 backdrop-blur-md flex flex-col justify-between overflow-hidden">
            {/* Ambient visual decorations */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green-light/20 via-transparent to-brand-brown-soft/5 pointer-events-none" />

            {/* Dashboard Row 1: Soil Moisture */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-brand-green/10 shadow-sm relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-green/10 rounded-xl text-brand-green">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider block">{t("heroVisuals.soilMoistureHeader")}</span>
                  <span className="text-sm font-black text-brand-green-deep">{t("heroVisuals.healthySponge")}</span>
                </div>
              </div>
              <span className="text-xs font-black text-brand-green px-2 py-0.5 rounded-full bg-brand-green-light">{t("heroVisuals.retained")}</span>
            </div>

            {/* Dashboard Row 2: Weather Advice Widget */}
            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-brand-green/10 shadow-sm relative z-10 my-4">
              <div className="p-2.5 bg-brand-accent-soft rounded-xl text-brand-brown-warm">
                <CloudSun className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider block">{t("heroVisuals.realtimeForecast")}</span>
                <p className="text-xs font-black text-brand-green-deep leading-tight">{t("heroVisuals.idealSowing")}</p>
                <span className="text-[10px] text-brand-brown font-semibold">{t("heroVisuals.delhiRegion")}</span>
              </div>
            </div>

            {/* Dashboard Row 3: Organic Biochar Seal */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-brand-green/10 shadow-sm relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-green-deep text-white rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider block">{t("heroVisuals.trustVerified")}</span>
                  <span className="text-sm font-black text-brand-green-deep">{t("heroVisuals.organicCarbon")}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-brand-green/20 border-t-brand-green animate-spin" />
            </div>

            {/* Center graphical accent (soil particle flow illustration) */}
            <div className="absolute top-[40%] left-[45%] opacity-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-0 animate-pulse">
              <HelpCircle className="w-48 h-48 text-brand-green" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQHero;
