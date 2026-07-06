import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle, Flame, Droplets } from "lucide-react";

interface SoilComparisonProps {
  title: string;
  subtitle: string;
  text: string;
  weakTitle: string;
  weakPoints: string[];
  improvedTitle: string;
  improvedPoints: string[];
  spongeTitle?: string;
  spongeDesc?: string;
}

export const SoilComparison: React.FC<SoilComparisonProps> = ({
  title,
  subtitle,
  text,
  weakTitle,
  weakPoints,
  improvedTitle,
  improvedPoints,
  spongeTitle = "Microscopic Sponge Effect",
  spongeDesc = "Biochar pores house water permanently in root zones."
}) => {
  return (
    <section className="py-16 border-t border-brand-green/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left copy column */}
        <div className="lg:col-span-5 text-left">
          <p className="text-xs font-black text-brand-brown-warm uppercase tracking-wider mb-2">
            {subtitle}
          </p>
          <h2 className="text-3xl font-black text-brand-green-deep mb-6">
            {title}
          </h2>
          <p className="text-sm font-semibold text-brand-text-muted leading-relaxed mb-8">
            {text}
          </p>

          <div className="p-6 rounded-2xl bg-brand-green-light border border-brand-green/10 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden group">
            {/* Sponge / pore micro animation */}
            <div className="w-16 h-16 rounded-xl bg-white border border-brand-green/20 flex-shrink-0 flex items-center justify-center relative overflow-hidden shadow-inner">
              <svg className="w-full h-full text-brand-green" viewBox="0 0 100 100">
                <style>{`
                  @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                  .rot-slow {
                    transform-origin: 50px 50px;
                    animation: spinSlow 15s linear infinite;
                  }
                `}</style>
                {/* Microscopic honeycomb pores */}
                <circle cx="50" cy="50" r="32" fill="none" stroke="#2c5234" strokeWidth="2" strokeDasharray="6 3" className="rot-slow" />
                <circle cx="50" cy="50" r="18" fill="none" stroke="#2c5234" strokeWidth="1.5" strokeDasharray="4 2" />
                <circle cx="50" cy="50" r="6" fill="#2c5234" opacity="0.3" />

                {/* Absorbing water droplets */}
                <circle cx="50" cy="18" r="3" fill="#3b82f6" className="animate-pulse" />
                <circle cx="35" cy="45" r="3.5" fill="#3b82f6" />
                <circle cx="65" cy="52" r="2.5" fill="#3b82f6" />
                <circle cx="48" cy="62" r="3" fill="#3b82f6" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-black text-brand-green-deep mb-0.5">{spongeTitle}</h4>
              <p className="text-xs font-semibold text-brand-text-muted">{spongeDesc}</p>
            </div>
          </div>
        </div>

        {/* Right Comparison cards column */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Card 1: Weak Soil */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 bg-red-50/40 border border-red-200/50 rounded-3xl text-left"
          >
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <h3 className="text-lg font-black text-red-800">{weakTitle}</h3>
            </div>

            {/* Weak Soil Root SVG */}
            <div className="w-full h-32 rounded-2xl bg-orange-50/30 border border-orange-100/50 overflow-hidden mb-5 relative flex items-center justify-center shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 200 100">
                {/* Cracked soil lines */}
                <path d="M10,80 L60,82 L100,78 L140,83 L190,81" fill="none" stroke="#d97706" strokeWidth="2" opacity="0.6" />
                <path d="M60,82 L65,95 M140,83 L135,95" fill="none" stroke="#d97706" strokeWidth="1.2" opacity="0.5" />

                {/* Weak plant */}
                <path d="M100,78 Q98,55 95,42" fill="none" stroke="#a16207" strokeWidth="2" />
                <path d="M95,42 Q82,34 86,29 Q92,32 95,42" fill="#ca8a04" />
                <path d="M97,52 Q108,46 104,42 Q99,44 97,52" fill="#eab308" />

                {/* Shallow roots */}
                <path d="M100,78 Q92,86 88,94" fill="none" stroke="#d97706" strokeWidth="1" />
                <path d="M100,78 Q104,84 108,90" fill="none" stroke="#d97706" strokeWidth="0.8" />
              </svg>
            </div>

            <ul className="flex flex-col gap-4">
              {weakPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs font-bold text-red-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 2: Improved Soil */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 bg-brand-green-light/30 border border-brand-green/20 rounded-3xl text-left shadow-premium animate-pulse-slow"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-brand-green flex-shrink-0" />
              <h3 className="text-lg font-black text-brand-green-deep">{improvedTitle}</h3>
            </div>

            {/* Improved Soil Root SVG */}
            <div className="w-full h-32 rounded-2xl bg-brand-green-light/50 border border-brand-green/25 overflow-hidden mb-5 relative flex items-center justify-center shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 200 100">
                {/* Rich dark soil layer */}
                <rect x="0" y="75" width="200" height="25" fill="#3f2e1e" opacity="0.3" />
                {/* Spongy Biochar pores */}
                <circle cx="45" cy="85" r="4" fill="#1b2e15" opacity="0.6" />
                <circle cx="92" cy="90" r="5" fill="#1b2e15" opacity="0.6" />
                <circle cx="145" cy="84" r="4" fill="#1b2e15" opacity="0.6" />
                <circle cx="115" cy="80" r="3.5" fill="#1b2e15" opacity="0.6" />

                {/* Glowing water particles */}
                <circle cx="45" cy="85" r="1.5" fill="#3b82f6" />
                <circle cx="92" cy="90" r="1.5" fill="#3b82f6" />
                <circle cx="145" cy="84" r="1.5" fill="#3b82f6" />

                {/* Strong plant */}
                <path d="M100,75 Q101,45 102,24" fill="none" stroke="#16a34a" strokeWidth="3" />
                <path d="M102,24 Q82,12 88,8 Q95,12 102,24" fill="#22c55e" />
                <path d="M102,24 Q122,14 116,10 Q109,14 102,24" fill="#16a34a" />
                <path d="M101.5,42 Q85,32 90,28 Q96,32 101.5,42" fill="#22c55e" />

                {/* Deep root network */}
                <path d="M100,75 Q90,86 78,94" fill="none" stroke="#16a34a" strokeWidth="1.8" />
                <path d="M100,75 Q110,88 122,96" fill="none" stroke="#16a34a" strokeWidth="1.8" />
                <path d="M100,75 L101,98" fill="none" stroke="#15803d" strokeWidth="2.2" />
              </svg>
            </div>

            <ul className="flex flex-col gap-4">
              {improvedPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs font-bold text-brand-green-deep">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SoilComparison;
