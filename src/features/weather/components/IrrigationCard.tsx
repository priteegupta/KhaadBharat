import React from "react";
import { useTranslation } from "react-i18next";
import { Droplet, Info, AlertTriangle } from "lucide-react";
import { IrrigationAdvice } from "../services/weatherTypes";

interface IrrigationCardProps {
  irrigation: IrrigationAdvice;
}

export const IrrigationCard: React.FC<IrrigationCardProps> = ({ irrigation }) => {
  const { t } = useTranslation();

  // Helper to color soil moisture progress bar
  const getProgressBarColor = (val: number) => {
    if (val < 40) return "bg-amber-500";
    if (val <= 75) return "bg-brand-green";
    return "bg-[#63b3ed]";
  };

  // Helper to retrieve warning status tag
  const getStatusText = (status: string) => {
    if (status === "low") return t("weather.current.low");
    if (status === "rain") return t("weather.current.high");
    if (status === "evap") return t("weather.current.medium");
    return t("weather.current.medium");
  };

  return (
    <article className="p-6 md:p-8 rounded-3xl bg-white border border-brand-green/10 shadow-premium flex flex-col gap-6 h-full">
      {/* Header */}
      <div>
        <h3 className="text-lg font-black text-brand-green-deep flex items-center gap-2 mb-1">
          <Droplet className="w-5 h-5 text-brand-green" />
          {t("weather.irrigation.title")}
        </h3>
        <p className="text-xs text-brand-text-muted font-bold">
          {t("weather.irrigation.subtitle", "Water management recommendations designed for smart field scaling.")}
        </p>
      </div>

      <div className="flex flex-col gap-5 flex-grow justify-center">
        {/* Soil moisture meter */}
        <div className="flex flex-col gap-2 p-5 rounded-2xl bg-brand-beige-panel border border-brand-green/10">
          <div className="flex items-center justify-between text-sm font-extrabold text-brand-green-deep">
            <span>{t("weather.irrigation.titleMoisture")}</span>
            <span className="text-base font-black">{irrigation.moistureIndex}%</span>
          </div>

          {/* Styled progress bar */}
          <div className="w-full bg-brand-green-light h-3.5 rounded-full overflow-hidden border border-brand-green/5">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${getProgressBarColor(irrigation.moistureIndex)}`}
              style={{ width: `${irrigation.moistureIndex}%` }}
            />
          </div>

          {/* Scale markers */}
          <div className="flex justify-between text-[9px] font-black text-brand-text-muted uppercase tracking-wider px-1">
            <span>{t("weather.current.low")}</span>
            <span>{t("weather.current.medium")}</span>
            <span>{t("weather.current.high")}</span>
          </div>
        </div>

        {/* Dynamic warning banner */}
        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-green-light border border-brand-green/20">
          <div className="mt-0.5 text-brand-brown-warm flex-shrink-0">
            {irrigation.status === "low" ? (
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            ) : (
              <Info className="w-5 h-5 text-brand-green" />
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-black text-brand-text-muted uppercase">
              {t("weather.irrigation.soilStatus")}: {getStatusText(irrigation.status)}
            </span>
            <p className="text-sm font-semibold text-brand-green-deep leading-relaxed">
              {t(irrigation.messageKey)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default IrrigationCard;
