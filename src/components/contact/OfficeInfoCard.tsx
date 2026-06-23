import React from "react";
import { useTranslation } from "react-i18next";
import { Building2, PhoneCall, Mail, Clock, LucideIcon } from "lucide-react";

interface OfficeInfoItem {
  key: string;
  icon: LucideIcon;
  renderDetails: (t: any) => React.ReactNode;
}

export const OfficeInfoCard: React.FC = () => {
  const { t } = useTranslation("contact");

  const officeItems: OfficeInfoItem[] = [
    {
      key: "corporate",
      icon: Building2,
      renderDetails: (t) => (
        <div className="flex flex-col gap-1 text-[11px] font-bold text-brand-text-muted mt-1 leading-relaxed">
          <p>{t("office.corporate.address")}</p>
          <p className="text-brand-green">{t("office.corporate.contact")}</p>
        </div>
      ),
    },
    {
      key: "support",
      icon: PhoneCall,
      renderDetails: (t) => (
        <div className="flex flex-col gap-1 text-[11px] font-bold text-brand-text-muted mt-1 leading-relaxed">
          <p className="text-base text-brand-green-deep font-extrabold">{t("office.support.phone")}</p>
          <p>{t("office.support.hours")}</p>
        </div>
      ),
    },
    {
      key: "business",
      icon: Mail,
      renderDetails: (t) => (
        <div className="flex flex-col gap-1 text-[11px] font-bold text-brand-text-muted mt-1 leading-relaxed">
          <p className="text-brand-green">{t("office.business.email")}</p>
          <p>{t("office.business.hours")}</p>
        </div>
      ),
    },
    {
      key: "hours",
      icon: Clock,
      renderDetails: (t) => (
        <div className="flex flex-col gap-1 text-[11px] font-bold text-brand-text-muted mt-1 leading-relaxed">
          <p>{t("office.hours.days")}</p>
          <p>{t("office.hours.timings")}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white border border-brand-green/10 rounded-3xl p-6 md:p-8 mb-12 shadow-sm">
      {/* Title */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 text-[10px] md:text-xs font-black tracking-widest text-brand-green uppercase bg-brand-green/10 rounded-full mb-3">
          OFFICE CHANNELS
        </span>
        <h3 className="text-xl md:text-2xl font-extrabold text-brand-green-deep tracking-tight">
          {t("office.title")}
        </h3>
        <p className="text-xs md:text-sm text-brand-text-muted font-bold mt-1">
          {t("office.subtitle")}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {officeItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className="p-5 rounded-2xl bg-brand-beige-cream/10 border border-brand-green/5 flex flex-col items-start hover:border-brand-green/15 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-green-light flex items-center justify-center text-brand-green-deep mb-4 shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-black text-brand-green-deep uppercase tracking-wider pl-0.5">
                {t(`office.${item.key}.title`)}
              </h4>
              <div className="w-full mt-2 border-t border-brand-green/5 pt-2">
                {item.renderDetails(t)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OfficeInfoCard;
