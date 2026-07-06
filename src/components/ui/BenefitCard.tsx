import React, { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Sprout, TrendingDown, Sun, HelpCircle } from "lucide-react";

interface BenefitCardProps {
  title: string;
  description: string;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({ title, description }) => {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    const rotateX = -(y / (box.height / 2)) * 8;
    const rotateY = (x / (box.width / 2)) * 8;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.05s ease-out",
      willChange: "transform",
      boxShadow: "0 15px 30px rgba(16, 32, 12, 0.1)"
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
    });
  };

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="p-6 rounded-2xl bg-white border border-brand-green/10 shadow-premium hover:border-brand-green/30 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group text-left select-none"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <motion.div
        className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-green-light flex-shrink-0 relative z-10"
      >
        {getIcon(title)}
      </motion.div>
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-brand-green-deep leading-tight mb-2">{title}</h3>
        <p className="text-sm text-brand-text-muted leading-relaxed">{description}</p>
      </div>
    </motion.article>
  );
};

export default BenefitCard;
