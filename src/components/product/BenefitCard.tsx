import React, { useState } from "react";
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
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="flex flex-col items-start p-6 sm:p-8 bg-white border border-brand-green/10 hover:border-brand-green/30 rounded-3xl shadow-premium transition-all duration-300 select-none"
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
