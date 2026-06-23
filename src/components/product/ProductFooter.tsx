import React from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck } from "lucide-react";

export const ProductFooter: React.FC = () => {
  const { t } = useTranslation("product");

  return (
    <footer className="py-8 mt-8 border-t border-brand-green/10 text-center">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-black text-brand-green uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          <span>{t("certifiedInput", { defaultValue: "JSL Enterprises Certified Input" })}</span>
        </div>
        
        <p className="text-[10px] font-semibold text-brand-text-muted leading-relaxed max-w-2xl">
          {t("footer.disclaimer")}
        </p>
      </div>
    </footer>
  );
};

export default ProductFooter;
