import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, Gauge, Sun, Sunset, Sunrise, Milestone } from "lucide-react";
import { CurrentWeather } from "../services/weatherTypes";

interface WeatherCardProps {
  current: CurrentWeather;
  soilMoistureVal: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ current, soilMoistureVal }) => {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === "hi";

  // Helper to resolve WMO/Weather code to appropriate emoji
  const getWeatherEmoji = (code: number) => {
    if (code === 0 || code === 800) return "☀️"; // Clear
    if (code >= 1 && code <= 3 || (code >= 801 && code <= 804)) return "⛅"; // Cloudy
    if (code === 45 || code === 48) return "🌫️"; // Fog
    if (code >= 51 && code <= 55 || (code >= 300 && code <= 321)) return "🌧️"; // Drizzle
    if (code >= 61 && code <= 65 || (code >= 500 && code <= 531)) return "🌧️"; // Rain
    if (code >= 71 && code <= 77 || (code >= 600 && code <= 622)) return "❄️"; // Snow
    if (code >= 80 && code <= 82) return "🌦️"; // Showers
    if (code >= 95 && code <= 99 || (code >= 200 && code <= 232)) return "⛈️"; // Thunderstorm
    return "☁️";
  };

  // Helper to map UV index to appropriate warning text key
  const getUvLevelText = (uv: number) => {
    if (uv <= 2) return t("weather.current.uvLevels.low");
    if (uv <= 5) return t("weather.current.uvLevels.moderate");
    if (uv <= 7) return t("weather.current.uvLevels.high");
    return t("weather.current.uvLevels.veryHigh");
  };

  return (
    <section className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-brand-beige-cream to-white border border-brand-green/10 shadow-premium mb-8 text-left">
      <div className="flex flex-col gap-6">
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-green/10 pb-4">
          <h2 className="text-lg font-black text-brand-green-deep">
            {t("weather.current.title")}
          </h2>
          <span className="flex items-center gap-2 text-sm font-extrabold text-brand-brown-warm">
            <Thermometer className="w-4.5 h-4.5 text-brand-brown-warm" />
            {t("weather.current.tempFeelsLike")}: {current.feelsLike}°C
          </span>
        </div>

        {/* Core Temperature Box */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-brand-green-light/40 border border-brand-green/10 rounded-2xl p-6">
          <div className="flex items-center gap-5">
            <motion.span
              animate={{ scale: [1, 1.06, 1], rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="text-6xl md:text-7xl filter drop-shadow-md select-none inline-block"
            >
              {getWeatherEmoji(current.conditionCode)}
            </motion.span>
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-black text-brand-green-deep">
                {current.temp}°C
              </span>
              <span className="text-base font-extrabold text-brand-text/80 mt-1 uppercase tracking-wide">
                {current.conditionText}
              </span>
            </div>
          </div>

          {/* Estimated Soil Moisture block */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-white border border-brand-green/10 shadow-sm w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green relative overflow-hidden">
                <motion.div
                  animate={{ y: [3, -3, 3] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  <Droplets className="w-5 h-5 text-brand-green" />
                </motion.div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-brand-text-muted font-bold">
                  {t("weather.current.soilMoisture")}
                </span>
                <strong className="text-sm font-black text-brand-green-deep">
                  {soilMoistureVal}
                </strong>
              </div>
            </div>

            {/* Irrigation Level Gauge bar */}
            <div className="flex flex-col gap-1 w-full sm:w-28 mt-2 sm:mt-0 border-t sm:border-t-0 sm:border-l border-brand-green/10 pt-2 sm:pt-0 sm:pl-3 text-left">
              <span className="text-[9px] font-black text-brand-green uppercase tracking-wider">{isHi ? "सिंचाई आवश्यकता" : "Irrigation Need"}</span>
              <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden relative border border-gray-200">
                <motion.div
                  initial={{ width: "20%" }}
                  animate={{
                    width: soilMoistureVal.toLowerCase().includes("low") || soilMoistureVal.includes("कम")
                      ? "30%"
                      : soilMoistureVal.toLowerCase().includes("high") || soilMoistureVal.includes("अधिक") || soilMoistureVal.toLowerCase().includes("rain")
                      ? "90%"
                      : "65%"
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    soilMoistureVal.toLowerCase().includes("low") || soilMoistureVal.includes("कम")
                      ? "bg-amber-500"
                      : soilMoistureVal.toLowerCase().includes("high") || soilMoistureVal.includes("अधिक") || soilMoistureVal.toLowerCase().includes("rain")
                      ? "bg-brand-green"
                      : "bg-blue-500"
                  }`}
                />
              </div>
              <span className="text-[9px] font-bold text-brand-text-muted leading-none">
                {soilMoistureVal.toLowerCase().includes("low") || soilMoistureVal.includes("कम")
                  ? (isHi ? "सिंचाई आवश्यक" : "Water Needed")
                  : soilMoistureVal.toLowerCase().includes("high") || soilMoistureVal.includes("अधिक") || soilMoistureVal.toLowerCase().includes("rain")
                  ? (isHi ? "पर्याप्त नमी" : "Optimal (Rain)")
                  : (isHi ? "मध्यम नमी" : "Stable Moisture")}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Humidity */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-brand-green/5 shadow-sm hover:border-brand-green/20 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-brand-text-muted font-bold mb-0.5">
                {t("weather.current.humidity")}
              </span>
              <strong className="text-lg font-black text-brand-green-deep">
                {current.humidity}%
              </strong>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-brand-green/5 shadow-sm hover:border-brand-green/20 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0">
              <Wind className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-brand-text-muted font-bold mb-0.5">
                {t("weather.current.windSpeed")}
              </span>
              <strong className="text-lg font-black text-brand-green-deep">
                {current.windSpeed} km/h
              </strong>
            </div>
          </div>

          {/* Barometric Pressure */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-brand-green/5 shadow-sm hover:border-brand-green/20 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0">
              <Gauge className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-brand-text-muted font-bold mb-0.5">
                {t("weather.current.pressure")}
              </span>
              <strong className="text-lg font-black text-brand-green-deep">
                {current.pressure} hPa
              </strong>
            </div>
          </div>

          {/* UV Radiation */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-brand-green/5 shadow-sm hover:border-brand-green/20 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-brand-text-muted font-bold mb-0.5">
                {t("weather.current.uvIndex")}
              </span>
              <strong className="text-lg font-black text-brand-green-deep">
                {current.uvIndex} ({getUvLevelText(current.uvIndex)})
              </strong>
            </div>
          </div>
        </div>

        {/* Sunrise / Sunset Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-brand-green/5 pt-4 mt-2">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-beige-panel border border-brand-green/5">
            <Sunrise className="w-5 h-5 text-brand-green" />
            <div className="flex flex-col">
              <span className="text-xs text-brand-text-muted font-bold">{t("weather.current.sunrise")}</span>
              <strong className="text-sm font-extrabold text-brand-green-deep">{current.sunrise}</strong>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-beige-panel border border-brand-green/5">
            <Sunset className="w-5 h-5 text-brand-brown-warm" />
            <div className="flex flex-col">
              <span className="text-xs text-brand-text-muted font-bold">{t("weather.current.sunset")}</span>
              <strong className="text-sm font-extrabold text-brand-green-deep">{current.sunset}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherCard;
