import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Handshake, ShieldAlert, BadgePercent, MapPinned } from "lucide-react";

interface DistributorCTAProps {
  title: string;
  subtitle: string;
  ctaTitle: string;
  ctaText: string;
  buttonText: string;
}

export const DistributorCTA: React.FC<DistributorCTAProps> = ({
  title,
  subtitle,
  ctaTitle,
  ctaText,
  buttonText
}) => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    // Route to the contact page with interest set to dealer
    navigate("/contact?interest=dealer");
  };

  const benefits = [
    {
      icon: BadgePercent,
      label: "Wholesale Margins",
      desc: "Competitive bulk pricing and seasonal distributor bonuses."
    },
    {
      icon: MapPinned,
      label: "Exclusive Regions",
      desc: "Exclusive distribution rights in allocated agricultural districts."
    },
    {
      icon: ShieldAlert,
      label: "Co-Marketing Support",
      desc: "Printed pamphlets, product banners, and digital marketing materials."
    }
  ];

  return (
    <section className="py-16 border-t border-brand-green/10">
      <div className="bg-gradient-to-br from-white to-brand-green-light/20 border border-brand-green/10 rounded-3xl p-8 sm:p-12 shadow-premium">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Form/Enquiry description */}
          <div className="lg:col-span-6 text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-brown-warm/10 border border-brand-brown-warm/20 mb-4"
            >
              <Handshake className="w-4 h-4 text-brand-brown-warm" />
              <span className="text-[10px] font-black text-brand-brown-warm uppercase tracking-wider">
                Partner Program
              </span>
            </motion.div>

            <h2 className="text-3xl font-black text-brand-green-deep mb-4">
              {title}
            </h2>
            <p className="text-sm font-semibold text-brand-text-muted leading-relaxed mb-6">
              {subtitle}
            </p>

            <div className="p-6 rounded-2xl bg-white border border-brand-green/10">
              <h3 className="text-lg font-black text-brand-green-deep mb-2">
                {ctaTitle}
              </h3>
              <p className="text-xs font-semibold text-brand-text-muted leading-relaxed mb-6">
                {ctaText}
              </p>
              
              <button
                onClick={handleApplyClick}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-black text-white bg-brand-green hover:bg-brand-green-deep transition-colors shadow"
              >
                {buttonText}
              </button>
            </div>
          </div>

          {/* Right Column - Benefits checklist */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            {benefits.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-sm border border-transparent hover:border-brand-green/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-green-light/40 border border-brand-green/10 flex items-center justify-center text-brand-green flex-shrink-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-brand-green-deep mb-1">
                      {item.label}
                    </h4>
                    <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default DistributorCTA;
