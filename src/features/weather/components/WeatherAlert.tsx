import React from "react";
import { useTranslation } from "react-i18next";
import { AlertOctagon, AlertTriangle, Info } from "lucide-react";
import { WeatherAlert as AlertType } from "../services/weatherTypes";

interface WeatherAlertProps {
  alerts: AlertType[];
}

export const WeatherAlert: React.FC<WeatherAlertProps> = ({ alerts }) => {
  const { t } = useTranslation();

  if (!alerts || alerts.length === 0) return null;

  // Helper to color alert banners
  const getAlertClasses = (level: string) => {
    if (level === "danger") return "bg-red-50 text-red-800 border-red-200";
    if (level === "warning") return "bg-amber-50 text-amber-800 border-amber-200";
    return "bg-blue-50 text-blue-800 border-blue-200";
  };

  const getAlertIcon = (level: string) => {
    if (level === "danger") return <AlertOctagon className="w-5 h-5 text-red-600 flex-shrink-0 animate-pulse" />;
    if (level === "warning") return <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />;
    return <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />;
  };

  return (
    <section className="flex flex-col gap-3 mb-8 w-full">
      {alerts.map((alert, i) => (
        <div
          key={i}
          className={`flex items-center gap-3.5 p-4 rounded-2xl border ${getAlertClasses(alert.level)} shadow-sm transition-all duration-300`}
        >
          {getAlertIcon(alert.level)}
          <div className="flex-grow">
            <span className="text-[10px] font-black tracking-wider uppercase opacity-85 block mb-0.5">
              {alert.level === "danger" ? t("weather.rain.heavyAlert") : t("weather.rain.title")}
            </span>
            <p className="text-sm font-extrabold leading-snug">
              {t(alert.messageKey)}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default WeatherAlert;
