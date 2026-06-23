import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Play, Download, Sparkles } from "lucide-react";

interface MediaHeroProps {
  onWatchStories: () => void;
  onDownloadBrochure: () => void;
}

export const MediaHero: React.FC<MediaHeroProps> = ({ onWatchStories, onDownloadBrochure }) => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-beige-cream to-brand-beige/30 rounded-3xl border border-brand-green/10 p-8 md:p-12 lg:p-16 mb-12 shadow-premium">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-brown-warm/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Headline and copy */}
        <motion.div
          className="lg:col-span-7 flex flex-col gap-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green-deep font-extrabold text-xs tracking-wider uppercase w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            {t("media.hero.badge")}
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-green-deep leading-tight">
            {t("media.hero.title")}
          </h1>

          {/* Subheadline & Description */}
          <div className="flex flex-col gap-3">
            <p className="text-lg font-bold text-brand-brown-warm">
              {t("media.hero.subtitle")}
            </p>
            <p className="text-base text-brand-text-muted leading-relaxed font-semibold">
              {t("media.hero.paragraph")}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button
              onClick={onWatchStories}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-extrabold text-white bg-brand-green-deep hover:bg-brand-green shadow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <Play className="w-4 h-4 fill-white" />
              {t("media.hero.watchStories")}
            </button>
            <button
              onClick={onDownloadBrochure}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-extrabold text-brand-green bg-white hover:bg-brand-green-light border border-brand-green/20 hover:border-brand-green/45 shadow-sm hover:shadow transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              {t("media.hero.downloadBrochure")}
            </button>
          </div>
        </motion.div>

        {/* Right Side: Cinematic Collage */}
        <motion.div
          className="lg:col-span-5 relative w-full h-[320px] md:h-[400px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Main big image */}
          <motion.div
            className="absolute w-[60%] h-[60%] rounded-2xl overflow-hidden border border-brand-green/20 shadow-lg bg-white"
            style={{ zIndex: 3 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/images/hero-village.svg"
              alt="Farmer village visualization"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Upper left image */}
          <motion.div
            className="absolute top-4 left-4 w-[45%] h-[40%] rounded-2xl overflow-hidden border border-brand-green/20 shadow-md bg-white"
            style={{ zIndex: 2 }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/images/field-hero.svg"
              alt="Biochar soil field"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Lower right image */}
          <motion.div
            className="absolute bottom-4 right-4 w-[50%] h-[45%] rounded-2xl overflow-hidden border border-brand-green/20 shadow-md bg-white"
            style={{ zIndex: 1 }}
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/images/farm-process.svg"
              alt="Farm production sorting process"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Subtle floating badge */}
          <motion.div
            className="absolute top-1/2 right-6 bg-brand-accent-sunlight text-brand-text font-black text-xs px-3 py-2 rounded-xl shadow-lg border border-white/20"
            style={{ zIndex: 4 }}
            animate={{ rotate: [-2, 2, -2], y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            100% Organic Biochar
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MediaHero;
