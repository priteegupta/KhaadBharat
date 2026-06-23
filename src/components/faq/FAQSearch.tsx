import React from "react";
import { useTranslation } from "react-i18next";
import { Search, X, HelpCircle } from "lucide-react";

interface FAQSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder: string;
  examplesLabel: string;
  examples: string[];
}

export const FAQSearch: React.FC<FAQSearchProps> = ({
  searchQuery,
  setSearchQuery,
  placeholder,
  examplesLabel,
  examples,
}) => {
  const { t } = useTranslation("common");
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {/* Search Input Bar */}
      <div className="relative flex items-center w-full bg-white border border-brand-green/20 rounded-full shadow-sm focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green/10 transition-all p-1">
        <div className="pl-4 text-brand-green-deep">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-3 bg-transparent border-0 focus:outline-none focus:ring-0 text-sm font-bold text-brand-text placeholder-brand-text-muted"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="p-2 mr-2 rounded-full hover:bg-brand-green-light text-brand-text-muted hover:text-brand-green transition-all"
            aria-label={t("ui.clear")}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Examples / Clickable Chips */}
      {examples && examples.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-2">
          <span className="text-xs font-bold text-brand-text-muted flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-brand-brown-warm" />
            {examplesLabel}
          </span>
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => setSearchQuery(example)}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border border-brand-green/10 text-brand-green-deep hover:bg-brand-green hover:text-white hover:border-transparent transition-all shadow-sm"
            >
              {example}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQSearch;
