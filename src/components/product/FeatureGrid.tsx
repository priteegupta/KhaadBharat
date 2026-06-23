import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface FeatureItem {
  title: string;
  desc: string;
}

interface FeatureGridProps {
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ title, subtitle, items }) => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="relative overflow-hidden p-6 rounded-3xl bg-brand-beige-panel/50 border border-brand-green/5 hover:border-brand-green/20 shadow-sm hover:shadow-premium transition-all duration-300 backdrop-blur-sm"
          >
            {/* Top right gradient accent */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-brand-green/15 to-transparent rounded-full pointer-events-none" />

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-brand-green/10 flex items-center justify-center text-brand-green flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-black text-brand-green-deep mb-2">
                  {item.title}
                </h4>
                <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
