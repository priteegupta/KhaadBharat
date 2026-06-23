import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, RotateCcw } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedFarmerType: string;
  setSelectedFarmerType: (type: string) => void;
  selectedSubsidyType: string;
  setSelectedSubsidyType: (type: string) => void;
  selectedBenefitType: string;
  setSelectedBenefitType: (type: string) => void;
  categories: { key: string; value: string }[];
  states: { key: string; value: string }[];
  farmerTypes: { key: string; value: string }[];
  subsidyTypes: { key: string; value: string }[];
  benefitTypes: { key: string; value: string }[];
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedState,
  setSelectedState,
  selectedFarmerType,
  setSelectedFarmerType,
  selectedSubsidyType,
  setSelectedSubsidyType,
  selectedBenefitType,
  setSelectedBenefitType,
  categories,
  states,
  farmerTypes,
  subsidyTypes,
  benefitTypes,
  onReset,
}) => {
  const { t } = useTranslation("schemes");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    (selectedState ? 1 : 0) +
    (selectedFarmerType ? 1 : 0) +
    (selectedSubsidyType ? 1 : 0) +
    (selectedBenefitType ? 1 : 0);

  const FilterInputs = () => (
    <>
      {/* Category Filter */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-xs font-bold text-brand-green-deep uppercase tracking-wider">
          {t("filters.categoryLabel")}
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2.5 rounded-full border border-brand-green/10 bg-brand-beige-cream text-brand-text font-bold focus:outline-none focus:ring-2 focus:ring-brand-green/35 text-sm cursor-pointer shadow-sm"
        >
          <option value="">{t("filters.allCategories")}</option>
          {categories.map((c) => (
            <option key={c.key} value={c.key}>
              {c.value}
            </option>
          ))}
        </select>
      </div>

      {/* State Filter */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-xs font-bold text-brand-green-deep uppercase tracking-wider">
          {t("filters.stateLabel")}
        </label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full px-4 py-2.5 rounded-full border border-brand-green/10 bg-brand-beige-cream text-brand-text font-bold focus:outline-none focus:ring-2 focus:ring-brand-green/35 text-sm cursor-pointer shadow-sm"
        >
          <option value="">{t("filters.allStates")}</option>
          {states.map((s) => (
            <option key={s.key} value={s.key}>
              {s.value}
            </option>
          ))}
        </select>
      </div>

      {/* Farmer Type Filter */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-xs font-bold text-brand-green-deep uppercase tracking-wider">
          {t("filters.farmerTypeLabel")}
        </label>
        <select
          value={selectedFarmerType}
          onChange={(e) => setSelectedFarmerType(e.target.value)}
          className="w-full px-4 py-2.5 rounded-full border border-brand-green/10 bg-brand-beige-cream text-brand-text font-bold focus:outline-none focus:ring-2 focus:ring-brand-green/35 text-sm cursor-pointer shadow-sm"
        >
          <option value="">{t("filters.allFarmerTypes")}</option>
          {farmerTypes.map((f) => (
            <option key={f.key} value={f.key}>
              {f.value}
            </option>
          ))}
        </select>
      </div>

      {/* Benefit Type Filter */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-xs font-bold text-brand-green-deep uppercase tracking-wider">
          {t("filters.benefitTypeLabel")}
        </label>
        <select
          value={selectedBenefitType}
          onChange={(e) => setSelectedBenefitType(e.target.value)}
          className="w-full px-4 py-2.5 rounded-full border border-brand-green/10 bg-brand-beige-cream text-brand-text font-bold focus:outline-none focus:ring-2 focus:ring-brand-green/35 text-sm cursor-pointer shadow-sm"
        >
          <option value="">{t("filters.allBenefitTypes")}</option>
          {benefitTypes.map((b) => (
            <option key={b.key} value={b.key}>
              {b.value}
            </option>
          ))}
        </select>
      </div>

      {/* Subsidy Type Filter */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-xs font-bold text-brand-green-deep uppercase tracking-wider">
          {t("filters.subsidyTypeLabel")}
        </label>
        <select
          value={selectedSubsidyType}
          onChange={(e) => setSelectedSubsidyType(e.target.value)}
          className="w-full px-4 py-2.5 rounded-full border border-brand-green/10 bg-brand-beige-cream text-brand-text font-bold focus:outline-none focus:ring-2 focus:ring-brand-green/35 text-sm cursor-pointer shadow-sm"
        >
          <option value="">{t("filters.allSubsidyTypes")}</option>
          {subsidyTypes.map((sub) => (
            <option key={sub.key} value={sub.key}>
              {sub.value}
            </option>
          ))}
        </select>
      </div>
    </>
  );

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Search & Top Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md flex-grow">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-green-deep w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("filters.searchPlaceholder")}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-brand-green/10 bg-white text-brand-text font-bold placeholder-brand-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-green/35 text-sm shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-brand-text-muted hover:text-brand-text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-green-deep text-white font-extrabold text-sm shadow-sm w-full"
          >
            <Filter className="w-4 h-4" />
            {t("filters.filterDrawerTitle")}
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center bg-brand-accent-sunlight text-brand-green-deep w-5 h-5 rounded-full text-xs font-black">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Desktop Reset Button */}
          {activeFilterCount > 0 && (
            <button
              onClick={onReset}
              className="hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-full border border-brand-brown/20 bg-brand-beige-cream text-brand-brown text-sm font-extrabold hover:bg-brand-brown/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {t("filters.reset")}
            </button>
          )}
        </div>
      </div>

      {/* Desktop Filter Panel */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-4 p-6 rounded-3xl bg-white border border-brand-green/10 shadow-sm">
        <FilterInputs />
      </div>

      {/* Mobile Drawer (collapsible filter panel) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 p-6 shadow-2xl flex flex-col gap-6 md:hidden border-l border-brand-green/10"
            >
              <div className="flex items-center justify-between border-b border-brand-green/5 pb-4">
                <h3 className="text-lg font-black text-brand-green-deep flex items-center gap-2">
                  <Filter className="w-5 h-5 text-brand-green" />
                  {t("filters.filterDrawerTitle")}
                </h3>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 rounded-full hover:bg-brand-green-light text-brand-text-muted hover:text-brand-text"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto flex-grow">
                <FilterInputs />
              </div>

              <div className="border-t border-brand-green/5 pt-4 flex flex-col gap-3">
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      onReset();
                      setIsDrawerOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-brand-brown/20 bg-brand-beige-cream text-brand-brown text-sm font-extrabold hover:bg-brand-brown/10 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t("filters.reset")}
                  </button>
                )}
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-3 rounded-full bg-brand-green-deep text-white text-sm font-extrabold hover:bg-brand-green-deep/90 transition-colors"
                >
                  {t("filters.closeFilters")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;
