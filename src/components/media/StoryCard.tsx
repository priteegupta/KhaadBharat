import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Sprout, HeartPulse } from "lucide-react";

interface StoryData {
  id: string;
  name: string;
  location: string;
  crop: string;
  impact: string;
  summary: string;
  story: string;
  image: string;
}

interface StoryCardProps {
  story: StoryData;
  onOpenModal: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onOpenModal }) => {
  const { t } = useTranslation();

  return (
    <article
      onClick={onOpenModal}
      className="group cursor-pointer rounded-3xl bg-white border border-brand-green/10 p-5 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
    >
      <div className="flex flex-col gap-4">
        {/* Portrait / Visual */}
        <div className="relative aspect-[4/3] w-full bg-brand-green-light rounded-2xl overflow-hidden">
          <img
            src={story.image}
            alt={story.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green-deep/30 to-transparent pointer-events-none" />

          {/* Location Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full bg-brand-beige-panel/90 border border-brand-green/10 text-brand-green-deep text-[11px] font-black shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-brand-green" />
            {story.location}
          </div>
        </div>

        {/* Farmer Name & Summary */}
        <div>
          <h3 className="text-lg font-black text-brand-green-deep mb-1 group-hover:text-brand-green transition-colors">
            {story.name}
          </h3>
          <p className="text-sm font-bold text-brand-brown-warm mb-3 line-clamp-1">
            {story.summary}
          </p>
        </div>

        {/* Badges and Attributes */}
        <div className="flex flex-col gap-2.5 border-t border-brand-green/5 pt-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-text">
            <Sprout className="w-4 h-4 text-brand-green flex-shrink-0" />
            <span className="font-extrabold text-brand-text-muted mr-1">{t("media.stories.cropLabel")}:</span>
            {story.crop}
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-text">
            <HeartPulse className="w-4 h-4 text-brand-brown-warm flex-shrink-0" />
            <span className="font-extrabold text-brand-text-muted mr-1">{t("media.stories.impactLabel")}:</span>
            <span className="text-brand-green-deep font-bold">{story.impact}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-brand-green/5">
        <span className="text-xs font-black text-brand-green group-hover:text-brand-green-deep flex items-center gap-1">
          {t("media.stories.viewStory")} →
        </span>
      </div>
    </article>
  );
};

export default StoryCard;
