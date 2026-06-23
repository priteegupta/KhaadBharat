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
      <motion.section variants={itemVariants} className="bg-brand-beige-cream/20 border border-brand-green/10 rounded-3xl p-6 md:p-8 mb-12 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <span className="inline-block px-3 py-1 text-[10px] md:text-xs font-black tracking-widest text-brand-green uppercase bg-brand-green/10 rounded-full mb-3">
              KNOWLEDGE BASE
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-brand-green-deep tracking-tight">
              {t("faq.title")}
            </h3>
            <p className="text-xs md:text-sm text-brand-text-muted font-bold mt-1">
              {t("faq.subtitle")}
            </p>
          </div>
          <button
            onClick={() => navigate("/faq")}
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-black text-brand-green-deep bg-white border border-brand-green/20 hover:bg-brand-green-light hover:border-brand-green/45 shadow-sm transition-all duration-200"
          >
            {t("faq.cta")}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* FAQ Accordion list */}
        <div className="flex flex-col gap-3 max-w-4xl">
          {[0, 1, 2, 3].map((index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-brand-green/10 bg-white overflow-hidden shadow-sm hover:border-brand-green/20 transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                    isOpen ? "bg-brand-green-light/40" : "hover:bg-brand-green-light/10"
                  }`}
                >
                  <span className="text-xs md:text-sm font-extrabold text-brand-green-deep flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-green shrink-0" />
                    {t(`faq.q${index + 1}`)}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-brand-green shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-brand-green-deep shrink-0 ml-4" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-4 text-[11px] md:text-xs font-bold text-brand-text leading-relaxed border-t border-brand-green/10 bg-white">
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
