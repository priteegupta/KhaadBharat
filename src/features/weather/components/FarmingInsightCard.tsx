import React from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, ShieldAlert, Info, Sprout } from "lucide-react";
import { FarmingInsight } from "../services/weatherTypes";

interface FarmingInsightCardProps {
  insights: FarmingInsight[];
}

export const FarmingInsightCard: React.FC<FarmingInsightCardProps> = ({ insights }) => {
  const { t } = useTranslation();

  // Helper to resolve icon based on advisory type
  const getInsightIcon = (type: string) => {
    if (type === "success") return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
    if (type === "warning") return <ShieldAlert className="w-5 h-5 text-amber-600" />;
    return <Info className="w-5 h-5 text-blue-600" />;
  };

  // Helper to resolve background color classes based on advisory type
  const getInsightBg = (type: string) => {
    if (type === "success") return "bg-emerald-50 border-emerald-200/60";
    if (type === "warning") return "bg-amber-50/70 border-amber-200/60";
    return "bg-blue-50/60 border-blue-200/60";
  };

  return (
    <article className="p-6 md:p-8 rounded-3xl bg-white border border-brand-green/10 shadow-premium flex flex-col gap-6 h-full">
      <div>
        <h3 className="text-lg font-black text-brand-green-deep flex items-center gap-2 mb-1">
          <Sprout className="w-5 h-5 text-brand-green" />
          {t("weather.insights.title")}
        </h3>
        <p className="text-xs text-brand-text-muted font-bold">
          {t("weather.insights.subtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-4 flex-grow justify-center">
        {insights.map((insight, i) => (
          <div
            key={i}
            className={`flex items-start gap-4 p-4 rounded-2xl border ${getInsightBg(insight.type)} transition-colors duration-300`}
          >
            <div className="mt-0.5 flex-shrink-0">
              {getInsightIcon(insight.type)}
            </div>
            <p className="text-sm font-semibold text-brand-green-deep leading-relaxed">
              {t(insight.messageKey)}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default FarmingInsightCard;
