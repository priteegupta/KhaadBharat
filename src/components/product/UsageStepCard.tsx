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
      transition={{ duration: 0.4, delay: stepNumber * 0.08 }}
      className="relative flex flex-col items-start p-6 bg-white border border-brand-green/10 rounded-3xl shadow-sm hover:shadow-premium transition-all duration-300 text-left"
    >
      <span className="text-4xl font-black text-brand-green/20 mb-4 block">
        {String(stepNumber).padStart(2, "0")}
      </span>
      
      <h3 className="text-lg font-black text-brand-green-deep mb-2">
        {title}
      </h3>
      
      <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
};

export default UsageStepCard;
