import React from "react";
import { useTranslation } from "react-i18next";
import { Newspaper, Calendar, ExternalLink } from "lucide-react";

interface PressData {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  url: string;
}

interface PressCardProps {
  press: PressData;
}

export const PressCard: React.FC<PressCardProps> = ({ press }) => {
  const { t } = useTranslation();

  return (
    <article className="group rounded-3xl bg-white border border-brand-green/10 p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4">
        {/* Date & Source Header */}
        <div className="flex items-center justify-between border-b border-brand-green/5 pb-3">
          <div className="flex items-center gap-1.5 text-brand-text-muted text-xs font-bold">
            <Calendar className="w-3.5 h-3.5 text-brand-green" />
            {press.date}
          </div>
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green-deep text-[10px] font-black uppercase">
            <Newspaper className="w-3 h-3" />
            {press.source}
          </span>
        </div>

        {/* Copy */}
        <div>
          <h3 className="text-lg font-black text-brand-green-deep mb-2 line-clamp-2 group-hover:text-brand-green transition-colors">
            {press.title}
          </h3>
          <p className="text-sm text-brand-text-muted leading-relaxed font-semibold line-clamp-3">
            {press.summary}
          </p>
        </div>
      </div>

      {/* Action link */}
      <div className="mt-6 pt-3">
        <a
          href={press.url}
          className="inline-flex items-center gap-1 text-sm font-black text-brand-green hover:text-brand-green-deep transition-colors"
        >
          {t("media.press.readMore")}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
};

export default PressCard;
