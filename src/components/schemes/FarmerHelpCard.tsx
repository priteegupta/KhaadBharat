import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Building, PhoneCall, Bot, MessageSquare } from "lucide-react";

export const FarmerHelpCard: React.FC = () => {
  const { t } = useTranslation("schemes");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* Block Office Card */}
      <div className="p-6 rounded-3xl bg-white border border-brand-green/10 shadow-premium flex flex-col gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-beige border border-brand-brown/10 text-brand-green">
          <Building className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-1.5 flex-grow">
          <h3 className="text-lg font-black text-brand-green-deep">
            {t("helpDesk.contactTitle")}
          </h3>
          <p className="text-xs text-brand-text-muted leading-relaxed font-bold">
            {t("helpDesk.contactDesc")}
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black text-brand-green bg-brand-green-light hover:bg-brand-green/10 border border-brand-green/10 transition-colors"
        >
          {t("helpDesk.buttonText")}
        </Link>
      </div>

      {/* Toll-Free Call Centre */}
      <div className="p-6 rounded-3xl bg-white border border-brand-green/10 shadow-premium flex flex-col gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-beige border border-brand-brown/10 text-brand-green">
          <PhoneCall className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-1.5 flex-grow">
          <h3 className="text-lg font-black text-brand-green-deep">
            {t("helpDesk.phoneTitle")}
          </h3>
          <p className="text-xs text-brand-text-muted leading-relaxed font-bold">
            {t("helpDesk.phoneDesc")}
          </p>
        </div>
        <a
          href="tel:18001801551"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black text-white bg-brand-green hover:bg-brand-green-deep transition-colors"
        >
          {t("helpDesk.callText")}
        </a>
      </div>

      {/* Chatbot Placeholder */}
      <div className="p-6 rounded-3xl bg-white border border-brand-green/10 shadow-premium flex flex-col gap-4 relative overflow-hidden">
        {/* Coming soon badge */}
        <span className="absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-brand-accent-sunlight text-brand-green-deep">
          {t("helpDesk.soonBadge")}
        </span>

        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-beige border border-brand-brown/10 text-brand-green">
          <Bot className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-1.5 flex-grow">
          <h3 className="text-lg font-black text-brand-green-deep">
            {t("helpDesk.chatTitle")}
          </h3>
          <p className="text-xs text-brand-text-muted leading-relaxed font-bold">
            {t("helpDesk.chatPlaceholder")}
          </p>
        </div>
        <button
          disabled
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black text-brand-text-muted bg-brand-beige-cream border border-brand-green/5 cursor-not-allowed"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          {t("helpDesk.smsAlerts")}
        </button>
      </div>
    </div>
  );
};

export default FarmerHelpCard;
