import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className="rounded-2xl border border-brand-green/10 bg-white shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left font-black text-brand-green-deep hover:text-brand-green transition-colors focus:outline-none"
            >
              <span className="flex items-center gap-3 text-sm md:text-base leading-snug">
                <HelpCircle className="w-5 h-5 text-brand-green flex-shrink-0" />
                {item.question}
              </span>
              <span className="p-1 rounded-full bg-brand-green-light text-brand-green flex-shrink-0">
                {isOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-5 pt-1 border-t border-brand-green/5 text-xs md:text-sm font-semibold text-brand-text-muted leading-relaxed">
                    {item.answer}
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
