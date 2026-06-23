import React from "react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../../app/store/useAppStore";
import { Globe } from "lucide-react";

export const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const { lang, setLang } = useAppStore();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-brand-green-deep" />
      <div className="inline-flex rounded-full p-0.5 bg-brand-beige-deep/40 border border-brand-green/10">
        <button
          type="button"
          onClick={() => setLang("en")}
          className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
            lang === "en"
              ? "bg-brand-green text-white shadow-sm"
              : "text-brand-text/70 hover:text-brand-text hover:bg-brand-beige-deep/20"
          }`}
          aria-label={t("switchToEn")}
        >
          {lang === "hi" ? "अंग्रेजी" : "EN"}
        </button>
        <button
          type="button"
          onClick={() => setLang("hi")}
          className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
            lang === "hi"
              ? "bg-brand-green text-white shadow-sm"
              : "text-brand-text/70 hover:text-brand-text hover:bg-brand-beige-deep/20"
          }`}
          aria-label={t("switchToHi")}
        >
          {lang === "hi" ? "हिन्दी" : "HI"}
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
