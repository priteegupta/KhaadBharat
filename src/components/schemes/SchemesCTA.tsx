import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, BookOpen } from "lucide-react";

export const SchemesCTA: React.FC = () => {
  const { t } = useTranslation("schemes");

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green-deep to-brand-green p-8 md:p-12 lg:p-14 text-white text-center shadow-premium border border-brand-green/20">
      {/* Background Graphic Patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10%" cy="20%" r="100" fill="white" />
          <circle cx="90%" cy="80%" r="150" fill="white" />
        </svg>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-beige-cream tracking-tight leading-tight">
          {t("sections.cta.title")}
        </h2>
        <p className="text-sm md:text-base text-brand-beige/95 leading-relaxed font-bold">
          {t("sections.cta.subtitle")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          {/* Connect with Team */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold text-brand-green-deep bg-brand-accent-sunlight hover:bg-brand-accent-sunlight/90 shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            {t("ctaSection.connectBtn")}
          </Link>

          {/* Explore More Support */}
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            {t("ctaSection.exploreMore")}
          </Link>

          {/* Get Guidance */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold text-white bg-transparent hover:bg-white/5 transition-colors"
          >
            {t("ctaSection.getGuidance")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SchemesCTA;
