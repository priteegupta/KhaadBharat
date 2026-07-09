import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Download, Sparkles } from "lucide-react";

interface MediaHeroProps {
  onWatchStories: () => void;
  onDownloadBrochure: () => void;
}

export const MediaHero: React.FC<MediaHeroProps> = ({ onWatchStories, onDownloadBrochure }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: "/images/struggling-farmer-portrait.webp",
      alt: "Indian Farmer Struggles"
    },
    {
      url: "/images/woman-farmer-resilient.webp",
      alt: "Resilient Indian Woman Farmer"
    },
    {
      url: "/images/farmer-couple-hope.webp",
      alt: "Farmer Couple Hope & Dedication"
    },
    {
      url: "/images/rice-planting-mud.webp",
      alt: "Traditional Rice Seedling Planting"
    },
    {
      url: "/images/farmer-hoe-field.webp",
      alt: "Farmer Tending Crops with Hoe"
    },
    {
      url: "/images/farmer-plow-storm.webp",
      alt: "Traditional ploughing under stormy sky"
    },
    {
      url: "/images/tractor-muddy-field.webp",
      alt: "Mechanized tilling in muddy field"
    },
    {
      url: "/images/tractor-plowing-dry.webp",
      alt: "Modern land tilling"
    },
    {
      url: "/images/farmer-broadcasting-mud.webp",
      alt: "Cooperative paddy cultivation"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden min-h-[480px] md:min-h-[550px] rounded-3xl border border-brand-green/20 flex items-center p-8 md:p-12 lg:p-16 mb-12 shadow-premium bg-brand-green-deep">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <AnimatePresence>
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].url}
            alt={slides[currentSlide].alt}
            className="absolute inset-0 w-full h-full object-cover object-center md:object-right"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 0.9, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />
        </AnimatePresence>
        
        {/* Left-to-right gradient overlay: Dark protective background for text on the left, fading to completely clear on the right to show the raw struggle and details */}
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-green-deep/95 via-brand-green-deep/80 to-transparent w-full md:w-[65%] z-10" />
        <div className="absolute inset-0 bg-black/15 z-0" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 max-w-2xl flex flex-col gap-6 text-left">
        {/* Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-brand-accent-sunlight font-extrabold text-xs tracking-wider uppercase w-fit backdrop-blur-sm shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {t("media.hero.badge")}
        </motion.div>

        {/* Headline */}
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-md"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t("media.hero.title")}
        </motion.h1>

        {/* Subheadline & Description */}
        <motion.div 
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl font-bold text-brand-accent-sunlight drop-shadow-md">
            {t("media.hero.subtitle")}
          </p>
          <p className="text-sm md:text-base text-white/90 leading-relaxed font-bold max-w-2xl drop-shadow-md">
            {t("media.hero.paragraph")}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div 
          className="flex flex-wrap items-center gap-4 mt-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={onWatchStories}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-extrabold text-brand-green-deep bg-brand-accent-sunlight hover:bg-white shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
          >
            <Play className="w-4 h-4 fill-brand-green-deep" />
            {t("media.hero.watchStories")}
          </button>
          <button
            onClick={onDownloadBrochure}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-extrabold text-white bg-white/10 hover:bg-white/20 border border-white/20 shadow-sm hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 backdrop-blur-sm"
          >
            <Download className="w-4 h-4" />
            {t("media.hero.downloadBrochure")}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MediaHero;
