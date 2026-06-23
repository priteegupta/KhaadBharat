import React from "react";
import { ArrowRight } from "lucide-react";

interface FAQCTAProps {
  title: string;
  btnProduct: string;
  btnContact: string;
  onProductClick: () => void;
  onContactClick: () => void;
}

export const FAQCTA: React.FC<FAQCTAProps> = ({
  title,
  btnProduct,
  btnContact,
  onProductClick,
  onContactClick,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-brand-green-deep text-white p-8 md:p-12 text-center shadow-premium">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-accent-sunlight/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-brand-green/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
          {title}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 mt-2 w-full sm:w-auto">
          <button
            onClick={onProductClick}
            className="px-6 py-3.5 rounded-full text-xs font-black bg-brand-accent-sunlight text-brand-green-deep hover:bg-brand-accent-sunlight/90 transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto shadow-md"
          >
            {btnProduct}
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onContactClick}
            className="px-6 py-3.5 rounded-full text-xs font-black bg-white/10 hover:bg-white/20 border border-white/25 text-white transition-all w-full sm:w-auto text-center"
          >
            {btnContact}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQCTA;
