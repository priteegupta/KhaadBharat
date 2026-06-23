import React from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Leaf, Sprout } from "lucide-react";

export const TrustStrip: React.FC = () => {
  const { t } = useTranslation();

  // Focus items from translate JSON
  const trustItems = [
    {
      key: 0,
      label: t("brand.focus.0", { defaultValue: "Farmer trust" }),
      icon: <ShieldCheck className="w-5 h-5 text-brand-green" />,
    },
    {
      key: 1,
      label: t("brand.focus.1", { defaultValue: "Organic biochar" }),
      icon: <Leaf className="w-5 h-5 text-brand-green" />,
    },
    {
      key: 2,
      label: t("brand.focus.2", { defaultValue: "Future farm inputs" }),
      icon: <Sprout className="w-5 h-5 text-brand-green" />,
    },
  ];

  return (
    <div className="w-full bg-brand-beige-panel/70 border-y border-brand-green/10 py-6 my-8 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
          {trustItems.map((item) => (
            <div key={item.key} className="flex items-center gap-3 transition-transform hover:scale-105 duration-200">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-green/10">
                {item.icon}
              </div>
              <span className="text-base font-extrabold text-brand-green-deep tracking-wide uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
