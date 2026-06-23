import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export type MediaTabType = "videos" | "stories" | "gallery" | "brochures" | "campaigns" | "press" | "resources";

interface MediaTabsProps {
  activeTab: MediaTabType;
  onChangeTab: (tab: MediaTabType) => void;
}

export const MediaTabs: React.FC<MediaTabsProps> = ({ activeTab, onChangeTab }) => {
  const { t } = useTranslation();
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const tabs: { id: MediaTabType; label: string }[] = [
    { id: "videos", label: t("media.tabs.videos") },
    { id: "stories", label: t("media.tabs.stories") },
    { id: "gallery", label: t("media.tabs.gallery") },
    { id: "brochures", label: t("media.tabs.brochures") },
    { id: "campaigns", label: t("media.tabs.campaigns") },
    { id: "press", label: t("media.tabs.press") },
    { id: "resources", label: t("media.tabs.resources") },
  ];

  // Auto-scroll selected tab into view on mobile
  useEffect(() => {
    if (activeTabRef.current && containerRef.current) {
      const container = containerRef.current;
      const tab = activeTabRef.current;

      const containerScrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.clientWidth;

      if (tabLeft < containerScrollLeft) {
        container.scrollTo({ left: tabLeft - 16, behavior: "smooth" });
      } else if (tabLeft + tabWidth > containerScrollLeft + containerWidth) {
        container.scrollTo({ left: tabLeft + tabWidth - containerWidth + 16, behavior: "smooth" });
      }
    }
  }, [activeTab]);

  return (
    <div className="sticky top-[80px] z-30 w-full bg-brand-beige-cream/80 backdrop-blur-md border-b border-brand-green/10 py-4 mb-10">
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-1 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={isActive ? activeTabRef : null}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-extrabold transition-all duration-300 ${
                isActive
                  ? "text-white"
                  : "text-brand-text/70 hover:text-brand-green hover:bg-brand-green/5"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeMediaTab"
                  className="absolute inset-0 bg-brand-green rounded-full shadow-sm"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MediaTabs;
