import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ContactCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  title,
  description,
  buttonText,
  icon: Icon,
  onClick,
}) => {
  return (
    <motion.div
      className="flex flex-col items-start p-6 rounded-3xl bg-white border border-brand-green/10 shadow-sm hover:shadow-premium hover:border-brand-green/30 transition-all duration-350 group cursor-pointer relative overflow-hidden"
      whileHover={{ y: -8, scale: 1.01 }}
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/5 rounded-bl-full transform translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-350" />
      
      <div className="w-12 h-12 rounded-2xl bg-brand-green-light flex items-center justify-center text-brand-green-deep mb-5 group-hover:bg-brand-green group-hover:text-white group-hover:rotate-6 transition-all duration-350 shadow-sm">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="text-lg font-extrabold text-brand-green-deep tracking-tight mb-2 group-hover:text-brand-green transition-colors duration-300">
        {title}
      </h3>

      <p className="text-xs text-brand-text-muted font-bold leading-relaxed mb-6 flex-grow relative z-10">
        {description}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="w-full inline-flex items-center justify-center px-4 py-3 rounded-full text-xs font-black text-brand-green-deep bg-brand-green-light hover:bg-brand-green hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-250 shadow-sm hover:shadow-md"
      >
        {buttonText}
      </button>
    </motion.div>
  );
};

export default ContactCard;
