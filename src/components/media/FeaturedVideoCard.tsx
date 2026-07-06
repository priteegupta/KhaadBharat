import React, { useState } from "react";
import { Play, Clock, MonitorPlay } from "lucide-react";

interface VideoData {
  id: string;
  title: string;
  desc: string;
  duration: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
}

interface FeaturedVideoCardProps {
  video: VideoData;
  isFeatured?: boolean;
}

export const FeaturedVideoCard: React.FC<FeaturedVideoCardProps> = ({ video, isFeatured = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to extract embedded URL query parameters or auto-play
  const getEmbedUrl = (url: string) => {
    let videoId = "";
    try {
      if (url.includes("youtube.com/embed/")) {
        const parts = url.split("embed/");
        if (parts[1]) {
          videoId = parts[1].split("?")[0];
        }
      } else if (url.includes("youtube.com/watch?v=")) {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get("v") || "";
      } else if (url.includes("youtu.be/")) {
        const parts = url.split("youtu.be/");
        if (parts[1]) {
          videoId = parts[1].split("?")[0];
        }
      }
    } catch (e) {
      console.error("Error parsing video URL:", e);
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`;
    }
    return url;
  };

  return (
    <article
      className={`group rounded-3xl bg-white border border-brand-green/10 shadow-premium overflow-hidden transition-all duration-300 ${
        isFeatured
          ? "lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6"
          : "flex flex-col h-full"
      }`}
    >
      {/* Video Visual Container */}
      <div
        className={`relative bg-brand-green-light overflow-hidden rounded-2xl ${
          isFeatured ? "lg:col-span-7 aspect-video w-full" : "aspect-video w-full"
        }`}
      >
        {isPlaying ? (
          <iframe
            src={getEmbedUrl(video.videoUrl)}
            title={video.title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsPlaying(true)}>
            {/* Thumbnail */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-brand-green-deep/15 group-hover:bg-brand-green-deep/25 transition-colors duration-300" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-green-deep text-white shadow-lg group-hover:bg-brand-green group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(92,127,47,0.6)] transition-all duration-300 relative">
                <span className="absolute inset-0 rounded-full bg-brand-green opacity-0 group-hover:opacity-30 pointer-events-none animate-ping" />
                <Play className="w-6 h-6 fill-white ml-1 relative z-10" />
              </span>
            </div>

            {/* Duration Badge */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-text/80 text-white text-xs font-black">
              <Clock className="w-3.5 h-3.5" />
              {video.duration}
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-brand-green/20 text-brand-green-deep text-xs font-black">
              <MonitorPlay className="w-3.5 h-3.5" />
              {video.category}
            </div>
          </div>
        )}
      </div>

      {/* Video Details Content */}
      <div
        className={`flex flex-col justify-center p-4 ${
          isFeatured ? "lg:col-span-5 lg:p-4" : "flex-grow"
        }`}
      >
        {isFeatured && (
          <span className="text-[10px] font-black text-brand-brown-warm tracking-wider uppercase mb-2">
            ★ Featured Broadcast
          </span>
        )}
        <h3
          className={`font-black text-brand-green-deep mb-2 line-clamp-2 ${
            isFeatured ? "text-xl md:text-2xl" : "text-base lg:text-lg"
          }`}
        >
          {video.title}
        </h3>
        <p className="text-sm text-brand-text-muted leading-relaxed font-semibold mb-4 line-clamp-3">
          {video.desc}
        </p>

        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="w-fit inline-flex items-center gap-1.5 text-sm font-black text-brand-green hover:text-brand-green-deep transition-colors"
          >
            Watch Video →
          </button>
        )}
      </div>
    </article>
  );
};

export default FeaturedVideoCard;
