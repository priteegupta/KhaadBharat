import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface BenefitCardProps {
  title: string;
  description: string;
  iconName: string;
  index: number;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, iconName, index }) => {
  // Dynamically resolve lucide icons
  const LucideIcon = (Icons as any)[iconName] || Icons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="flex flex-col items-start p-6 sm:p-8 bg-white border border-brand-green/10 hover:border-brand-green/30 rounded-3xl shadow-premium hover:shadow-premium-hover transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-2xl bg-brand-green-light border border-brand-green/20 flex items-center justify-center text-brand-green mb-6">
        <LucideIcon className="w-6 h-6" />
      </div>
      
      <h3 className="text-xl font-black text-brand-green-deep mb-3">
        {title}
      </h3>
      
      <p className="text-sm font-semibold text-brand-text-muted leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default BenefitCard;
