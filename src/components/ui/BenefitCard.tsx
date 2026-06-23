import React from "react";
import { motion } from "framer-motion";
import { Droplets, Sprout, TrendingDown, Sun, HelpCircle } from "lucide-react";

interface BenefitCardProps {
  title: string;
  description: string;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({ title, description }) => {
  // Determine appropriate icon based on title (checking both English & Hindi keywords)
  const getIcon = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("water") || lowerText.includes("पानी") || lowerText.includes("सिंचाई")) {
      return <Droplets className="w-6 h-6 text-brand-green" />;
    }
    if (lowerText.includes("soil") || lowerText.includes("मिट्टी") || lowerText.includes("सुधार")) {
      return <Sprout className="w-6 h-6 text-brand-green" />;
    }
    if (lowerText.includes("cost") || lowerText.includes("लागत") || lowerText.includes("बचत")) {
      return <TrendingDown className="w-6 h-6 text-brand-green" />;
    }
    if (lowerText.includes("season") || lowerText.includes("मौसम") || lowerText.includes("गर्मी") || lowerText.includes("सूखे")) {
      return <Sun className="w-6 h-6 text-brand-green" />;
    }
    return <HelpCircle className="w-6 h-6 text-brand-green" />;
  };

  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-6 rounded-2xl bg-white border border-brand-green/10 shadow-premium hover:shadow-premium-hover transition-shadow duration-300 flex flex-col gap-4"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-green-light flex-shrink-0">
        {getIcon(title)}
      </div>
      <div>
        <h3 className="text-lg font-bold text-brand-green-deep leading-tight mb-2">{title}</h3>
        <p className="text-sm text-brand-text-muted leading-relaxed">{description}</p>
      </div>
    </motion.article>
  );
};

export default BenefitCard;
