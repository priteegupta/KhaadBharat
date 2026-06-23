import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, ShieldAlert } from "lucide-react";

export const ContactHero: React.FC = () => {
  const { t } = useTranslation("contact");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-green-light/80 via-white to-brand-beige-cream/40 rounded-3xl border border-brand-green/10 p-8 md:p-12 lg:p-16 mb-12 shadow-sm">
      {/* Decorative background vectors */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-brown/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Text Area */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-brand-green bg-brand-green/10 uppercase mb-6 border border-brand-green/20">
            <Leaf className="w-3.5 h-3.5" />
            {t("hero.badge")}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-green-deep tracking-tight leading-tight">
            {t("hero.title")}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-brand-text font-semibold leading-relaxed max-w-xl">
            {t("hero.subtitle")}
          </p>

          <p className="mt-3 text-sm text-brand-text-muted font-bold leading-relaxed max-w-xl">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection("contact-form-section")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold text-white bg-brand-green-deep hover:bg-brand-green hover:scale-[1.02] active:scale-[0.98] shadow-md transition-all duration-200"
            >
              {t("hero.contactBtn")}
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection("distributor-section")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold text-brand-text bg-white border border-brand-green/25 hover:bg-brand-green-light hover:border-brand-green/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              {t("hero.partnerBtn")}
            </button>
          </div>
        </motion.div>

        {/* Visual Illustration Area */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full max-w-[380px] aspect-square rounded-2xl bg-white border border-brand-green/10 shadow-premium p-6 flex items-center justify-center overflow-hidden group">
            {/* Animated SVG illustration */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full text-brand-green"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sun Backdrop */}
              <circle cx="100" cy="80" r="30" className="fill-brand-accent-sunlight/20 stroke-brand-accent-sunlight/30 stroke-2" />
              
              {/* Soil / Land Layer */}
              <path
                d="M30 150 Q65 140 100 150 T170 150 Q180 155 170 160 Q100 165 30 160 Z"
                className="fill-brand-brown/10 stroke-brand-brown/30 stroke-2"
              />
              
              {/* Secondary Soil Curve */}
              <path
                d="M40 160 Q100 155 160 160"
                className="stroke-brand-brown/40 stroke-2 stroke-dashed"
                strokeDasharray="4,4"
              />

              {/* Biochar pores representation */}
              <circle cx="60" cy="155" r="2" className="fill-brand-text/30" />
              <circle cx="85" cy="157" r="1.5" className="fill-brand-text/30" />
              <circle cx="115" cy="154" r="2.5" className="fill-brand-text/30" />
              <circle cx="140" cy="156" r="1.5" className="fill-brand-text/30" />

              {/* Central Growing Crop/Leaf */}
              <g className="transition-transform duration-500 group-hover:scale-105 origin-[100px_150px]">
                {/* Stem */}
                <path d="M100 150 V90" className="stroke-brand-green-deep stroke-3" strokeLinecap="round" />
                
                {/* Left Leaf */}
                <path
                  d="M100 120 C80 115 65 95 80 85 C95 75 100 100 100 120 Z"
                  className="fill-brand-green/80 stroke-brand-green-deep stroke-2"
                />
                
                {/* Right Leaf */}
                <path
                  d="M100 105 C120 100 135 80 120 70 C105 60 100 85 100 105 Z"
                  className="fill-brand-green stroke-brand-green-deep stroke-2"
                />

                {/* Top Leaf */}
                <path
                  d="M100 90 C90 75 100 55 100 55 C100 55 110 75 100 90 Z"
                  className="fill-brand-green-light stroke-brand-green-deep stroke-2"
                />
              </g>

              {/* Farmers / Collaboration Icons */}
              {/* Support hands representation */}
              <path
                d="M45 130 C45 120 55 110 65 115 L60 120 C55 122 50 127 52 132"
                className="stroke-brand-green-deep/40 stroke-2"
                strokeLinecap="round"
              />
              <path
                d="M155 130 C155 120 145 110 135 115 L140 120 C145 122 150 127 148 132"
                className="stroke-brand-green-deep/40 stroke-2"
                strokeLinecap="round"
              />

              {/* Micro animations indicator */}
              <circle cx="100" cy="55" r="4" className="fill-brand-accent-sunlight animate-ping origin-center" />
            </svg>

            {/* Float tag */}
            <div className="absolute bottom-4 left-4 right-4 bg-brand-green-light/95 border border-brand-green/20 px-3.5 py-2 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-[10px] md:text-xs font-black text-brand-green-deep uppercase tracking-wider">
                Active Farmer Network Support
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactHero;
