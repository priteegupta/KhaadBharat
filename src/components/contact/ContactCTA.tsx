import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

export const ContactCTA: React.FC = () => {
  const { t } = useTranslation("contact");
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden bg-brand-green-deep text-white rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-premium">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-brown/10 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20" />

      <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-widest text-brand-accent-sunlight uppercase bg-white/10 mb-6 border border-white/10 shadow-sm animate-pulse">
          <Sparkles className="w-3 h-3" />
          {t("cta.badge")}
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
          {t("cta.title")}
        </h2>

        <p className="text-xs md:text-sm text-brand-green-light font-bold mb-8 leading-relaxed">
          {t("cta.subtitle")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection("contact-form-section")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs md:text-sm font-black text-brand-green-deep bg-white hover:bg-brand-accent-sunlight hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
          >
            {t("cta.btnContact")}
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection("distributor-section")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs md:text-sm font-black text-white bg-brand-green border border-white/20 hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
          >
            {t("cta.btnPartner")}
          </button>

          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-xs md:text-sm font-black text-brand-green-light hover:text-white transition-all duration-200"
          >
            <Leaf className="w-3.5 h-3.5" />
            {t("cta.btnProduct")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCTA;
