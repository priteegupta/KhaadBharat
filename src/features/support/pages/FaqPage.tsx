import React, { useState, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../../../components/common/SEO";

// Import reusable FAQ components
import FAQHero from "../../../components/faq/FAQHero";
import FAQSearch from "../../../components/faq/FAQSearch";
import FAQCategoryTabs from "../../../components/faq/FAQCategoryTabs";
import FAQSection from "../../../components/faq/FAQSection";
import FAQAccordion from "../../../components/faq/FAQAccordion";
import SupportSection from "../../../components/faq/SupportSection";
import FAQCTA from "../../../components/faq/FAQCTA";

// Framer motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as any;

export const FaqPage: React.FC = () => {
  const { t } = useTranslation("faq");
  const navigate = useNavigate();

  // Scroll targets
  const browseRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);

  // State
  const [selectedCategory, setSelectedCategory] = useState("product");
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll to top on route mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, []);

  // Reset scroll to top of Browse section on FAQ category selection change
  useEffect(() => {
    if (window.scrollY > 200) {
      browseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedCategory]);

  const handleScrollToBrowse = () => {
    browseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScrollToSupport = () => {
    supportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Category definitions
  const categories = useMemo(
    () => ({
      product: t("categories.product"),
      biochar: t("categories.biochar"),
      benefits: t("categories.benefits"),
      weather: t("categories.weather"),
      schemes: t("categories.schemes"),
      distributors: t("categories.distributors"),
    }),
    [t]
  );

  // Flattened questions for all categories to search across
  const allFAQs = useMemo(() => {
    return Object.keys(categories).map((key) => {
      const items = (t(`sections.${key}.items`, {
        returnObjects: true,
        defaultValue: [],
      }) as Array<{ q: string; a: string }>) || [];
      return {
        categoryKey: key,
        categoryLabel: categories[key as keyof typeof categories],
        items,
      };
    });
  }, [categories, t]);

  // Match search query against all questions and answers
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const matches: Array<{ q: string; a: string; categoryKey: string; categoryLabel: string }> = [];

    allFAQs.forEach((cat) => {
      cat.items.forEach((item) => {
        if (
          item.q.toLowerCase().includes(query) ||
          item.a.toLowerCase().includes(query)
        ) {
          matches.push({
            ...item,
            categoryKey: cat.categoryKey,
            categoryLabel: cat.categoryLabel,
          });
        }
      });
    });
    return matches;
  }, [searchQuery, allFAQs]);

  // Support section card labels
  const supportCards = useMemo(
    () =>
      (t("support.cards", {
        returnObjects: true,
        defaultValue: [],
      }) as Array<{ title: string; description: string }>) || [],
    [t]
  );

  return (
    <motion.div
      className="flex flex-col gap-16 md:gap-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SEO title={t("hero.headline")} description={t("hero.subheadline")} />

      {/* 1. HERO SECTION */}
      <motion.section variants={itemVariants}>
        <FAQHero
          badge={t("hero.badge")}
          headline={t("hero.headline")}
          subheadline={t("hero.subheadline")}
          description={t("hero.description")}
          btnBrowse={t("hero.btnBrowse")}
          btnSupport={t("hero.btnSupport")}
          onBrowseClick={handleScrollToBrowse}
          onSupportClick={handleScrollToSupport}
        />
      </motion.section>

      {/* 2. FAQ SEARCH & BROWSE */}
      <motion.section
        ref={browseRef}
        variants={itemVariants}
        className="scroll-mt-20 flex flex-col gap-8"
      >
        <FAQSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={t("search.placeholder")}
          examplesLabel={t("search.examplesLabel")}
          examples={t("search.examples", { returnObjects: true, defaultValue: [] }) as string[]}
        />

        {/* Dynamic Display based on search query status */}
        <AnimatePresence mode="wait">
          {searchQuery.trim() ? (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="text-left border-b border-brand-green/10 pb-4 max-w-3xl mx-auto w-full">
                <h3 className="text-lg font-black text-brand-green-deep">
                  {t("search.searchResultsTitle", { defaultValue: "Search Results" })} ({searchResults.length})
                </h3>
              </div>

              {searchResults.length > 0 ? (
                <FAQAccordion items={searchResults} searchQuery={searchQuery} />
              ) : (
                <div className="text-center py-12 p-8 rounded-3xl bg-white border border-brand-green/10 shadow-sm flex flex-col gap-2 max-w-md mx-auto w-full">
                  <span className="text-sm font-black text-brand-green-deep">
                    {t("search.noResults", { query: searchQuery }).split(".")[0] || "No Results"}
                  </span>
                  <p className="text-xs text-brand-text-muted font-bold">
                    {t("search.noResults", { query: searchQuery }).split(".")[1] || "Try searching with other terms."}
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-4 px-5 py-2.5 rounded-full bg-brand-green text-white text-xs font-bold hover:bg-brand-green-deep transition-colors mx-auto"
                  >
                    {t("search.clearSearch", { defaultValue: "Clear Search" })}
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="categories-tabs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <FAQCategoryTabs
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
              />

              <div className="w-full">
                <FAQSection
                  categoryKey={selectedCategory}
                  title={t(`sections.${selectedCategory}.title`)}
                  subtitle={t(`sections.${selectedCategory}.subtitle`)}
                  items={t(`sections.${selectedCategory}.items`, {
                    returnObjects: true,
                    defaultValue: [],
                  }) as Array<{ q: string; a: string }>}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* 3. SUPPORT TEAM INFO SECTION */}
      <motion.section ref={supportRef} variants={itemVariants} className="scroll-mt-20">
        <SupportSection
          title={t("support.title")}
          subtitle={t("support.subtitle")}
          btnConnect={t("support.btnConnect")}
          btnContact={t("support.btnContact")}
          cards={supportCards}
          onConnectClick={() => navigate("/contact")}
          onContactClick={() => (window.location.href = "tel:9315314828")}
        />
      </motion.section>

      {/* 4. FOOTER TRUST CTA */}
      <motion.section variants={itemVariants}>
        <FAQCTA
          title={t("cta.title")}
          btnProduct={t("cta.btnProduct")}
          btnContact={t("cta.btnContact")}
          onProductClick={() => navigate("/products")}
          onContactClick={() => navigate("/contact")}
        />
      </motion.section>
    </motion.div>
  );
};

export default FaqPage;
