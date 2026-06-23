import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Droplets, ShieldCheck, Leaf, Sparkles, TrendingDown, Star, Milestone } from "lucide-react";
import SEO from "../../../components/common/SEO";
import HeroSection from "../../../components/ui/HeroSection";
import TrustStrip from "../../../components/ui/TrustStrip";
import SectionHeader from "../../../components/ui/SectionHeader";
import FeatureCard from "../../../components/ui/FeatureCard";
import BenefitCard from "../../../components/ui/BenefitCard";

// Stagger entry configurations
const sectionContainerVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  // Load arrays from translations
  const biocharPoints = t("pages.home.biocharPoints", { returnObjects: true, defaultValue: [] }) as string[];
  const demandPoints = t("pages.home.demandPoints", { returnObjects: true, defaultValue: [] }) as string[];
  const benefitPoints = t("pages.home.benefitPoints", { returnObjects: true, defaultValue: [] }) as Array<{ title: string; body: string }>;
  const irrigationPoints = t("pages.home.irrigationPoints", { returnObjects: true, defaultValue: [] }) as string[];
  const promisePoints = t("pages.home.promisePoints", { returnObjects: true, defaultValue: [] }) as string[];
  const brandPillars = t("pages.home.cards", { returnObjects: true, defaultValue: [] }) as Array<{ title: string; body: string }>;
  const ecosystemPoints = t("pages.home.rollout", { returnObjects: true, defaultValue: [] }) as Array<{ title: string; body: string }>;

  return (
    <div className="flex flex-col gap-16 md:gap-24 overflow-x-hidden">
      <SEO title={t("pages.home.eyebrow")} />

      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 2. Horizontal Trust Strip */}
      <TrustStrip />

      {/* 3. What is Biochar Educational Section */}
      <motion.section
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="flex flex-col gap-6">
          <SectionHeader
            eyebrow={t("pages.home.biocharTitle")}
            title={t("pages.home.biocharTitle")}
            description={t("pages.home.biocharSummary")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {biocharPoints.map((point, index) => (
              <FeatureCard key={index} title={point} index={index} />
            ))}
          </div>
        </div>
        <div className="relative rounded-3xl bg-white p-6 border border-brand-green/10 shadow-premium overflow-hidden group">
          <img
            className="w-full h-auto max-h-[350px] object-contain rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
            src="/images/field-hero.svg"
            alt="Biochar soil integration demo"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-green-deep/10 to-transparent pointer-events-none" />
        </div>
      </motion.section>

      {/* 4. Why Demand is Growing Infographic Layout */}
      <motion.section
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-10"
      >
        <SectionHeader
          eyebrow={t("pages.home.demandTitle")}
          title={t("pages.home.demandTitle")}
          description={t("pages.home.demandSummary")}
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demandPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              className="p-6 rounded-2xl bg-gradient-to-b from-brand-beige-cream to-white border border-brand-green/10 hover:border-brand-green/30 hover:shadow-md transition-all duration-300 flex flex-col gap-4 text-center items-center"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-green/10 text-brand-green font-black">
                {index + 1}
              </div>
              <h3 className="text-base font-extrabold text-brand-green-deep leading-snug">
                {point}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 5. What do Farmers Gain benefits section */}
      <motion.section
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-10"
      >
        <SectionHeader
          eyebrow={t("pages.home.benefitTitle")}
          title={t("pages.home.benefitTitle")}
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitPoints.map((item, index) => (
            <BenefitCard key={index} title={item.title} description={item.body} />
          ))}
        </div>
      </motion.section>

      {/* 6. Irrigation Cost Reductions */}
      <motion.section
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        <div className="lg:col-span-7 flex flex-col gap-6">
          <SectionHeader
            eyebrow={t("pages.home.irrigationTitle")}
            title={t("pages.home.irrigationTitle")}
            description={t("pages.home.irrigationSummary")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {irrigationPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-brand-green/5 shadow-sm hover:border-brand-green/25 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-accent-sunlight/15 text-brand-brown-warm flex items-center justify-center">
                  <Droplets className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-brand-green-deep">{point}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 relative rounded-3xl bg-brand-beige-panel p-6 border border-brand-green/10 shadow-premium overflow-hidden group">
          <img
            className="w-full h-auto max-h-[300px] object-contain rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
            src="/images/hero-village.svg"
            alt="Irrigation savings demo"
          />
        </div>
      </motion.section>

      {/* 7. Promise Section */}
      <motion.section
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="rounded-3xl bg-brand-green-deep text-white p-8 md:p-12 shadow-premium relative overflow-hidden"
      >
        {/* Background ambient light */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-brown-warm/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto gap-8">
          <div className="flex flex-col gap-2">
            <span className="inline-block px-3 py-1 text-xs font-black tracking-widest text-brand-accent-sunlight uppercase bg-white/10 rounded-full w-fit mx-auto">
              {t("pages.home.promiseTitle")}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {t("pages.home.closingLine", "Smarter farming starts with BIO CHAR.")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
            {promisePoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/15"
              >
                <ShieldCheck className="w-5 h-5 text-brand-accent-sunlight flex-shrink-0" />
                <span className="text-sm font-extrabold">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 8. Brand Pillars Section */}
      <motion.section
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-10"
      >
        <SectionHeader
          eyebrow={t("ui.section.brandPillars")}
          title={t("ui.section.brandPillars")}
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brandPillars.map((pillar, index) => {
            const icons = [
              <Droplets className="w-6 h-6 text-brand-green" key="drop" />,
              <TrendingDown className="w-6 h-6 text-brand-green" key="trend" />,
              <Star className="w-6 h-6 text-brand-green" key="star" />,
            ];
            return (
              <motion.article
                key={index}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-white/80 backdrop-blur border border-brand-green/10 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col gap-4"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-green-light">
                  {icons[index] || <Leaf className="w-6 h-6 text-brand-green" />}
                </div>
                <div>
                  <h3 className="text-lg font-black text-brand-green-deep mb-2">{pillar.title}</h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed font-semibold">
                    {pillar.body}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      {/* 9. Next Steps / Ecosystem Section */}
      <motion.section
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-10"
      >
        <SectionHeader
          eyebrow={t("ui.section.nextSteps")}
          title={t("ui.section.nextStepsTitle")}
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ecosystemPoints.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gradient-to-br from-brand-beige-cream/40 to-white border border-brand-green/10 shadow-sm flex flex-col gap-4 hover:border-brand-green/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-green/10 text-brand-green">
                <Milestone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-brand-green-deep mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-text-muted leading-relaxed font-semibold">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
