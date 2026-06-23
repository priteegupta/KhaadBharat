import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AlertCircle, RotateCcw, Loader2 } from "lucide-react";
import SEO from "../../../components/common/SEO";
import WeatherHero from "../components/WeatherHero";
import LocationSelector from "../components/LocationSelector";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import RainChart from "../components/RainChart";
import FarmingInsightCard from "../components/FarmingInsightCard";
import IrrigationCard from "../components/IrrigationCard";
import WeatherAlert from "../components/WeatherAlert";
import useWeatherQuery from "../services/weatherHooks";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as any;

export const WeatherPage: React.FC = () => {
  const { t } = useTranslation();
  
  // Persistent location loading (default: wait for geolocation)
  const [location, setLocation] = useState<{ name: string; lat: number; lon: number }>(() => {
    const cached = localStorage.getItem("khaad-bharat-last-location");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error("Failed to parse cached location:", e);
      }
    }
    return { name: "", lat: 0, lon: 0 };
  });

  // Attempt to detect real-time location on first load if we have no cached location
  useEffect(() => {
    if (location.lat === 0 && location.lon === 0) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            handleSelectLocation("Detected Field", latitude, longitude);
          },
          (error) => {
            console.error("Geolocation error on mount:", error);
            // Fallback to New Delhi if user denies geolocation
            handleSelectLocation("New Delhi", 28.6139, 77.2090);
          },
          { timeout: 8000 }
        );
      } else {
        handleSelectLocation("New Delhi", 28.6139, 77.2090);
      }
    }
  }, [location.lat, location.lon]);

  // Persist location selection when updated
  const handleSelectLocation = (name: string, lat: number, lon: number) => {
    const nextLoc = { name, lat, lon };
    setLocation(nextLoc);
    localStorage.setItem("khaad-bharat-last-location", JSON.stringify(nextLoc));
  };

  // Run React Query Weather Hook
  const { data: weather, isLoading, isError, refetch } = useWeatherQuery(
    location.lat,
    location.lon,
    location.name
  );

  return (
    <motion.div
      className="flex flex-col min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SEO title={t("weather.hero.title")} description="Accurate agricultural weather intelligence." />

      {/* 1. Cinematic Weather Hero Banner */}
      <WeatherHero />

      {/* 2. Interactive Search and GPS Location Autocomplete */}
      <LocationSelector
        onSelectLocation={handleSelectLocation}
        currentLocationName={location.name}
      />

      {/* 3. Dynamic API Data Rendering */}
      <main className="flex-grow mb-16">
        {(isLoading || location.lat === 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
            {/* Left column loading skeleton */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="h-64 rounded-3xl bg-brand-green-light/40 border border-brand-green/5" />
              <div className="h-48 rounded-2xl bg-brand-green-light/20 border border-brand-green/5" />
              <div className="h-56 rounded-3xl bg-brand-green-light/20 border border-brand-green/5" />
            </div>
            {/* Right column loading skeleton */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="h-[280px] rounded-3xl bg-brand-green-light/30 border border-brand-green/5" />
              <div className="h-[280px] rounded-3xl bg-brand-green-light/30 border border-brand-green/5" />
            </div>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center text-center p-12 bg-red-50 border border-red-200 rounded-3xl shadow-sm gap-4">
            <AlertCircle className="w-12 h-12 text-red-600 animate-bounce" />
            <h3 className="text-xl font-black text-red-800">
              {t("weather.location.errorFetchFailed")}
            </h3>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-black text-white bg-brand-green-deep hover:bg-brand-green transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              {t("weather.location.tryAgain")}
            </button>
          </div>
        )}

        {/* Successful Weather Load */}
        {!isLoading && !isError && weather && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-6"
          >
            {/* 3a. Severe Weather warnings */}
            <WeatherAlert alerts={weather.alerts} />

            {/* 3b. Data Widgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (Main metrics & forecasts) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <WeatherCard
                  current={weather.current}
                  soilMoistureVal={
                    weather.irrigation.status === "low"
                      ? t("weather.current.low")
                      : weather.irrigation.status === "rain"
                      ? t("weather.current.high")
                      : t("weather.current.medium")
                  }
                />
                
                <ForecastCard
                  hourly={weather.hourly}
                  daily={weather.daily}
                />

                <RainChart
                  daily={weather.daily}
                  expectedRainVal={
                    weather.daily[0]?.rainProb >= 60
                      ? `${t("weather.current.high")} (${weather.daily[0]?.rainProb}%)`
                      : `${t("weather.current.low")} (${weather.daily[0]?.rainProb}%)`
                  }
                />
              </div>

              {/* Right Column (Agricultural Advisories & Recommendations) */}
              <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
                <FarmingInsightCard insights={weather.insights} />
                <IrrigationCard irrigation={weather.irrigation} />
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default WeatherPage;
