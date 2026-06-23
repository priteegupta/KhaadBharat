import React from "react";
import HelpCard from "./HelpCard";
import { ShoppingBag, Sprout, Briefcase, Mail, PhoneCall } from "lucide-react";

interface SupportCardData {
  title: string;
  description: string;
}

interface SupportSectionProps {
  title: string;
  subtitle: string;
  btnConnect: string;
  btnContact: string;
  cards: SupportCardData[];
  onConnectClick: () => void;
  onContactClick: () => void;
}

export const SupportSection: React.FC<SupportSectionProps> = ({
  title,
  subtitle,
  btnConnect,
  btnContact,
  cards,
  onConnectClick,
  onContactClick,
}) => {
  const icons = [
    <ShoppingBag key="0" className="w-6 h-6 text-brand-green" />,
    <Sprout key="1" className="w-6 h-6 text-brand-green" />,
    <Briefcase key="2" className="w-6 h-6 text-brand-green" />,
  ];

  const variants: ("green" | "brown" | "amber")[] = ["green", "brown", "amber"];

  return (
    <div className="w-full flex flex-col gap-8 py-12 border-t border-brand-green/10">
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-black text-brand-green-deep tracking-tight">
          {title}
        </h2>
        <p className="text-sm font-semibold text-brand-text-muted">
          {subtitle}
        </p>
      </div>

      {/* Grid of HelpCards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full mt-4">
        {cards.map((card, idx) => (
          <HelpCard
            key={idx}
            title={card.title}
            description={card.description}
            icon={icons[idx] || icons[0]}
            variant={variants[idx] || "light"}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          onClick={onConnectClick}
          className="px-6 py-3.5 rounded-full text-xs font-black bg-brand-green text-white hover:bg-brand-green-deep hover:shadow-md transition-all flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          {btnConnect}
        </button>
        <button
          onClick={onContactClick}
          className="px-6 py-3.5 rounded-full text-xs font-black bg-white border border-brand-green/20 text-brand-text hover:bg-brand-green-light/40 transition-all flex items-center gap-2"
        >
          <PhoneCall className="w-4 h-4 text-brand-green" />
          {btnContact}
        </button>
      </div>
    </div>
  );
};

export default SupportSection;
