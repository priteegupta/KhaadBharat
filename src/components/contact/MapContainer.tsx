import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Globe2 } from "lucide-react";

export const MapContainer: React.FC = () => {
  const { t } = useTranslation("contact");

  return (
    <div className="bg-white border border-brand-green/10 rounded-3xl p-6 md:p-8 mb-12 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1.5 text-[10px] md:text-xs font-black tracking-widest text-brand-green uppercase bg-brand-green/10 rounded-full mb-3 border border-brand-green/15 shadow-sm">
          {t("map.badge")}
        </span>
        <h3 className="text-xl md:text-2xl font-extrabold text-brand-green-deep tracking-tight">
          {t("map.title")}
        </h3>
        <p className="text-xs md:text-sm text-brand-text-muted font-bold mt-1">
          {t("map.subtitle")}
        </p>
      </div>

      {/* Map visual frame */}
      <div className="relative w-full h-80 rounded-2xl bg-brand-green-light/30 border border-brand-green/15 overflow-hidden flex flex-col items-center justify-center text-center p-6 shadow-inner group">
        {/* Subtle grid styling to simulate a map */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(92,127,47,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(92,127,47,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Dynamic logistics supply path overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-45 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <style>{`
            @keyframes supplyDash {
              to {
                stroke-dashoffset: -40;
              }
            }
            .route-line {
              stroke: #2c5234;
              stroke-width: 2.2;
              stroke-dasharray: 8 5;
              animation: supplyDash 6s linear infinite;
            }
          `}</style>
          {/* Logistics routes from HQ (Delhi) to Regional dealer hubs */}
          <path d="M 300,120 Q 260,95 220,80" className="route-line" />
          <path d="M 300,120 Q 340,130 380,140" className="route-line" />
          <path d="M 300,120 Q 380,135 460,150" className="route-line" />
          <path d="M 300,120 Q 270,180 240,240" className="route-line" />

          {/* Regional hubs nodes */}
          <circle cx="220" cy="80" r="4.5" fill="#2c5234" />
          <circle cx="220" cy="80" r="9" fill="none" stroke="#2c5234" strokeWidth="1" className="animate-ping" style={{ animationDuration: "3s" }} />

          <circle cx="380" cy="140" r="4" fill="#2c5234" />

          <circle cx="460" cy="150" r="4.5" fill="#2c5234" />
          <circle cx="460" cy="150" r="9" fill="none" stroke="#2c5234" strokeWidth="1" className="animate-ping" style={{ animationDuration: "3.5s" }} />

          <circle cx="240" cy="240" r="4" fill="#2c5234" />
          <circle cx="240" cy="240" r="8" fill="none" stroke="#2c5234" strokeWidth="1" className="animate-ping" style={{ animationDuration: "4s" }} />
        </svg>

        {/* Pulsing Pin */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center mb-3">
            <span className="absolute w-12 h-12 rounded-full bg-brand-green/20 animate-ping" />
            <div className="w-12 h-12 rounded-full bg-brand-green-deep border-2 border-white flex items-center justify-center text-white shadow-md transition-transform duration-350 group-hover:scale-110">
              <MapPin className="w-6 h-6 animate-bounce" />
            </div>
          </div>
          <h4 className="text-sm font-black text-brand-green-deep mb-1 uppercase tracking-wider">
            {t("map.placeholder")}
          </h4>
          <p className="text-[11px] font-bold text-brand-text max-w-sm mb-4 leading-relaxed">
            {t("map.addressText")}
          </p>

          <button
            onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(t("map.addressText"))}`, "_blank")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-black text-brand-green-deep bg-white border border-brand-green/20 hover:bg-brand-green-light hover:border-brand-green/45 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Globe2 className="w-3.5 h-3.5" />
            {t("map.ctaGoogleMaps")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
