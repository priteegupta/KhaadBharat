import React from "react";
import { Leaf, Wrench, Sprout, Trees } from "lucide-react";

interface SubsidyCardData {
  title: string;
  amount: string;
  description: string;
  type: string;
}

interface SubsidyCardProps {
  card: SubsidyCardData;
}

export const SubsidyCard: React.FC<SubsidyCardProps> = ({ card }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "fertilizer":
        return <Leaf className="w-8 h-8 text-brand-green" />;
      case "equipment":
        return <Wrench className="w-8 h-8 text-brand-green" />;
      case "seeds":
        return <Sprout className="w-8 h-8 text-brand-green" />;
      case "eco":
        return <Trees className="w-8 h-8 text-brand-green" />;
      default:
        return <Sprout className="w-8 h-8 text-brand-green" />;
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-brand-green/10 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex items-start gap-4 group">
      {/* Icon Frame */}
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-beige border border-brand-brown/10 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
        {getIcon(card.type)}
      </div>

      {/* Text Copy */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-baseline gap-2">
          <h4 className="text-sm font-black text-brand-green-deep uppercase tracking-wider">
            {card.title}
          </h4>
          <span className="text-xs font-black text-brand-brown-warm bg-brand-brown-soft/10 px-2 py-0.5 rounded-md border border-brand-brown-warm/15">
            {card.amount}
          </span>
        </div>
        <p className="text-xs text-brand-text-muted leading-relaxed font-bold">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default SubsidyCard;
