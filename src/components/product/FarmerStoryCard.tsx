import React from "react";
import { motion } from "framer-motion";
import { User, MapPin, BadgeCheck, Droplet, Sprout } from "lucide-react";

interface FarmerStory {
  name: string;
  location: string;
  crop: string;
  result: string;
  waterSavings: string;
  soilImprovement: string;
}

interface FarmerStoryCardProps {
  story: FarmerStory;
  index: number;
}

export const FarmerStoryCard: React.FC<FarmerStoryCardProps> = ({ story, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white border border-brand-green/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-premium hover:border-brand-green/20 transition-all duration-300 text-left"
    >
      <div>
        {/* Header with user avatar and location */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-full bg-brand-green-light border border-brand-green/20 flex items-center justify-center text-brand-green">
            <User className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black text-brand-green-deep flex items-center gap-1">
              {story.name}
              <BadgeCheck className="w-4 h-4 text-brand-green fill-brand-green-light" />
            </span>
            <span className="text-xs font-semibold text-brand-text-muted flex items-center gap-1">
              <MapPin className="w-3 h-3 text-brand-brown-warm" />
              {story.location}
            </span>
          </div>
        </div>

        {/* Story details */}
        <p className="text-sm font-semibold text-brand-text leading-relaxed mb-6 italic">
          "{story.result}"
        </p>
      </div>

      {/* Badges and tags */}
      <div className="pt-6 border-t border-brand-green/5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-brand-green uppercase tracking-wider bg-brand-green/5 px-2.5 py-1 rounded-full">
            Crop: {story.crop}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[10px] font-black text-blue-700 border border-blue-100">
            <Droplet className="w-3.5 h-3.5" />
            {story.waterSavings}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-green-light text-[10px] font-black text-brand-green-deep border border-brand-green/10">
            <Sprout className="w-3.5 h-3.5" />
            {story.soilImprovement}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FarmerStoryCard;
