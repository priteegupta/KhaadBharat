import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatTextWithLinks } from "../../utils/url";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  searchQuery?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  searchQuery = "",
}) => {
  const { i18n, t } = useTranslation(["faq", "common"]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{formatTextWithLinks(text)}</span>;
    const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index} className="bg-brand-accent-sunlight/50 text-brand-text font-black rounded px-0.5">
              {part}
            </mark>
          ) : (
            <React.Fragment key={index}>{formatTextWithLinks(part)}</React.Fragment>
          )
        )}
      </span>
    );
  };

  const handleSpeak = (text: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accordion toggle

    if (!window.speechSynthesis) return;

    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language and rate
    const currentLang = i18n.language || "en";
    utterance.lang = currentLang === "hi" ? "hi-IN" : "en-US";
    utterance.rate = 0.92;
    utterance.pitch = 1.05;

    // Try to select a natural voice
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith(currentLang) &&
        (v.name.toLowerCase().includes("natural") ||
          v.name.toLowerCase().includes("neural") ||
          v.name.toLowerCase().includes("studio") ||
          v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("sri") ||
          v.name.toLowerCase().includes("neerja") ||
          v.name.toLowerCase().includes("priya"))
    ) || voices.find((v) => v.lang.toLowerCase().startsWith(currentLang));

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => {
      setSpeakingIndex(null);
    };

    utterance.onerror = () => {
      setSpeakingIndex(null);
    };

    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

    const getAnswerVisual = (qText: string) => {
      const qLower = qText.toLowerCase();
      const isWater = qLower.includes("water") || qLower.includes("irrigation") || qLower.includes("सिंचाई") || qLower.includes("पानी");
      const isSoil = qLower.includes("soil") || qLower.includes("crop") || qLower.includes("मिट्टी") || qLower.includes("फसल") || qLower.includes("biochar") || qLower.includes("बायोचार");
      const isCost = qLower.includes("cost") || qLower.includes("price") || qLower.includes("saving") || qLower.includes("laagat") || qLower.includes("लागत") || qLower.includes("बचत") || qLower.includes("फायदा");

      if (isWater) {
        return (
          <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shrink-0 shadow-sm">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" fill="rgba(59,130,246,0.15)" />
            </svg>
          </div>
        );
      }
      if (isSoil) {
        return (
          <div className="w-14 h-14 rounded-xl bg-brand-green-light border border-brand-green/20 flex items-center justify-center text-brand-green shrink-0 shadow-sm">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 10a6 6 0 0 0-6-6H3v2a6 6 0 0 0 6 6h3z" fill="rgba(34,197,94,0.1)" />
              <path d="M12 22V12" />
              <path d="M12 10a6 6 0 0 1 6-6h3v2a6 6 0 0 1-6 6h-3z" fill="rgba(34,197,94,0.1)" />
            </svg>
          </div>
        );
      }
      if (isCost) {
        return (
          <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-100/50 flex items-center justify-center text-amber-500 shrink-0 shadow-sm">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
        );
      }
      return (
        <div className="w-14 h-14 rounded-xl bg-brand-green/5 border border-brand-green/10 flex items-center justify-center text-brand-green/60 shrink-0 shadow-sm">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
      );
    };

    return (
      <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          const isSpeaking = speakingIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-brand-green bg-brand-green-light/25 shadow-sm"
                  : "border-brand-green/10 bg-white hover:border-brand-green/20"
              }`}
            >
              {/* Header Trigger */}
              <button
                onClick={() => toggleAccordion(idx)}
                className="flex items-center justify-between w-full p-5 text-left font-bold text-brand-green-deep gap-4 focus:outline-none"
              >
                <span className="text-sm md:text-base font-extrabold flex-1 leading-snug">
                  {highlightText(item.q, searchQuery)}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  {/* Voice button */}
                  <button
                    onClick={(e) => handleSpeak(item.a, idx, e)}
                    className={`p-2 rounded-full border transition-all duration-200 ${
                      isSpeaking
                        ? "bg-brand-green border-transparent text-white animate-pulse"
                        : "bg-brand-green-light/40 border-brand-green/10 text-brand-green hover:bg-brand-green hover:text-white"
                    }`}
                    title={t("common:ui.readAloud")}
                    aria-label={t("common:ui.readAloud")}
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  {/* Expand Indicator */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-brand-green/60"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </button>

              {/* Collapsible Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-3 border-t border-brand-green/5 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
                      <div className="flex-1 order-2 sm:order-1">
                        <p className="text-xs sm:text-sm font-semibold leading-relaxed text-brand-text-muted">
                          {highlightText(item.a, searchQuery)}
                        </p>
                      </div>
                      <div className="order-1 sm:order-2 self-start sm:self-center shrink-0">
                        {getAnswerVisual(item.q)}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
};

export default FAQAccordion;
