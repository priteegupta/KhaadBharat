import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen, Sprout, Droplets, Sun, Volume2, VolumeX } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMuted, setIsMuted] = React.useState(true);

  const brandFocus = t("brand.focus", { returnObjects: true }) as string[];
  const isHi = i18n.language === "hi";

  // Framer Motion variants
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const textItemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const visualItemVariants: any = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.section
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-3xl p-6 sm:p-10 md:p-12 lg:p-16 border border-brand-green/10 shadow-premium min-h-[550px] lg:min-h-[600px] flex items-center bg-brand-green-deep/90"
    >
      {/* Background Video */}
      <video
        src="/images/Website video.mp4"
        autoPlay
        loop
        muted={!isHi || isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Responsive dark overlay: darker on left/top to support text contrast, lighter/transparent elsewhere to show video clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/15 lg:bg-gradient-to-r lg:from-black/60 lg:via-black/20 lg:to-transparent z-10" />

      {/* Floating background icons - updated for dark background */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 left-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent-sunlight/70 pointer-events-none z-20 hidden sm:flex"
      >
        <Sprout className="w-6 h-6" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -10, 10, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute top-1/3 right-1/4 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-300/60 pointer-events-none z-20 hidden lg:flex"
      >
        <Droplets className="w-7 h-7" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-12 left-1/3 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent-sunlight/70 pointer-events-none z-20 hidden md:flex"
      >
        <Sun className="w-5 h-5" />
      </motion.div>

      {/* Audio Control Toggle */}
      {isHi && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
          className="absolute top-6 right-6 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/20 hover:scale-105 active:scale-95 transition-all shadow-lg backdrop-blur-md cursor-pointer"
          title={isMuted ? "ध्वनि चालू करें" : "ध्वनि बंद करें"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      )}

      {/* Content wrapper */}
      <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left side text content */}
        <motion.div
          className="lg:col-span-8 flex flex-col gap-6"
          variants={textItemVariants}
        >
          <div className="flex flex-col gap-2">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black text-brand-accent-sunlight bg-brand-accent-sunlight/15 border border-brand-accent-sunlight/30 w-fit uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3 h-3 fill-current" />
              {t("brand.heroProduct", "KHAAD BHARAT BIOCHAR")}
            </div>
            <span className="text-xs font-black text-white/85 tracking-wider uppercase pl-1 drop-shadow-sm">
              {t("pages.home.brandLine", "Powered by JSL Enterprises")}
            </span>
          </div>

          {/* Main Headline & Supporting Tagline */}
          <div className="flex flex-col gap-2.5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              {t("pages.home.hero")}
            </h1>
            <p className="text-base sm:text-lg font-bold text-brand-accent-sunlight tracking-widest uppercase pl-1 drop-shadow-sm">
              {t("pages.home.heroQuote")}
            </p>
          </div>

          {/* Description */}
          <p className="text-white/95 leading-relaxed font-semibold max-w-xl text-sm sm:text-base drop-shadow-sm">
            {t("pages.home.summary")}
          </p>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold text-brand-green-deep bg-brand-accent-sunlight hover:bg-brand-accent-sunlight/90 shadow-lg hover:shadow-brand-accent-sunlight/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              {t("ui.exploreProduct")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/media"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 shadow-sm hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm"
            >
              <BookOpen className="w-4 h-4 text-brand-accent-sunlight" />
              {t("ui.openMedia")}
            </Link>
          </div>

          {/* Success Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 border-t border-white/15 pt-6">
            <div className="flex items-center gap-2.5 sm:flex-col sm:items-start sm:gap-0">
              <span className="text-2xl sm:text-3xl font-black text-brand-accent-sunlight">
                50,000+
              </span>
              <span className="text-[10px] sm:text-xs font-black text-white/70 uppercase tracking-wider">
                {isHi ? "कृषक भरोसा" : "Farmers Trust"}
              </span>
            </div>
            <div className="flex items-center gap-2.5 sm:flex-col sm:items-start sm:gap-0 border-t sm:border-t-0 sm:border-l border-white/15 pt-2.5 sm:pt-0 sm:pl-4">
              <span className="text-2xl sm:text-3xl font-black text-brand-accent-sunlight">
                30%+
              </span>
              <span className="text-[10px] sm:text-xs font-black text-white/70 uppercase tracking-wider">
                {isHi ? "जल की बचत" : "Water Saved"}
              </span>
            </div>
            <div className="flex items-center gap-2.5 sm:flex-col sm:items-start sm:gap-0 border-t sm:border-t-0 sm:border-l border-white/15 pt-2.5 sm:pt-0 sm:pl-4">
              <span className="text-2xl sm:text-3xl font-black text-brand-accent-sunlight">
                45%+
              </span>
              <span className="text-[10px] sm:text-xs font-black text-white/70 uppercase tracking-wider">
                {isHi ? "उपज में वृद्धि" : "Yield Increase"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
