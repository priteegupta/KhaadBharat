import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import SchemeCard from "./SchemeCard";
import { MapPin, Info } from "lucide-react";

interface SchemeData {
  id: string;
  title: string;
  category: string;
  governmentType: string;
  state: string;
  benefitAmount: string;
  eligibilityPreview: string;
  desc: string;
  eligibility: string[];
  supportType: string;
  deadline: string;
  process: string;
  reference: string;
}

interface StateSchemeGridProps {
  schemes: SchemeData[];
  statesList: { key: string; value: string }[];
}

export const StateSchemeGrid: React.FC<StateSchemeGridProps> = ({
  schemes,
  statesList,
}) => {
  const { t } = useTranslation("schemes");
  const [selectedState, setSelectedState] = useState<string>("punjab"); // Default to Punjab or first state

  const stateSchemes = schemes.filter(
    (s) => s.governmentType === "state" && s.state === selectedState
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* State Selector Buttons / Dropdown */}
      <div className="flex flex-col gap-4 bg-brand-beige-cream/50 p-6 rounded-3xl border border-brand-green/10 shadow-sm">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-black text-brand-green-deep uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-brand-green" />
            {t("filters.stateLabel")}
          </label>
          <p className="text-xs text-brand-text-muted font-bold">
            Select your state to discover localized agricultural benefits and soil support initiatives.
          </p>
        </div>

        {/* Desktop Buttons List */}
        <div className="hidden lg:flex flex-wrap gap-2.5">
          {statesList.map((state) => (
            <button
              key={state.key}
              onClick={() => setSelectedState(state.key)}
              className={`px-5 py-3 rounded-full text-xs font-black transition-all border ${
                selectedState === state.key
                  ? "bg-brand-green text-white border-transparent shadow-sm"
                  : "bg-white text-brand-text border-brand-green/10 hover:bg-brand-green-light"
              }`}
            >
              {state.value}
            </button>
          ))}
        </div>

        {/* Mobile Dropdown Select */}
        <div className="lg:hidden w-full">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-brand-green/15 bg-white text-brand-text font-black text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/35 shadow-sm"
          >
            {statesList.map((state) => (
              <option key={state.key} value={state.key}>
                {state.value}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Dynamic Cards */}
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {stateSchemes.length > 0 ? (
            <motion.div
              key={selectedState}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {stateSchemes.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme as any} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-6 rounded-2xl bg-brand-beige-cream border border-brand-green/5 text-sm text-brand-text font-bold"
            >
              <Info className="w-5 h-5 text-brand-brown-warm flex-shrink-0" />
              <span>{t("noStateSchemes")}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StateSchemeGrid;
