import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown, HelpCircle } from "lucide-react";

interface SchemeHeroProps {
  onExploreClick: () => void;
  onEligibilityClick: () => void;
}

export const SchemeHero: React.FC<SchemeHeroProps> = ({
  onExploreClick,
  onEligibilityClick,
}) => {
  const { t } = useTranslation("schemes");

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green-deep/90 via-brand-green-deep to-brand-green/90 text-white p-8 md:p-12 lg:p-16 shadow-premium border border-brand-green/20">
      {/* Background Organic Patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leafGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0 Q25 10 20 20 Q15 10 20 0 Z" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leafGrid)" />
        </svg>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side */}
        <motion.div
          className="lg:col-span-7 flex flex-col gap-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-accent-sunlight/20 text-brand-accent-sunlight border border-brand-accent-sunlight/30">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-brand-beige-cream">
            {t("hero.title")}
          </h1>

          <p className="text-lg md:text-xl font-medium text-brand-beige/90 leading-relaxed max-w-2xl">
            {t("hero.subtitle")}
          </p>

          <p className="text-sm md:text-base text-brand-beige/80 leading-relaxed max-w-xl font-semibold">
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold text-brand-green-deep bg-brand-accent-sunlight hover:bg-brand-accent-sunlight/90 shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              {t("hero.exploreBtn")}
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
            <button
              onClick={onEligibilityClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              {t("hero.checkEligibilityBtn")}
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="w-full max-w-sm relative">
            {/* Animated Glow in the background */}
            <div className="absolute -inset-1 rounded-full bg-brand-accent-sunlight/20 blur-xl opacity-75 animate-pulse" />

            <svg
              viewBox="0 0 400 400"
              className="w-full h-auto drop-shadow-2xl relative z-10 filter saturate-110"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2c3e21" />
                  <stop offset="100%" stopColor="#385629" />
                </linearGradient>
                <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffe699" />
                  <stop offset="100%" stopColor="#cd8a1d" />
                </linearGradient>
                <linearGradient id="hillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5c7f2f" />
                  <stop offset="100%" stopColor="#1f2f1b" />
                </linearGradient>
              </defs>

              {/* Background Frame */}
              <circle cx="200" cy="200" r="180" fill="url(#skyGrad)" stroke="#5c7f2f" strokeWidth="4" />

              {/* Sun with pulsing ray effects */}
              <motion.circle
                cx="200"
                cy="140"
                r="45"
                fill="url(#sunGrad)"
                animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />

              {/* Rays */}
              <circle cx="200" cy="140" r="60" fill="none" stroke="#ffe699" strokeWidth="1" strokeDasharray="5, 10" className="opacity-40 animate-spin" style={{ transformOrigin: '200px 140px', animationDuration: '40s' }} />

              {/* Fields / Hills */}
              <path d="M50 300 C 120 250, 180 270, 240 240 C 300 210, 350 240, 350 240 L 350 380 L 50 380 Z" fill="url(#hillGrad)" opacity="0.85" />
              <path d="M50 330 C 130 300, 210 280, 280 310 C 320 320, 350 310, 350 310 L 350 380 L 50 380 Z" fill="#2d421e" />

              {/* Leaf / Biochar Carbon Structure */}
              <motion.g
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}
              >
                {/* Plants / Leaves */}
                <path d="M120 280 C 120 230, 150 210, 170 230 C 150 250, 130 260, 120 280 Z" fill="#d7f06b" />
                <path d="M120 280 C 110 240, 90 220, 80 240 C 95 255, 110 265, 120 280 Z" fill="#88b43c" />
                <line x1="120" y1="280" x2="120" y2="330" stroke="#385629" strokeWidth="4" strokeLinecap="round" />

                <path d="M280 270 C 280 220, 250 200, 230 220 C 250 240, 270 250, 280 270 Z" fill="#d7f06b" />
                <path d="M280 270 C 290 230, 310 210, 320 230 C 305 245, 290 255, 280 270 Z" fill="#88b43c" />
                <line x1="280" y1="270" x2="280" y2="335" stroke="#385629" strokeWidth="4" strokeLinecap="round" />
              </motion.g>

              {/* Water conservation drops */}
              <motion.g
                animate={{
                  y: [0, 40, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut"
                }}
              >
                <path d="M200 180 C 200 180, 195 190, 195 195 C 195 198, 197 200, 200 200 C 203 200, 205 198, 205 195 C 205 190, 200 180, 200 180 Z" fill="#a5f3fc" />
                <path d="M230 160 C 230 160, 225 170, 225 175 C 225 178, 227 180, 230 180 C 233 180, 235 178, 235 175 C 235 170, 230 160, 230 160 Z" fill="#a5f3fc" />
              </motion.g>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SchemeHero;
