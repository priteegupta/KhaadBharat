import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Download, Leaf, ShieldCheck, Droplets, Sprout } from "lucide-react";

export const ProductHero: React.FC = () => {
  const { t } = useTranslation("product");

  const handleExploreClick = () => {
    const el = document.getElementById("benefits-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-green-light/40 to-transparent py-16 sm:py-24 rounded-3xl border border-brand-green/10 mb-12">
      {/* Background soft gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green-light/60 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-brown-soft/20 rounded-full blur-3xl opacity-30 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left copy column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 mb-6"
          >
            <Leaf className="w-4 h-4 text-brand-green animate-pulse" />
            <span className="text-xs font-black text-brand-green uppercase tracking-widest">
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-green-deep leading-tight tracking-tight mb-4"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl font-bold text-brand-brown-warm mb-4"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-brand-text-muted leading-relaxed mb-8 max-w-xl"
          >
            {t("hero.description")}
          </motion.p>

          {/* Call-to-actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={handleExploreClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-black text-white bg-brand-green hover:bg-brand-green-deep shadow-premium hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-0.5 group"
            >
              <span>{t("hero.ctaExplore")}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="/downloads/product-brochure.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-black text-brand-green-deep bg-white hover:bg-brand-green-light border border-brand-green/20 hover:border-brand-green/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              <span>{t("hero.ctaDownload")}</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-brand-text-muted/70 mt-6 font-bold flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-brand-green" />
            {t("hero.subtext")}
          </motion.p>
        </div>

        {/* Right visualization column */}
        <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-full max-w-sm"
          >
            {/* Main Visual Circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-green/20 to-brand-brown-warm/15 border-2 border-brand-green/10 shadow-premium flex items-center justify-center p-8 overflow-hidden">
              {/* Dynamic decorative backdrop SVG representing soil & roots */}
              <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-30 text-brand-brown" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,80 Q25,50 50,80 T100,80 L100,100 L0,100 Z" fill="currentColor" />
              </svg>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-brand-green/10 border border-brand-green/30 flex items-center justify-center mb-4 shadow-sm">
                  <Leaf className="w-10 h-10 text-brand-green" />
                </div>
                <span className="text-xl font-black text-brand-green-deep tracking-wide uppercase">
                  {t("heroVisuals.biocharActivated")}
                </span>
                <span className="text-xs text-brand-brown-warm font-bold uppercase tracking-wider mt-1">
                  {t("heroVisuals.organicCarbon")}
                </span>
              </div>
            </div>

            {/* Floating Card 1: Soil Moisture */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-sm border border-brand-green/10 p-3 rounded-2xl shadow-premium flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <Droplets className="w-5 h-5 animate-bounce" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-black text-brand-green-deep">{t("heroVisuals.waterSaver")}</span>
                <span className="text-[10px] text-brand-text-muted font-bold">{t("heroVisuals.sixTimesAbsorb")}</span>
              </div>
            </motion.div>

            {/* Floating Card 2: Microbe Safe */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-2 -right-4 bg-white/95 backdrop-blur-sm border border-brand-green/10 p-3 rounded-2xl shadow-premium flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-green/5 flex items-center justify-center text-brand-green">
                <Sprout className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-black text-brand-green-deep">{t("heroVisuals.richMicrobes")}</span>
                <span className="text-[10px] text-brand-text-muted font-bold">{t("heroVisuals.healthyRootzone")}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
