import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Globe2 } from "lucide-react";

export const MapContainer: React.FC = () => {
  const { t } = useTranslation("contact");

  return (
    <div className="bg-white border border-brand-green/10 rounded-3xl p-6 md:p-8 mb-12 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 text-[10px] md:text-xs font-black tracking-widest text-brand-green uppercase bg-brand-green/10 rounded-full mb-3">
          LOCATION MAP
        </span>
        <h3 className="text-xl md:text-2xl font-extrabold text-brand-green-deep tracking-tight">
          {t("map.title")}
        </h3>
        <p className="text-xs md:text-sm text-brand-text-muted font-bold mt-1">
          {t("map.subtitle")}
        </p>
      </div>

      {/* Map visual frame */}
      <div className="relative w-full h-80 rounded-2xl bg-brand-green-light/40 border border-brand-green/20 overflow-hidden flex flex-col items-center justify-center text-center p-6 shadow-sm group">
        {/* Subtle grid styling to simulate a map */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(92,127,47,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(92,127,47,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Abstract road pathways to simulate maps */}
        <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none text-brand-green/30" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 L200,90 Q250,120 300,100 T500,160 L800,200" fill="none" stroke="currentColor" strokeWidth="8" />
          <path d="M100,0 L120,320" fill="none" stroke="currentColor" strokeWidth="6" />
          <path d="M400,0 Q380,150 420,320" fill="none" stroke="currentColor" strokeWidth="8" />
          <path d="M0,220 C200,250 300,200 800,240" fill="none" stroke="currentColor" strokeWidth="6" />
        </svg>

        {/* Pulsing Pin */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center mb-3">
            <span className="absolute w-12 h-12 rounded-full bg-brand-green/20 animate-ping" />
            <div className="w-12 h-12 rounded-full bg-brand-green-deep border-2 border-white flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110">
              <MapPin className="w-6 h-6" />
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
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black text-brand-green-deep bg-white border border-brand-green/20 hover:bg-brand-green-light hover:border-brand-green/45 shadow-sm transition-all duration-200"
          >
            <Globe2 className="w-3.5 h-3.5" />
            Open in Google Maps
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
