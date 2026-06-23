import React from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  centered = false,
}) => {
  return (
    <div className={`mb-8 ${centered ? "text-center max-w-2xl mx-auto" : "max-w-3xl"}`}>
      <span className="inline-block px-3 py-1 text-xs font-extrabold tracking-widest text-brand-brown uppercase bg-brand-brown-warm/10 rounded-full mb-3">
        {eyebrow}
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-green-deep tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base sm:text-lg text-brand-text-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
