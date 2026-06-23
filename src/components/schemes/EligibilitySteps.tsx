import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { UserCheck, FileText, Map, Users, ClipboardCheck } from "lucide-react";

const icons = [
  <UserCheck className="w-6 h-6 text-brand-green" />,
  <FileText className="w-6 h-6 text-brand-green" />,
  <Map className="w-6 h-6 text-brand-green" />,
  <Users className="w-6 h-6 text-brand-green" />,
  <ClipboardCheck className="w-6 h-6 text-brand-green" />,
];

export const EligibilitySteps: React.FC = () => {
  const { t } = useTranslation("schemes");

  const steps = t("eligibilityGuide.steps", {
    returnObjects: true,
    defaultValue: [],
  }) as { title: string; description: string }[];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full"
    >
      {steps.map((step, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="flex flex-col gap-4 p-6 rounded-3xl bg-white border border-brand-green/10 shadow-premium hover:shadow-premium-hover transition-all duration-300 relative group"
        >
          {/* Step Number Badge */}
          <div className="absolute top-4 right-4 flex items-center justify-center w-7 h-7 rounded-full bg-brand-green/10 text-brand-green-deep text-xs font-black group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
            0{index + 1}
          </div>

          {/* Icon frame */}
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-beige border border-brand-brown/10 group-hover:scale-105 transition-transform duration-300">
            {icons[index] || icons[0]}
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h3 className="text-base font-black text-brand-green-deep leading-snug">
              {step.title}
            </h3>
            <p className="text-xs text-brand-text-muted leading-relaxed font-bold">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EligibilitySteps;
