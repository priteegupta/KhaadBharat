import React from "react";
import { motion } from "framer-motion";

interface UsageStepCardProps {
  stepNumber: number;
  title: string;
  desc: string;
}

export const UsageStepCard: React.FC<UsageStepCardProps> = ({ stepNumber, title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.4, delay: stepNumber * 0.08 }}
      className="relative flex flex-col items-start p-6 bg-white border border-brand-green/10 rounded-3xl shadow-sm hover:shadow-premium hover:border-brand-green/30 transition-all duration-300 text-left group overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-green/20 to-brand-green/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      <span className="text-4xl font-black text-brand-green/20 mb-4 block group-hover:text-brand-green/45 transition-colors">
        {String(stepNumber).padStart(2, "0")}
      </span>

      <h3 className="text-lg font-black text-brand-green-deep mb-2 group-hover:text-brand-green transition-colors">
        {title}
      </h3>

      <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
};

export default UsageStepCard;
