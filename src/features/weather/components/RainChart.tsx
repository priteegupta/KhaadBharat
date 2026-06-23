import React from "react";
import { useTranslation } from "react-i18next";
import { CloudRain, BarChart3 } from "lucide-react";
import { DailyForecast } from "../services/weatherTypes";

interface RainChartProps {
  daily: DailyForecast[];
  expectedRainVal: string;
}

export const RainChart: React.FC<RainChartProps> = ({ daily, expectedRainVal }) => {
  const { t } = useTranslation();

  // Find the maximum rainfall probability in the forecast to show context
  const maxProb = daily.length > 0 ? Math.max(...daily.map(d => d.rainProb)) : 0;

  return (
    <section className="p-6 md:p-8 rounded-3xl bg-white border border-brand-green/10 shadow-premium mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Summary Cards */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-black text-brand-green-deep flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-brand-green" />
              {t("weather.rain.title")}
            </h3>
            <p className="text-xs text-brand-text-muted font-bold">
              Predictive rainfall statistics to plan fertilizer broadcasting schedules.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Expected rain level */}
            <div className="p-4 rounded-2xl bg-brand-green-light/40 border border-brand-green/10 flex flex-col">
              <span className="text-xs text-brand-text-muted font-semibold mb-0.5">
                {t("weather.rain.expectedRain")}
              </span>
              <strong className="text-xl font-black text-brand-green-deep">
                {expectedRainVal}
              </strong>
            </div>

            {/* Advisory status card */}
            <div className="p-4 rounded-2xl bg-brand-beige-cream border border-brand-green/10 flex flex-col">
              <span className="text-xs text-brand-text-muted font-semibold mb-0.5">
                {t("weather.rain.irrigationSugg")}
              </span>
              <strong className="text-base font-black text-brand-green-deep">
                {maxProb >= 60 ? "Postpone Broadcasting" : "Safe to Apply Biochar"}
              </strong>
            </div>
          </div>
        </div>

        {/* Right Side: Responsive SVG Bar Chart */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <span className="text-xs font-black text-brand-green uppercase tracking-wider flex items-center gap-1.5 pl-1">
            <BarChart3 className="w-4 h-4" />
            {t("weather.rain.chartTitle")}
          </span>

          <div className="relative w-full h-[220px] bg-brand-beige-panel/50 border border-brand-green/5 rounded-2xl p-4 flex flex-col justify-between">
            {/* Chart Grid Lines */}
            <div className="absolute inset-x-4 inset-y-12 flex flex-col justify-between pointer-events-none">
              {[0, 25, 50, 75, 100].map((level) => (
                <div key={level} className="relative flex items-center w-full">
                  <span className="absolute -left-1 text-[9px] font-bold text-brand-text-muted/60 -translate-x-full">
                    {level}%
                  </span>
                  <div className="w-full border-t border-brand-green/5 border-dashed" />
                </div>
              ))}
            </div>

            {/* Bars Column Wrapper */}
            <div className="flex-grow flex items-end justify-around px-8 h-[140px] relative z-10">
              {daily.map((d, i) => {
                const heightPercent = `${d.rainProb}%`;
                return (
                  <div key={i} className="flex flex-col items-center gap-2 group w-8">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -translate-y-8 bg-brand-green-deep text-white text-[10px] font-black px-2 py-0.5 rounded shadow-md pointer-events-none transition-opacity duration-200">
                      {d.rainProb}%
                    </div>

                    {/* Bar */}
                    <div className="w-full bg-brand-green-light rounded-t-md overflow-hidden h-[120px] flex items-end border border-brand-green/5">
                      <div
                        className="w-full bg-gradient-to-t from-brand-green to-[#63b3ed] rounded-t-sm transition-all duration-500 ease-out"
                        style={{ height: heightPercent }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-Axis labels */}
            <div className="flex justify-around px-8 border-t border-brand-green/10 pt-2 relative z-10">
              {daily.map((d, i) => (
                <span key={i} className="text-[10px] font-black text-brand-text-muted uppercase w-8 text-center">
                  {d.day.substring(0, 3)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RainChart;
