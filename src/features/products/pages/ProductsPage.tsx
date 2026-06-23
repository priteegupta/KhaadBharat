import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Leaf, Info, Droplet, Clock, Check, X, ShieldAlert, Cpu } from "lucide-react";
import SEO from "../../../components/common/SEO";

// Import custom reusable components
import ProductHero from "../../../components/product/ProductHero";
import BenefitCard from "../../../components/product/BenefitCard";
import FeatureGrid from "../../../components/product/FeatureGrid";
import SoilComparison from "../../../components/product/SoilComparison";
import UsageStepCard from "../../../components/product/UsageStepCard";
import FAQAccordion from "../../../components/product/FAQAccordion";
import ProductGallery from "../../../components/product/ProductGallery";
import FarmerStoryCard from "../../../components/product/FarmerStoryCard";
import DistributorCTA from "../../../components/product/DistributorCTA";
import ProductCTA from "../../../components/product/ProductCTA";
import ProductFooter from "../../../components/product/ProductFooter";

// Framer motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as any;

interface BenefitItem {
  title: string;
  description: string;
  icon: string;
}

interface FeatureItem {
  title: string;
  desc: string;
}

interface UsageStep {
  title: string;
  desc: string;
}

interface ComparisonRow {
  area: string;
  traditional: string;
  biochar: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface GalleryItem {
  title: string;
  category: string;
  desc: string;
}

interface FarmerStory {
  name: string;
  location: string;
  crop: string;
  result: string;
  waterSavings: string;
  soilImprovement: string;
}

export const ProductsPage: React.FC = () => {
  const { t } = useTranslation("product");

  // Load translations as lists/objects
  const overviewPoints = t("overview.points", { returnObjects: true }) as string[];
  const benefitsItems = t("benefits.items", { returnObjects: true }) as BenefitItem[];
  const featureItems = t("features.items", { returnObjects: true }) as FeatureItem[];
  const usageSteps = t("usageGuide.steps", { returnObjects: true }) as UsageStep[];
  const comparisonRows = t("comparison.rows", { returnObjects: true }) as ComparisonRow[];
  const faqItems = t("faq.items", { returnObjects: true }) as FAQItem[];
  const galleryItems = t("gallery.items", { returnObjects: true }) as GalleryItem[];
  const farmerStories = t("farmerImpact.stories", { returnObjects: true }) as FarmerStory[];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
    >
      <SEO
        title={t("hero.title")}
        description={t("hero.description")}
      />

      {/* 1. Hero Section */}
      <ProductHero />

      {/* 2. Product Overview Section */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8">
        <div className="lg:col-span-7 text-left">
          <h2 className="text-3xl font-black text-brand-green-deep mb-6">
            {t("overview.title")}
          </h2>
          <p className="text-sm font-semibold text-brand-text-muted leading-relaxed mb-8">
            {t("overview.intro")}
          </p>

          <div className="flex flex-col gap-4">
            {overviewPoints && overviewPoints.map((point, index) => {
              // Split key points at colon for styling prefix
              const parts = point.split(":");
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green flex-shrink-0 mt-0.5">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                    {parts.length > 1 ? (
                      <>
                        <strong className="text-brand-green-deep">{parts[0]}:</strong>
                        {parts.slice(1).join(":")}
                      </>
                    ) : (
                      point
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overview Illustration Card */}
        <div className="lg:col-span-5 w-full bg-white border border-brand-green/10 rounded-3xl p-8 shadow-premium text-left">
          <span className="text-[10px] font-black text-brand-brown-warm uppercase tracking-widest block mb-4">
            {t("overviewLifecycle.lifecycleTitle")}
          </span>
          <div className="flex flex-col gap-6 relative pl-6 border-l-2 border-brand-green/20">
            <div className="relative">
              <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-brand-green border-4 border-white shadow" />
              <h4 className="text-xs font-black text-brand-green-deep">{t("overviewLifecycle.biomassTitle")}</h4>
              <p className="text-[10px] font-semibold text-brand-text-muted">{t("overviewLifecycle.biomassDesc")}</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-brand-brown border-4 border-white shadow" />
              <h4 className="text-xs font-black text-brand-green-deep">{t("overviewLifecycle.processTitle")}</h4>
              <p className="text-[10px] font-semibold text-brand-text-muted">{t("overviewLifecycle.processDesc")}</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-brand-green-deep border-4 border-white shadow" />
              <h4 className="text-xs font-black text-brand-green-deep">{t("overviewLifecycle.matrixTitle")}</h4>
              <p className="text-[10px] font-semibold text-brand-text-muted">{t("overviewLifecycle.matrixDesc")}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Product Benefits Section */}
      <section id="benefits-section" className="py-8 border-t border-brand-green/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-brand-green-deep mb-3">
            {t("benefits.title")}
          </h2>
          <p className="text-sm font-bold text-brand-brown-warm uppercase tracking-wider">
            {t("benefits.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitsItems && benefitsItems.map((item, index) => (
            <BenefitCard
              key={index}
              title={item.title}
              description={item.description}
              iconName={item.icon}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* 4. Biochar Explanation Section */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8 border-t border-brand-green/10">
        <div className="lg:col-span-5 order-2 lg:order-1 w-full bg-white border border-brand-green/10 rounded-3xl p-8 shadow-premium relative overflow-hidden flex flex-col justify-center min-h-[300px]">
          {/* Animated root diagram mockup */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green-light/20 to-transparent -z-10" />
          <span className="text-[10px] font-black text-brand-brown-warm uppercase tracking-widest block mb-4 text-left">
            {t("undergroundVisual.soilPoresTitle")}
          </span>
          
          <div className="flex flex-col gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500">
                <Droplet className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold text-brand-text-muted">
                <strong>{t("undergroundVisual.porousSpongeTitle")}:</strong> {t("undergroundVisual.porousSpongeDesc")}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-green-light border border-brand-green/10 flex items-center justify-center text-brand-green">
                <Leaf className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold text-brand-text-muted">
                <strong>{t("undergroundVisual.nutrientCageTitle")}:</strong> {t("undergroundVisual.nutrientCageDesc")}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-brown-soft/20 border border-brand-brown-soft/40 flex items-center justify-center text-brand-brown">
                <Cpu className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold text-brand-text-muted">
                <strong>{t("undergroundVisual.microbialSafehouseTitle")}:</strong> {t("undergroundVisual.microbialSafehouseDesc")}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 text-left">
          <h2 className="text-3xl font-black text-brand-green-deep mb-6">
            {t("biocharExplanation.title")}
          </h2>
          <p className="text-sm font-bold text-brand-brown-warm uppercase tracking-wider mb-4">
            {t("biocharExplanation.subtitle")}
          </p>
          <p className="text-sm font-semibold text-brand-text-muted leading-relaxed">
            {t("biocharExplanation.text")}
          </p>
        </div>
      </motion.section>

      {/* 5. Product Features Grid */}
      {featureItems && (
        <FeatureGrid
          title={t("features.title")}
          subtitle={t("features.subtitle")}
          items={featureItems}
        />
      )}

      {/* 6. Water Saving Section */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8 border-t border-brand-green/10">
        <div className="lg:col-span-7 text-left">
          <h2 className="text-3xl font-black text-brand-green-deep mb-6">
            {t("waterSaving.title")}
          </h2>
          <p className="text-sm font-bold text-brand-brown-warm uppercase tracking-wider mb-4">
            {t("waterSaving.subtitle")}
          </p>
          <p className="text-sm font-semibold text-brand-text-muted leading-relaxed mb-6">
            {t("waterSaving.desc1")}
          </p>
          <p className="text-sm font-semibold text-brand-text-muted leading-relaxed">
            {t("waterSaving.desc2")}
          </p>
        </div>

        {/* Visual watering comparison */}
        <div className="lg:col-span-5 w-full bg-white border border-brand-green/10 rounded-3xl p-8 shadow-premium text-left">
          <span className="text-[10px] font-black text-brand-brown-warm uppercase tracking-widest block mb-6">
            {t("waterSaving.comparisonLabel")}
          </span>

          <div className="flex flex-col gap-6">
            <div>
              <div className="flex justify-between text-[10px] font-black text-brand-green-deep uppercase tracking-wider mb-2">
                <span>{t("waterSavingComparison.traditionalSoilLabel")}</span>
                <span className="text-red-500">{t("waterSavingComparison.traditionalSoilDesc")}</span>
              </div>
              <div className="w-full h-3 rounded-full bg-red-100 overflow-hidden">
                <div className="w-1/3 h-full bg-red-500" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-black text-brand-green-deep uppercase tracking-wider mb-2">
                <span>{t("waterSavingComparison.khaadSoilLabel")}</span>
                <span className="text-brand-green">{t("waterSavingComparison.khaadSoilDesc")}</span>
              </div>
              <div className="w-full h-3 rounded-full bg-brand-green-light overflow-hidden">
                <div className="w-5/6 h-full bg-brand-green" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 7. Soil Health Section */}
      <SoilComparison
        title={t("soilHealth.title")}
        subtitle={t("soilHealth.subtitle")}
        text={t("soilHealth.text")}
        weakTitle={t("soilHealth.weakSoilTitle")}
        weakPoints={t("soilHealth.weakSoilDetails", { returnObjects: true }) as string[]}
        improvedTitle={t("soilHealth.improvedSoilTitle")}
        improvedPoints={t("soilHealth.improvedSoilDetails", { returnObjects: true }) as string[]}
        spongeTitle={t("soilHealth.spongeEffectTitle")}
        spongeDesc={t("soilHealth.spongeEffectDesc")}
      />

      {/* 8. Usage Guide Section */}
      <section className="py-8 border-t border-brand-green/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-brand-green-deep mb-3">
            {t("usageGuide.title")}
          </h2>
          <p className="text-sm font-bold text-brand-brown-warm uppercase tracking-wider">
            {t("usageGuide.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {usageSteps && usageSteps.map((step, index) => (
            <UsageStepCard
              key={index}
              stepNumber={index + 1}
              title={step.title}
              desc={step.desc}
            />
          ))}
        </div>
      </section>

      {/* 9. Product Application Steps / Timeline */}
      <motion.section variants={itemVariants} className="py-8 border-t border-brand-green/10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <h2 className="text-3xl font-black text-brand-green-deep mb-6">
              {t("applicationSteps.title")}
            </h2>
            <p className="text-sm font-bold text-brand-brown-warm uppercase tracking-wider mb-6">
              {t("applicationSteps.subtitle")}
            </p>
            
            <div className="p-6 rounded-3xl bg-white border border-brand-green/10 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-green-light border border-brand-green/20 flex items-center justify-center text-brand-green flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-brand-green-deep mb-1">
                  {t("applicationSteps.dosageTitle")}
                </h4>
                <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                  {t("applicationSteps.dosageText")}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-brand-green-deep to-brand-green text-white p-8 rounded-3xl shadow-premium relative overflow-hidden">
            {/* Background vector circles */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-lg font-black tracking-wide mb-2">
                  {t("applicationSteps.cropAITitle")}
                </h4>
                <p className="text-xs text-brand-green-light leading-relaxed font-bold mb-4">
                  {t("applicationSteps.cropAIText")}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-wider">
                  Development Phase
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 10. Product Comparison Section */}
      <section className="py-8 border-t border-brand-green/10 overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-brand-green-deep mb-6">
            {t("comparison.title")}
          </h2>
        </div>

        <div className="overflow-x-auto w-full rounded-3xl border border-brand-green/10 shadow-sm bg-white">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-brand-green-light/40 border-b border-brand-green/10">
                <th className="p-5 text-xs font-black text-brand-green-deep uppercase tracking-wider w-1/3">
                  {t("comparison.headers.0")}
                </th>
                <th className="p-5 text-xs font-black text-brand-green-deep uppercase tracking-wider w-1/3">
                  {t("comparison.headers.1")}
                </th>
                <th className="p-5 text-xs font-black text-brand-green-deep uppercase tracking-wider w-1/3">
                  {t("comparison.headers.2")}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows && comparisonRows.map((row, index) => (
                <tr key={index} className="border-b border-brand-green/5 last:border-b-0 hover:bg-brand-green-light/10 transition-colors">
                  <td className="p-5 text-xs font-black text-brand-green-deep">
                    {row.area}
                  </td>
                  <td className="p-5 text-xs font-semibold text-red-600 flex items-start gap-1.5">
                    <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{row.traditional}</span>
                  </td>
                  <td className="p-5 text-xs font-black text-brand-green-deep">
                    <div className="flex items-start gap-1.5">
                      <Check className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{row.biochar}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 11. FAQ Section */}
      <section className="py-8 border-t border-brand-green/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-brand-green-deep mb-3">
            {t("faq.title")}
          </h2>
          <p className="text-sm font-bold text-brand-brown-warm uppercase tracking-wider">
            {t("faq.subtitle")}
          </p>
        </div>

        {faqItems && <FAQAccordion items={faqItems} />}
      </section>

      {/* 12. Product Gallery Section */}
      {galleryItems && (
        <ProductGallery
          title={t("gallery.title")}
          subtitle={t("gallery.subtitle")}
          items={galleryItems}
        />
      )}

      {/* 13. Farmer Impact Section */}
      <section className="py-8 border-t border-brand-green/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-brand-green-deep mb-3">
            {t("farmerImpact.title")}
          </h2>
          <p className="text-sm font-bold text-brand-brown-warm uppercase tracking-wider">
            {t("farmerImpact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmerStories && farmerStories.map((story, index) => (
            <FarmerStoryCard
              key={index}
              story={story}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* 14. Distributor Section */}
      <DistributorCTA
        title={t("distributor.title")}
        subtitle={t("distributor.subtitle")}
        ctaTitle={t("distributor.ctaTitle")}
        ctaText={t("distributor.ctaText")}
        buttonText={t("distributor.buttonText")}
      />

      {/* 15. CTA Section */}
      <ProductCTA
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        btnConnect={t("cta.btnConnect")}
        btnPartner={t("cta.btnPartner")}
        btnDownload={t("cta.btnDownload")}
      />

      {/* 16. Product Footer Disclaimer */}
      <ProductFooter />

    </motion.div>
  );
};

export default ProductsPage;
