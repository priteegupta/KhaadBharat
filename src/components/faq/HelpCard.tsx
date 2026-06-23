import React from "react";

interface HelpCardProps {
  title: string;
  description: string;
  badge?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "green" | "brown" | "amber" | "light";
  children?: React.ReactNode;
}

export const HelpCard: React.FC<HelpCardProps> = ({
  title,
  description,
  badge,
  icon,
  onClick,
  className = "",
  variant = "light",
  children,
}) => {
  const variantStyles = {
    green: "border-brand-green/20 bg-gradient-to-br from-brand-green-light/30 to-white hover:border-brand-green/40 shadow-sm",
    brown: "border-brand-brown/20 bg-gradient-to-br from-brand-brown-soft/10 to-white hover:border-brand-brown/40 shadow-sm",
    amber: "border-brand-brown-warm/20 bg-gradient-to-br from-brand-accent-soft to-white hover:border-brand-brown-warm/40 shadow-sm",
    light: "border-brand-green/10 bg-white hover:border-brand-green/30 shadow-sm",
  };

  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-3xl border transition-all duration-300 ${
        onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-premium-hover" : ""
      } ${variantStyles[variant]} ${className}`}
    >
      {badge && (
        <span className="inline-block px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-green bg-brand-green-light rounded-full mb-3">
          {badge}
        </span>
      )}
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex items-center justify-center p-3 rounded-2xl bg-white border border-brand-green/10 text-brand-green shrink-0 shadow-sm">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-black text-brand-green-deep leading-snug">
            {title}
          </h3>
          <p className="mt-2 text-xs font-semibold leading-relaxed text-brand-text-muted">
            {description}
          </p>
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default HelpCard;
