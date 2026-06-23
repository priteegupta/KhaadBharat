import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Search, Navigation, MapPin, Globe, Loader2 } from "lucide-react";
import { searchLocation, LocationSearchResult } from "../services/weatherApi";

interface LocationSelectorProps {
  onSelectLocation: (name: string, lat: number, lon: number) => void;
  currentLocationName: string;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onSelectLocation, currentLocationName }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);



  // Auto-trigger search when user types (debounced)
  useEffect(() => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      setGeoError(null);
      try {
        const results = await searchLocation(query);
        setSuggestions(results);
      } catch (err) {
        console.error("Geocoding query error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [query]);

  // GPS Auto-detect location
  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      setGeoError(t("weather.location.errorGeoDenied"));
      return;
    }

    setIsDetecting(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Trigger select location
        onSelectLocation("Detected Field", latitude, longitude);
        setIsDetecting(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setGeoError(t("weather.location.errorGeoDenied"));
        setIsDetecting(false);
      },
      { timeout: 8000 }
    );
  };

  const handleSelectSuggestion = (item: LocationSearchResult) => {
    onSelectLocation(`${item.name}${item.state ? `, ${item.state}` : ""}`, item.lat, item.lon);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
      {/* Search Input Box */}
      <div className="lg:col-span-8 flex flex-col gap-2 relative">
        <label htmlFor="weather-location-search" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1">
          {t("weather.location.searchPlaceholder", "Search Location")}
        </label>
        
        <div className="relative">
          <input
            id="weather-location-search"
            type="text"
            placeholder={t("weather.location.searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-full border border-brand-green/20 bg-white text-brand-text font-bold focus:outline-none focus:border-brand-green shadow-sm transition-all duration-200"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-green">
            {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </span>
        </div>

        {/* Suggestion Dropdown Panel */}
        {suggestions.length > 0 && (
          <div className="absolute top-[82px] left-0 right-0 z-40 bg-white border border-brand-green/10 rounded-2xl shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto">
            {suggestions.map((item, i) => (
              <button
                key={i}
                onClick={() => handleSelectSuggestion(item)}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-brand-green-light text-left text-sm font-extrabold text-brand-green-deep border-b border-brand-green/5 last:border-b-0 transition-colors"
              >
                <MapPin className="w-4 h-4 text-brand-green flex-shrink-0" />
                <span>
                  {item.name}
                  {item.state && <span className="text-xs text-brand-text-muted font-semibold">, {item.state}</span>}
                  {item.country && <span className="text-xs text-brand-text-muted font-bold"> ({item.country})</span>}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Info label */}
        <div className="flex items-center gap-2 pl-2 mt-1">
          <Globe className="w-3.5 h-3.5 text-brand-brown-warm" />
          <span className="text-xs text-brand-text-muted font-semibold">
            Active Field: <span className="font-extrabold text-brand-green-deep">{currentLocationName}</span>
          </span>
        </div>

        {geoError && (
          <p className="text-xs text-red-600 font-extrabold pl-2 mt-1">
            ⚠️ {geoError}
          </p>
        )}
      </div>

      {/* Geolocation Auto-Detect and Defaults */}
      <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
        {/* GPS Button */}
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-xs font-black text-brand-green uppercase tracking-wider hidden lg:inline pl-1">
            {t("weather.location.autoDetectBtn", "Auto Location")}
          </span>
          <button
            onClick={handleAutoDetect}
            disabled={isDetecting}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-extrabold text-white bg-brand-green hover:bg-brand-green-deep shadow hover:shadow-lg disabled:opacity-70 transition-all duration-300"
          >
            {isDetecting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("weather.location.detecting", "Detecting...")}
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 fill-white" />
                {t("weather.location.autoDetectBtn")}
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
};

export default LocationSelector;
