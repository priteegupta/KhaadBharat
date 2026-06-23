import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import { motion } from "framer-motion";

export const MediaCTA: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-3xl bg-brand-green-deep text-white p-8 md:p-12 lg:p-16 shadow-premium mb-6">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-brown-warm/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative leaf vectors floating */}
      <div className="absolute top-8 left-8 text-white/5 pointer-events-none">
        <Leaf className="w-24 h-24 rotate-[15deg]" />
      </div>
      <div className="absolute bottom-8 right-8 text-white/5 pointer-events-none">
        <Leaf className="w-24 h-24 rotate-[-45deg]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto gap-6">
        <span className="inline-block px-3.5 py-1 text-xs font-black tracking-widest text-brand-accent-sunlight uppercase bg-white/10 rounded-full w-fit">
          {t("media.hero.badge")}
        </span>
        
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
          {t("media.cta.title")}
        </h2>
        
        <p className="text-base text-white/80 leading-relaxed font-semibold">
          {t("media.cta.subtitle")}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <button
            onClick={() => navigate("/contact", { state: { interest: "dealer" } })}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-base font-extrabold text-white bg-brand-green hover:bg-brand-green-light hover:text-brand-green-deep shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            {t("media.cta.partnerBtn")}
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-base font-extrabold text-brand-green bg-white hover:bg-brand-green-light shadow hover:-translate-y-0.5 transition-all duration-300"
          >
            {t("media.cta.connectBtn")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MediaCTA;
