import React from "react";
import { useTranslation } from "react-i18next";
import { Clock, Calendar, Droplets, Wind, Star } from "lucide-react";
import { HourlyForecast, DailyForecast } from "../services/weatherTypes";

interface ForecastCardProps {
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ hourly, daily }) => {
  const { t } = useTranslation();

  const getLocalizedDay = (dayName: string) => {
    const dayMap: Record<string, string> = {
      Sunday: t("weather.days.sunday", "SUN"),
      Monday: t("weather.days.monday", "MON"),
      Tuesday: t("weather.days.tuesday", "TUE"),
      Wednesday: t("weather.days.wednesday", "WED"),
      Thursday: t("weather.days.thursday", "THU"),
      Friday: t("weather.days.friday", "FRI"),
      Saturday: t("weather.days.saturday", "SAT")
    };
    return dayMap[dayName] || dayName;
  };

  // Helper to map WMO code to emoji
  const getConditionEmoji = (code: number) => {
    if (code === 0 || code === 800) return "☀️";
    if (code >= 1 && code <= 3 || (code >= 801 && code <= 804)) return "⛅";
    if (code === 45 || code === 48) return "🌫️";
    if (code >= 51 && code <= 55 || (code >= 300 && code <= 321)) return "🌧️";
    if (code >= 61 && code <= 65 || (code >= 500 && code <= 531)) return "🌧️";
    if (code >= 71 && code <= 77 || (code >= 600 && code <= 622)) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95 && code <= 99 || (code >= 200 && code <= 232)) return "⛈️";
    return "☁️";
  };

  // Helper to color code the sowing suitability status
  const getSuitabilityColor = (suit: string) => {
    if (suit === "excellent") return "bg-emerald-600/10 text-emerald-700 border-emerald-600/25";
    if (suit === "good") return "bg-green-600/10 text-green-700 border-green-600/25";
    if (suit === "fair") return "bg-yellow-600/10 text-yellow-700 border-yellow-600/25";
    return "bg-rose-600/10 text-rose-700 border-rose-600/25";
  };

  return (
    <section className="flex flex-col gap-10 mb-8">
      {/* 1. HOURLY FORECAST WINDOW */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-black text-brand-green-deep flex items-center gap-2 pl-1">
          <Clock className="w-5 h-5 text-brand-green" />
          {t("weather.hourly.title")}
        </h3>
        
        {/* Horizontal Carousel */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
          {hourly.map((h, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-28 flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-brand-green/10 shadow-sm hover:border-brand-green/35 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="text-[10px] font-black text-brand-text-muted uppercase">
                {h.time}
              </span>
              <span className="text-3xl filter drop-shadow-sm my-1">
                {getConditionEmoji(h.rainProb > 40 ? 61 : 0)}
              </span>
              <strong className="text-base font-black text-brand-green-deep">
                {h.temp}°C
              </strong>
              
              {/* Hourly Stats Row */}
              <div className="flex flex-col items-center gap-1 border-t border-brand-green/5 pt-2 w-full">
                <span className="flex items-center gap-0.5 text-[9px] font-black text-brand-green">
                  <Droplets className="w-2.5 h-2.5" />
                  {h.rainProb}%
                </span>
                <span className="flex items-center gap-0.5 text-[9px] font-black text-brand-text-muted">
                  <Wind className="w-2.5 h-2.5" />
                  {h.windSpeed}k
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. WEEKLY FORECAST GRID */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-black text-brand-green-deep flex items-center gap-2 pl-1">
          <Calendar className="w-5 h-5 text-brand-green" />
          {t("weather.weekly.title")}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {daily.map((d, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center gap-2.5 p-4 rounded-2xl bg-white border border-brand-green/10 shadow-sm hover:border-brand-green/35 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="text-xs font-black text-brand-text-muted uppercase">
                {getLocalizedDay(d.day)}
              </span>
              <span className="text-3.5xl filter drop-shadow-sm my-1">
                {getConditionEmoji(d.conditionCode)}
              </span>
              <div className="flex flex-col items-center">
                <strong className="text-base font-black text-brand-green-deep">
                  {d.maxTemp}°C
                </strong>
                <span className="text-xs font-bold text-brand-text-muted">
                  {d.minTemp}°C
                </span>
              </div>

              {/* Rain prob */}
              <span className="flex items-center gap-0.5 text-[10px] font-black text-brand-green">
                <Droplets className="w-3 h-3" />
                {d.rainProb}%
              </span>

              {/* Suitability Label */}
              <div className={`mt-1.5 w-full text-center px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border ${getSuitabilityColor(d.suitability)}`}>
                <span className="flex items-center justify-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  {t(`weather.weekly.suitabilityStatus.${d.suitability}`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForecastCard;
