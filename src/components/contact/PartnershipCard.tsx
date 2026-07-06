import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Building2, Handshake, Users, Leaf, LucideIcon } from "lucide-react";

interface PartnershipItem {
  key: string;
  icon: LucideIcon;
}

export const PartnershipCard: React.FC = () => {
  const { t } = useTranslation("contact");

  const partnerships: PartnershipItem[] = [
    { key: "business", icon: Building2 },
    { key: "collab", icon: Handshake },
    { key: "outreach", icon: Users },
    { key: "sustainability", icon: Leaf },
  ];

  return (
    <div className="bg-brand-beige-cream/30 border border-brand-green/10 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mb-10">
        <span className="inline-block px-3 py-1.5 text-[10px] md:text-xs font-black tracking-widest text-brand-brown uppercase bg-brand-brown/10 rounded-full mb-3 border border-brand-brown/15 shadow-sm">
          {t("partnership.badge")}
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-deep tracking-tight">
          {t("partnership.title")}
        </h2>
        <p className="mt-2 text-xs md:text-sm text-brand-text-muted font-bold leading-relaxed">
          {t("partnership.subtitle")}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {partnerships.map(({ key, icon: Icon }) => (
          <motion.div
            key={key}
            className="p-6 rounded-2xl bg-white border border-brand-green/10 shadow-sm hover:border-brand-green/25 hover:shadow-premium transition-all duration-350 flex flex-col items-start cursor-pointer group"
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-xl bg-brand-green-light flex items-center justify-center text-brand-green-deep mb-4 group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
              <Icon className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-brand-green-deep tracking-tight mb-2 group-hover:text-brand-green transition-colors duration-250">
              {t(`partnership.${key}.title`)}
            </h4>
            <p className="text-[11px] text-brand-text-muted font-bold leading-relaxed">
              {t(`partnership.${key}.desc`)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PartnershipCard;
