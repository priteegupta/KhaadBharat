import React from "react";
import { Play } from "lucide-react";

interface VideoPreviewCardProps {
  title: string;
  badge?: string;
  note: string;
}

export const VideoPreviewCard: React.FC<VideoPreviewCardProps> = ({
  title,
  badge = "Video Ready",
  note,
}) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl bg-brand-green-deep border border-brand-green/20 shadow-premium min-h-[250px] flex flex-col justify-end p-6">
      {/* Background Poster Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
        src="/images/video-poster.svg"
        alt={title}
      />

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-green-deep via-brand-green-deep/40 to-transparent opacity-90" />

      {/* Interactive Play Button & Content Overlay */}
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-accent-sunlight text-brand-green-deep font-black shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
          <span className="px-3 py-1 text-xs font-black text-brand-green-deep bg-brand-accent-sunlight rounded-full uppercase tracking-wider">
            {badge}
          </span>
        </div>

        <div>
          <h3 className="text-base font-extrabold text-white leading-tight group-hover:text-brand-accent-sunlight transition-colors">
            {title}
          </h3>
          <p className="text-xs text-white/80 mt-1.5 leading-relaxed font-semibold">
            {note}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPreviewCard;
