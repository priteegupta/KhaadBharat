import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CloudSun, Info, ShieldAlert, Droplet } from "lucide-react";

export const WeatherHero: React.FC = () => {
  const { t } = useTranslation();
  
  const features = t("weather.hero.features", { returnObjects: true, defaultValue: [] }) as string[];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#c6e3f7] via-[#e8f5fd] to-brand-beige-cream rounded-3xl border border-brand-green/10 p-8 md:p-12 lg:p-14 shadow-premium mb-8">
      {/* Animated Clouds Background */}
      <motion.div
        className="absolute top-10 -right-20 text-[#a3d4f7]/30 pointer-events-none"
        animate={{ x: [-40, 40, -40] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <CloudSun className="w-48 h-48" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green-deep font-extrabold text-xs tracking-wider uppercase w-fit">
            <CloudSun className="w-3.5 h-3.5" />
            WEATHER INTELLIGENCE
          </div>

          {/* Title & Subheadline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-green-deep leading-tight">
            {t("weather.hero.title")}
          </h1>
          <p className="text-base md:text-lg text-brand-text font-bold max-w-2xl leading-relaxed">
            {t("weather.hero.subtitle")}
          </p>

          {/* Features Checklist */}
          {features.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {features.map((feat, i) => {
                const icons = [
                  <CloudSun className="w-4 h-4" key="1" />,
                  <Droplet className="w-4 h-4" key="2" />,
                  <ShieldAlert className="w-4 h-4" key="3" />,
                  <Info className="w-4 h-4" key="4" />
                ];
                return (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/70 border border-white/40 shadow-sm">
                    <span className="flex-shrink-0 text-brand-green-deep">
                      {icons[i] || <Info className="w-4 h-4" />}
                    </span>
                    <span className="text-sm font-extrabold text-brand-green-deep">{feat}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right side styling visual */}
        <div className="lg:col-span-4 hidden lg:flex justify-center items-center">
          <div className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-brand-accent-sunlight/30 to-brand-green/20 flex items-center justify-center border-4 border-white shadow-lg">
            <CloudSun className="w-24 h-24 text-brand-green-deep drop-shadow-md" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherHero;
