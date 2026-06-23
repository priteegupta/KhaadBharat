import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, ZoomIn, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ items }) => {
  const { t } = useTranslation("media");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => setSelectedImage(item)}
            className="group cursor-zoom-in rounded-3xl bg-white border border-brand-green/10 p-3 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col gap-3"
          >
            {/* Visual Container */}
            <div className="relative aspect-square bg-brand-green-light rounded-2xl overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />
              {/* Dark Hover Overlay */}
              <div className="absolute inset-0 bg-brand-green-deep/0 group-hover:bg-brand-green-deep/30 flex items-center justify-center transition-colors duration-300">
                <span className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-brand-green-deep text-xs font-black shadow-md transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <Eye className="w-3.5 h-3.5" />
                  {t("gallery.viewPhoto")}
                </span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/95 border border-brand-green/10 text-brand-green-deep text-[10px] font-black shadow-sm">
                {item.category}
              </div>
            </div>

            {/* Title */}
            <div className="px-1 py-1">
              <h3 className="text-sm font-extrabold text-brand-green-deep line-clamp-1 group-hover:text-brand-green transition-colors">
                {item.title}
              </h3>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Lightbox / Modal Image Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-text/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close preview"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="relative max-w-4xl w-full bg-brand-beige-panel rounded-3xl overflow-hidden border border-white/20 shadow-2xl p-4 flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Box */}
              <div className="relative max-h-[70vh] rounded-2xl overflow-hidden bg-brand-green-light flex items-center justify-center">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>

              {/* Details footer */}
              <div className="flex flex-col gap-1 px-2 pb-2">
                <span className="text-[10px] font-black text-brand-brown-warm tracking-wider uppercase">
                  {selectedImage.category}
                </span>
                <h4 className="text-lg font-black text-brand-green-deep">
                  {selectedImage.title}
                </h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryGrid;
