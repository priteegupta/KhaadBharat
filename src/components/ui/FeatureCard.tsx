import React from "react";
import { Check } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description?: string;
  index?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, index }) => {
  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-white border border-brand-green/10 shadow-sm hover:shadow-md hover:border-brand-green/20 transition-all duration-300">
      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-brand-green-light text-brand-green">
        {index !== undefined ? (
          <span className="text-xs font-bold">{index + 1}</span>
        ) : (
          <Check className="w-4 h-4" />
        )}
      </div>
      <div>
        <h4 className="text-base font-bold text-brand-green-deep leading-snug">{title}</h4>
        {description && <p className="mt-1 text-sm text-brand-text-muted">{description}</p>}
      </div>
    </div>
  );
};

export default FeatureCard;
