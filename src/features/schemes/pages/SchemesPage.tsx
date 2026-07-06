import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Edit3, Award, Milestone } from "lucide-react";
import SEO from "../../../components/common/SEO";
import SectionHeader from "../../../components/ui/SectionHeader";
import useSchemes from "../hooks/useSchemes";
import { getSubsidyCardsByLanguage } from "../../../data/schemes";

// Import reusable components
import SchemeHero from "../../../components/schemes/SchemeHero";
import FilterBar from "../../../components/schemes/FilterBar";
import SchemeCard from "../../../components/schemes/SchemeCard";
import EligibilitySteps from "../../../components/schemes/EligibilitySteps";
import FAQAccordion from "../../../components/schemes/FAQAccordion";
import SubsidyCard from "../../../components/schemes/SubsidyCard";
import FarmerHelpCard from "../../../components/schemes/FarmerHelpCard";
import SchemesCTA from "../../../components/schemes/SchemesCTA";

// Page animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as any;

export const SchemesPage: React.FC = () => {
  const { t, i18n } = useTranslation("schemes");
  const { data: schemes = [], isLoading } = useSchemes();

  // Scroll targets
  const exploreRef = useRef<HTMLDivElement>(null);
  const eligibilityRef = useRef<HTMLDivElement>(null);

  const scrollToList = () => {
    exploreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToEligibility = () => {
    eligibilityRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedFarmerType, setSelectedFarmerType] = useState("");
  const [selectedSubsidyType, setSelectedSubsidyType] = useState("");
  const [selectedBenefitType, setSelectedBenefitType] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedState("");
    setSelectedFarmerType("");
    setSelectedSubsidyType("");
    setSelectedBenefitType("");
  };

  // Dynamic filter lists from translations
  const statesList = [
    { key: "all", value: t("states.all") },
    { key: "delhi", value: t("states.delhi") },
    { key: "punjab", value: t("states.punjab") },
    { key: "uttar pradesh", value: t("states.uttar pradesh") },
    { key: "bihar", value: t("states.bihar") },
    { key: "maharashtra", value: t("states.maharashtra") },
    { key: "madhya pradesh", value: t("states.madhya pradesh") },
  ];

  const categoriesList = [
    { key: "central-government", value: t("categories.central-government") },
    { key: "state-government", value: t("categories.state-government") },
    { key: "irrigation-water", value: t("categories.irrigation-water") },
    { key: "organic-farming", value: t("categories.organic-farming") },
    { key: "soil-health", value: t("categories.soil-health") },
    { key: "equipment-machinery", value: t("categories.equipment-machinery") },
    { key: "solar-energy", value: t("categories.solar-energy") },
    { key: "crop-insurance", value: t("categories.crop-insurance") },
    { key: "women-farmer", value: t("categories.women-farmer") },
    { key: "young-farmer", value: t("categories.young-farmer") },
  ];

  const farmerTypesList = [
    { key: "small", value: t("farmerTypes.small") },
    { key: "marginal", value: t("farmerTypes.marginal") },
    { key: "women", value: t("farmerTypes.women") },
    { key: "organic", value: t("farmerTypes.organic") },
    { key: "all", value: t("farmerTypes.all") },
    { key: "fpo", value: t("farmerTypes.fpo") },
    { key: "entrepreneur", value: t("farmerTypes.entrepreneur") },
  ];

  const benefitTypesList = [
    { key: "cash", value: t("benefitTypes.cash") },
    { key: "input", value: t("benefitTypes.input") },
    { key: "insurance", value: t("benefitTypes.insurance") },
    { key: "loan", value: t("benefitTypes.loan") },
    { key: "equipment", value: t("benefitTypes.equipment") },
    { key: "solar", value: t("benefitTypes.solar") },
    { key: "training", value: t("benefitTypes.training") },
    { key: "services", value: t("benefitTypes.services") },
    { key: "grant", value: t("benefitTypes.grant") },
  ];

  const subsidyTypesList = [
    { key: "dbt", value: t("subsidyTypes.dbt") },
    { key: "subsidy", value: t("subsidyTypes.subsidy") },
    { key: "free", value: t("subsidyTypes.free") },
  ];

  // Dynamic filtered schemes
  const filteredSchemes = schemes.filter((scheme) => {
    // 1. Search Query filter (matches title, category, eligibility points, and benefits)
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      scheme.title.toLowerCase().includes(query) ||
      scheme.description.toLowerCase().includes(query) ||
      scheme.category.toLowerCase().includes(query) ||
      scheme.benefits.toLowerCase().includes(query) ||
      scheme.eligibility.some((item) => item.toLowerCase().includes(query)) ||
      scheme.officialSource.toLowerCase().includes(query);

    // 2. Status filter: Expired & Under Review are excluded by default
    const matchesStatus = showArchived
      ? true
      : scheme.status !== "expired" && scheme.status !== "review";

    // 3. Dropdown Filters
    const matchesCategory = selectedCategory ? scheme.category === selectedCategory : true;
    const matchesState = selectedState ? scheme.state === selectedState : true;
    const farmerTypes = scheme.farmerTypes || [];
    const matchesFarmerType = selectedFarmerType
      ? farmerTypes.includes(selectedFarmerType) || farmerTypes.includes("all")
      : true;
    const matchesSubsidyType = selectedSubsidyType ? scheme.subsidyType === selectedSubsidyType : true;
    const matchesBenefitType = selectedBenefitType ? scheme.benefitType === selectedBenefitType : true;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesState &&
      matchesFarmerType &&
      matchesSubsidyType &&
      matchesBenefitType
    );
  });

  // Dynamically discover active categories in filtered list
  const activeCategories = categoriesList.filter((cat) => {
    return filteredSchemes.some((scheme) => scheme.category === cat.key);
  });

  // FAQ list
  const faqs = t("faqs", { returnObjects: true, defaultValue: [] }) as {
    question: string;
    answer: string;
  }[];

  // Subsidy highlight cards list
  const subsidyCards = getSubsidyCardsByLanguage(i18n.language);

  // Application process timeline steps
  const processSteps = t("processSteps", { returnObjects: true, defaultValue: [] }) as {
    title: string;
    description: string;
  }[];

  return (
    <motion.div
      className="flex flex-col gap-16 md:gap-24 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SEO title={t("title")} description={t("description")} />

      {/* 1. HERO SECTION */}
      <motion.section variants={itemVariants} className="w-full">
        <SchemeHero onExploreClick={scrollToList} onEligibilityClick={scrollToEligibility} />
      </motion.section>

      {/* 2. SEARCH, FILTER & TOGGLE ENGINE */}
      <motion.section ref={exploreRef} variants={itemVariants} className="w-full scroll-mt-24">
        <SectionHeader
          eyebrow={t("discoveryEngine")}
          title={t("searchTitle")}
          description={t("searchDesc")}
        />

        <div className="flex flex-col gap-6 mt-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between w-full">
            {/* Filter controls */}
            <div className="flex-grow">
              <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                selectedFarmerType={selectedFarmerType}
                setSelectedFarmerType={setSelectedFarmerType}
                selectedSubsidyType={selectedSubsidyType}
                setSelectedSubsidyType={setSelectedSubsidyType}
                selectedBenefitType={selectedBenefitType}
                setSelectedBenefitType={setSelectedBenefitType}
                categories={categoriesList}
                states={statesList}
                farmerTypes={farmerTypesList}
                subsidyTypes={subsidyTypesList}
                benefitTypes={benefitTypesList}
                onReset={handleResetFilters}
              />
            </div>

            {/* Premium Archive Toggle */}
            <div className="flex items-center gap-3 self-start lg:self-end bg-white px-5 py-3 rounded-full border border-brand-green/10 shadow-sm cursor-pointer hover:border-brand-green/20 transition-all select-none h-[46px] shrink-0">
              <input
                type="checkbox"
                id="showArchived"
                checked={showArchived}
                onChange={(e) => setShowArchived(e.target.checked)}
                className="sr-only peer"
              />
              <div
                onClick={() => setShowArchived(!showArchived)}
                className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-green after:transition-transform"
                style={{
                  backgroundColor: showArchived ? "#2c5234" : "#e5e7eb",
                }}
              >
                <div
                  className="w-4 h-4 bg-white rounded-full transition-transform"
                  style={{
                    transform: showArchived ? "translateX(16px)" : "translateX(2px)",
                    marginTop: "2px",
                  }}
                />
              </div>
              <label htmlFor="showArchived" className="text-xs font-black text-brand-green-deep cursor-pointer select-none">
                {t("showArchived")}
              </label>
            </div>
          </div>

          {/* Dynamic Grid Results */}
          <div className="mt-4">
            {isLoading ? (
              /* Pulse skeleton cards */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-64 bg-brand-beige-cream border border-brand-green/5 rounded-3xl" />
                ))}
              </div>
            ) : filteredSchemes.length > 0 ? (
              <div className="flex flex-col gap-16">
                {activeCategories.map((category) => {
                  const categorySchemes = filteredSchemes.filter(
                    (s) => s.category === category.key
                  );
                  return (
                    <div key={category.key} className="flex flex-col gap-6">
                      <div className="border-b border-brand-green/10 pb-2">
                        <h3 className="text-lg font-black text-brand-green-deep flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-brand-green-deep" />
                          {category.value}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {categorySchemes.map((scheme) => (
                          <SchemeCard key={scheme.id} scheme={scheme} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 p-8 rounded-3xl bg-white border border-brand-green/10 shadow-sm flex flex-col gap-2 max-w-md mx-auto">
                <span className="text-sm font-black text-brand-green-deep">{t("noSchemesFound")}</span>
                <p className="text-xs text-brand-text-muted font-bold">
                  {t("noSchemesDesc")}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-5 py-2.5 rounded-full bg-brand-green text-white text-xs font-bold hover:bg-brand-green-deep transition-colors"
                >
                  {t("filters.reset")}
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 3. FARMER SUBSIDY SECTION */}
      {subsidyCards.length > 0 && (
        <motion.section variants={itemVariants} className="w-full">
          <SectionHeader
            eyebrow={t("inputIncentives")}
            title={t("sections.subsidyHighlight.title")}
            description={t("sections.subsidyHighlight.subtitle")}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {subsidyCards.map((card, idx) => (
              <SubsidyCard key={idx} card={card} />
            ))}
          </div>
        </motion.section>
      )}

      {/* 4. ELIGIBILITY GUIDE SECTION */}
      <motion.section ref={eligibilityRef} variants={itemVariants} className="w-full scroll-mt-24">
        <SectionHeader
          eyebrow={t("requirements")}
          title={t("sections.eligibility.title")}
          description={t("sections.eligibility.subtitle")}
          centered
        />
        <div className="mt-8">
          <EligibilitySteps />
        </div>
      </motion.section>

      {/* 5. APPLICATION PROCESS SECTION */}
      {processSteps.length > 0 && (
        <motion.section variants={itemVariants} className="w-full">
          <SectionHeader
            eyebrow={t("stepFlow")}
            title={t("sections.process.title")}
            description={t("sections.process.subtitle")}
            centered
          />
          {/* Timeline Infographic Grid */}
          <div className="relative mt-12 flex flex-col gap-8 lg:gap-0 lg:flex-row items-stretch justify-between w-full max-w-5xl mx-auto">
            {/* Connection Line on Desktop */}
            <div className="hidden lg:block absolute top-7 left-10 right-10 h-0.5 bg-gradient-to-r from-brand-green via-brand-accent-sunlight to-brand-green/30 pointer-events-none z-0" />

            {processSteps.map((step, idx) => {
              const getStepIcon = (i: number) => {
                switch (i) {
                  case 0: return <ShieldCheck className="w-5 h-5 text-white" />;
                  case 1: return <FileText className="w-5 h-5 text-white" />;
                  case 2: return <Edit3 className="w-5 h-5 text-white" />;
                  case 3: return <Award className="w-5 h-5 text-white" />;
                  default: return <Milestone className="w-5 h-5 text-white" />;
                }
              };

              return (
                <div
                  key={idx}
                  className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-6 flex-1 text-left lg:text-center z-10 relative group"
                >
                  {/* Step Circle */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-green-deep border-4 border-white text-brand-beige-cream shadow-md shrink-0 transition-transform duration-300 group-hover:scale-110 relative">
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-accent-sunlight border border-white text-[9px] font-black text-brand-green-deep rounded-full flex items-center justify-center">
                      {idx + 1}
                    </span>
                    {getStepIcon(idx)}
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-black text-brand-green-deep leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-brand-text-muted leading-relaxed font-bold max-w-xs">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* 6. FAQ SECTION */}
      {faqs.length > 0 && (
        <motion.section variants={itemVariants} className="w-full">
          <SectionHeader
            eyebrow={t("assistance")}
            title={t("sections.faq.title")}
            description={t("sections.faq.subtitle")}
            centered
          />
          <div className="mt-8">
            <FAQAccordion items={faqs} />
          </div>
        </motion.section>
      )}

      {/* 7. FARMER HELP SECTION */}
      <motion.section variants={itemVariants} className="w-full">
        <SectionHeader
          eyebrow={t("helpDeskLabel")}
          title={t("sections.help.title")}
          description={t("sections.help.subtitle")}
        />
        <div className="mt-6">
          <FarmerHelpCard />
        </div>
      </motion.section>

      {/* 8. FOOTER CTA SECTION */}
      <motion.section variants={itemVariants} className="w-full">
        <SchemesCTA />
      </motion.section>
    </motion.div>
  );
};

export default SchemesPage;
