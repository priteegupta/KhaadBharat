import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";
import VideoPreviewCard from "./VideoPreviewCard";

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  const brandFocus = t("brand.focus", { returnObjects: true }) as string[];

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
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-8 md:py-12"
    >
      {/* Left side text content */}
      <motion.div className="lg:col-span-7 flex flex-col gap-6" variants={textItemVariants}>
        <div className="flex flex-col gap-2">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black text-brand-green bg-brand-green/10 border border-brand-green/20 w-fit uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3 h-3 fill-current" />
            {t("brand.heroProduct", "KHAAD BHARAT BIOCHAR")}
          </div>
          <span className="text-xs font-black text-brand-brown-warm tracking-wider uppercase pl-1">
            {t("pages.home.brandLine", "Powered by JSL Enterprises")}
          </span>
        </div>

        {/* Main Headline & Supporting Tagline */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-green-deep tracking-tight leading-none">
            {t("pages.home.hero")}
          </h1>
          <p className="text-xl sm:text-2xl font-black text-brand-brown-warm leading-tight italic pl-1 border-l-2 border-brand-brown-warm/30">
            “{t("pages.home.heroQuote")}”
          </p>
        </div>

        {/* Paragraphs */}
        <div className="flex flex-col gap-4 text-brand-text/90 leading-relaxed font-semibold max-w-2xl text-sm sm:text-base">
          <p>{t("pages.home.summary")}</p>
          <p className="text-brand-text-muted font-medium bg-brand-beige-deep/20 p-4 rounded-xl border-l-4 border-brand-green/30">
            {t("pages.home.intro")}
          </p>
          <p>{t("pages.home.supportText")}</p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center gap-4 mt-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold text-white bg-brand-green-deep hover:bg-brand-green shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            {t("ui.exploreProduct")}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/media"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-brand-text bg-white border border-brand-green/20 hover:border-brand-green/40 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300"
          >
            <BookOpen className="w-4 h-4 text-brand-green" />
            {t("ui.openMedia")}
          </Link>
        </div>
      </motion.div>

      {/* Right side visual elements */}
      <motion.div className="lg:col-span-5 flex flex-col gap-6" variants={visualItemVariants}>
        {/* Layered illustration frame with float animation */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative rounded-3xl bg-gradient-to-br from-brand-beige-deep/50 to-white/90 p-4 border border-brand-green/10 shadow-premium overflow-hidden min-h-[300px] flex items-center justify-center"
        >
          <img
            className="w-full h-full max-h-64 object-contain rounded-2xl"
            src="/images/hero-village.svg"
            alt="Indian fields and sustainable irrigation"
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-brand-green-deep/80 backdrop-blur-md border border-white/10">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">
              {t("brand.heroProduct")}
            </span>
            <span className="text-[10px] font-bold text-brand-accent-sunlight uppercase tracking-wider">
              {t("ui.footer.connectNote", "Farmer Trust")}
            </span>
          </div>
        </motion.div>

        {/* Video Preview Card */}
        <VideoPreviewCard
          title={t("ui.videoCard.title")}
          badge={t("ui.videoCard.badge")}
          note={t("ui.videoCard.note")}
        />

        {/* Brand Callout Info Card */}
        <div className="p-6 rounded-2xl bg-white border border-brand-green/10 shadow-sm flex flex-col gap-3">
          <p className="text-[10px] font-black text-brand-green tracking-widest uppercase">
            {t("pages.home.snapshotTitle", "Brand Snapshot")}
          </p>
          <h3 className="text-base font-extrabold text-brand-green-deep leading-none">
            {t("brand.heroProduct")}
          </h3>
          <p className="text-xs text-brand-text-muted leading-tight font-semibold">
            {t("ui.footer.title")}
          </p>
          {brandFocus && Array.isArray(brandFocus) && (
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 border-t border-brand-green/5 pt-4">
              {brandFocus.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-1.5 text-xs text-brand-text font-bold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
