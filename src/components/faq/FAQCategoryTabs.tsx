import React, { useRef, useEffect } from "react";

interface FAQCategoryTabsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: Record<string, string>;
}

export const FAQCategoryTabs: React.FC<FAQCategoryTabsProps> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll active tab into view on mobile
  useEffect(() => {
    const activeElement = containerRef.current?.querySelector("[data-active='true']");
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedCategory]);

  return (
    <div className="w-full border-b border-brand-green/10 pb-4">
      <div
        ref={containerRef}
        className="flex gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1 px-2 md:flex-wrap md:justify-center md:overflow-x-visible"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {Object.entries(categories).map(([key, value]) => {
          const isActive = selectedCategory === key;
          return (
            <button
              key={key}
              data-active={isActive}
              onClick={() => setSelectedCategory(key)}
              className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wide whitespace-nowrap transition-all duration-200 border shrink-0 ${
                isActive
                  ? "bg-brand-green text-white border-transparent shadow-sm scale-[1.03]"
                  : "bg-white border-brand-green/10 text-brand-green-deep hover:bg-brand-green-light/40 hover:border-brand-green/20"
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FAQCategoryTabs;
