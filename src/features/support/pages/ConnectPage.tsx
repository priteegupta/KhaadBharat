import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../../../components/common/SEO";
import {
  Users,
  Package,
  ShieldCheck,
  Building,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from "lucide-react";

// Import custom sub-sections
import ContactHero from "../../../components/contact/ContactHero";
import ContactCard from "../../../components/contact/ContactCard";
import ContactForm from "../../../components/contact/ContactForm";
import PartnershipCard from "../../../components/contact/PartnershipCard";
import DistributorSection from "../../../components/contact/DistributorSection";
import OfficeInfoCard from "../../../components/contact/OfficeInfoCard";
import SocialCard from "../../../components/contact/SocialCard";
import MapContainer from "../../../components/contact/MapContainer";
import ContactCTA from "../../../components/contact/ContactCTA";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as any;

export const ConnectPage: React.FC = () => {
  const { t } = useTranslation("contact");
  const navigate = useNavigate();

  const [selectedInterest, setSelectedInterest] = useState("farmer");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleQuickContactClick = (interestKey: string) => {
    setSelectedInterest(interestKey);
    const element = document.getElementById("contact-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      const nameInput = document.getElementById("name");
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
      }
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const quickCards = [
    {
      key: "farmer",
      icon: Users,
    },
    {
      key: "product",
      icon: Package,
    },
    {
      key: "distributor",
      icon: ShieldCheck,
    },
    {
      key: "partnership",
      icon: Building,
    },
  ];

  return (
    <motion.div
      className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SEO
        title={t("hero.title")}
        description={t("hero.subtitle")}
      />

      {/* 1. HERO SECTION */}
      <motion.section variants={itemVariants}>
        <ContactHero />
      </motion.section>

      {/* 2. QUICK CONTACT CARDS */}
      <motion.section variants={itemVariants} className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickCards.map((card) => (
            <ContactCard
              key={card.key}
              title={t(`quickContact.${card.key}.title`)}
              description={t(`quickContact.${card.key}.desc`)}
              buttonText={t(`quickContact.${card.key}.btn`)}
              icon={card.icon}
              onClick={() => handleQuickContactClick(card.key)}
            />
          ))}
        </div>
      </motion.section>

      {/* 3. CONTACT FORM SECTION */}
      <motion.section variants={itemVariants} className="mb-12">
        <ContactForm
          selectedInterest={selectedInterest}
          setSelectedInterest={setSelectedInterest}
        />
      </motion.section>

      {/* 4. PARTNERSHIP SECTION */}
      <motion.section variants={itemVariants}>
        <PartnershipCard />
      </motion.section>

      {/* 5. DISTRIBUTOR INQUIRY SECTION */}
      <motion.section variants={itemVariants}>
        <DistributorSection
          onApplyClick={() => handleQuickContactClick("distributor")}
        />
      </motion.section>

      {/* 6. OFFICE INFORMATION SECTION */}
      <motion.section variants={itemVariants}>
        <OfficeInfoCard />
      </motion.section>

      {/* 7. FAQ QUICK HELP SECTION */}
      <motion.section variants={itemVariants} className="bg-gradient-to-br from-brand-beige-cream/35 to-white border border-brand-green/10 rounded-[32px] p-6 md:p-10 mb-12 shadow-premium relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-green/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
          <div>
            <span className="inline-block px-3 py-1.5 text-[10px] md:text-xs font-black tracking-widest text-brand-green uppercase bg-brand-green/10 rounded-full mb-3 border border-brand-green/15 shadow-sm">
              {t("faq.badge")}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-brand-green-deep tracking-tight">
              {t("faq.title")}
            </h3>
            <p className="text-xs md:text-sm text-brand-text-muted font-bold mt-1.5">
              {t("faq.subtitle")}
            </p>
          </div>
          <button
            onClick={() => navigate("/faq")}
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-black text-brand-green-deep bg-white border border-brand-green/20 hover:bg-brand-green-light hover:border-brand-green/45 shadow-sm hover:shadow transition-all duration-200"
          >
            {t("faq.cta")}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* FAQ Accordion list */}
        <div className="flex flex-col gap-4 max-w-4xl relative z-10">
          {[0, 1, 2, 3].map((index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-350 overflow-hidden relative ${
                  isOpen
                    ? "border-brand-green/30 bg-gradient-to-br from-brand-green-light/10 to-white shadow-md shadow-brand-green/5 scale-[1.005]"
                    : "border-brand-green/10 bg-white hover:border-brand-green/25 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {/* Active indicator bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-brand-green transition-transform duration-300 origin-top ${
                  isOpen ? "scale-y-100" : "scale-y-0"
                }`} />

                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors"
                >
                  <span className="text-xs md:text-sm font-extrabold text-brand-green-deep flex items-center gap-3.5">
                    {/* Visual icon badge */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isOpen ? "bg-brand-green text-white shadow-sm" : "bg-brand-green-light text-brand-green"
                    }`}>
                      <HelpCircle className="w-4.5 h-4.5" />
                    </div>
                    <span className={`transition-colors duration-300 ${isOpen ? "text-brand-green-deep" : "text-brand-green-deep/90"}`}>
                      {t(`faq.q${index + 1}`)}
                    </span>
                  </span>

                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all duration-300 ${
                    isOpen ? "bg-brand-green/10 rotate-180" : "bg-brand-beige-cream/40"
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${
                      isOpen ? "text-brand-green" : "text-brand-green-deep/70"
                    }`} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="pl-[52px] pr-6 pb-6 text-xs md:text-[13px] font-bold text-brand-text-muted leading-relaxed">
                        {t(`faq.a${index + 1}`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* 8. SOCIAL CONNECT SECTION */}
      <motion.section variants={itemVariants}>
        <SocialCard />
      </motion.section>

      {/* 9. MAP SECTION */}
      <motion.section variants={itemVariants}>
        <MapContainer />
      </motion.section>

      {/* 10. FINAL CTA SECTION */}
      <motion.section variants={itemVariants}>
        <ContactCTA />
      </motion.section>
    </motion.div>
  );
};

export default ConnectPage;
