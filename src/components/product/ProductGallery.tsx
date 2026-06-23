import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Image as ImageIcon } from "lucide-react";

interface GalleryItem {
  title: string;
  category: string;
  desc: string;
}

interface ProductGalleryProps {
  title: string;
  subtitle: string;
  items: GalleryItem[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ title, subtitle, items }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Map local assets to the items by index
  const imageAssets = [
    "/images/khaad-bharat-pack-5kg.png",
    "/images/khaad-bharat-pack-20kg.png",
    "/images/khaad-bharat-pack-50kg.png",
    "/images/farm-process.svg",
    "/images/field-hero.svg",
    "/images/hero-village.svg"
  ];

  return (
    <section className="py-16 border-t border-brand-green/10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-black text-brand-green-deep mb-3">
          {title}
        </h2>
        <p className="text-sm font-bold text-brand-brown-warm uppercase tracking-wider">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => {
          const imgUrl = imageAssets[idx] || "/images/farm-process.svg";
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedIdx(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-brand-green/10 bg-white shadow-sm hover:shadow-premium transition-all duration-300"
            >
              {/* Image wrapper */}
              <div className="relative aspect-video w-full overflow-hidden bg-brand-green-light/40 flex items-center justify-center p-4">
                <img
                  src={imgUrl}
                  alt={item.title}
                  loading="lazy"
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-brand-green-deep/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-green-deep shadow-md">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Text label */}
              <div className="p-5 text-left">
                <span className="text-[10px] font-black text-brand-brown-warm uppercase tracking-widest block mb-1">
                  {item.category}
                </span>
                <h4 className="text-base font-black text-brand-green-deep mb-1">
                  {item.title}
                </h4>
                <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-green-deep/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl bg-brand-beige-cream rounded-3xl overflow-hidden shadow-2xl border border-brand-green/20"
            >
              <button
                onClick={() => setSelectedIdx(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-brand-green-deep flex items-center justify-center transition-colors shadow"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-8 bg-brand-green-light/20 p-8 flex items-center justify-center min-h-[300px]">
                  <img
                    src={imageAssets[selectedIdx] || "/images/farm-process.svg"}
                    alt={items[selectedIdx].title}
                    className="max-h-[70vh] object-contain rounded-2xl"
                  />
                </div>
                
                <div className="md:col-span-4 p-8 flex flex-col justify-center text-left bg-white border-l border-brand-green/5">
                  <span className="text-xs font-black text-brand-brown-warm uppercase tracking-widest mb-2 block">
                    {items[selectedIdx].category}
                  </span>
                  <h3 className="text-2xl font-black text-brand-green-deep mb-4">
                    {items[selectedIdx].title}
                  </h3>
                  <p className="text-sm font-semibold text-brand-text-muted leading-relaxed mb-6">
                    {items[selectedIdx].desc}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-xs font-black text-brand-green uppercase tracking-wider">
                    <ImageIcon className="w-4 h-4" />
                    KHAAD BHARAT Digital Pack
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductGallery;
