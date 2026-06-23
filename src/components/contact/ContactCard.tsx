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
      className="flex flex-col items-start p-6 rounded-3xl bg-white border border-brand-green/10 shadow-sm hover:shadow-premium hover:border-brand-green/35 transition-all duration-300 group"
      whileHover={{ y: -6 }}
    >
      <div className="w-12 h-12 rounded-2xl bg-brand-green-light flex items-center justify-center text-brand-green-deep mb-5 group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="text-lg font-extrabold text-brand-green-deep tracking-tight mb-2">
        {title}
      </h3>

      <p className="text-xs text-brand-text-muted font-bold leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      <button
        onClick={onClick}
        className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs font-black text-brand-green-deep bg-brand-green-light hover:bg-brand-green hover:text-white transition-all duration-200"
      >
        {buttonText}
      </button>
    </motion.div>
  );
};

export default ContactCard;
