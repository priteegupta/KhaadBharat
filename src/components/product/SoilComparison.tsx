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
          
          <div className="p-6 rounded-2xl bg-brand-green-light border border-brand-green/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-green flex-shrink-0">
              <Droplets className="w-5 h-5" />
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
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <h3 className="text-lg font-black text-red-800">{weakTitle}</h3>
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
            className="p-6 sm:p-8 bg-brand-green-light/30 border border-brand-green/20 rounded-3xl text-left shadow-premium"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-brand-green flex-shrink-0" />
              <h3 className="text-lg font-black text-brand-green-deep">{improvedTitle}</h3>
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
