import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SEO from "../../../components/common/SEO";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === "hi";

  const points = t("pages.about.points", { returnObjects: true }) as string[];
  const spotlight = t("pages.about.spotlight", { returnObjects: true }) as string[];
  const visionPoints = t("pages.about.visionPoints", { returnObjects: true }) as string[];
  const timeline = t("pages.about.timeline", { returnObjects: true }) as Array<{ year: string; title: string; body: string }>;
  const cards = t("pages.about.cards", { returnObjects: true }) as Array<{ title: string; body: string }>;
  const storyPoints = t("pages.about.storyPoints", { returnObjects: true }) as string[];

  // Retrieve photo properties dynamically
  const photoSrc = t("pages.about.photoSrc", { defaultValue: "/images/founder-nidhi.png" });
  const photoLabel = t("pages.about.photoLabel", { defaultValue: "Founder portrait - Mrs. NIDHI" });
  const photoNote = t("pages.about.photoNote");

  return (
    <motion.div
      className="page-stack"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SEO title={t("pages.about.title")} description={t("pages.about.summary")} />

      {/* About Overview */}
      <motion.section className="panel about-panel" variants={itemVariants}>
        <div className="about-copy text-left">
          <p className="eyebrow">{t("ui.section.aboutUs")}</p>
          <h2>{t("pages.about.title")}</h2>
          <p className="lead">{t("pages.about.summary")}</p>
          <p>{t("pages.about.intro")}</p>
          <p className="about-leadership">{t("pages.about.leadership")}</p>

          <blockquote className="founder-quote card">
            <p>"{t("pages.about.founderQuote")}"</p>
          </blockquote>

          <div className="vision-card card">
            <p className="eyebrow">{t("pages.about.visionTitle")}</p>
            {visionPoints && Array.isArray(visionPoints) && (
              <ul className="simple-list compact">
                {visionPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <aside className="card about-photo-card text-left">
          <figure className="founder-portrait">
            <div className="founder-portrait-frame overflow-hidden">
              <img className="founder-portrait-image hover:scale-105 transition-transform duration-500" src={photoSrc} alt={photoLabel} />
            </div>
            <figcaption className="mt-2">
              <strong>{photoLabel}</strong>
              <p className="text-xs text-brand-text-muted mt-1">{photoNote}</p>
            </figcaption>
          </figure>
        </aside>
      </motion.section>

      {/* Timeline Section */}
      <motion.section className="panel text-left" variants={itemVariants}>
        <p className="eyebrow">{t("ui.section.timeline")}</p>
        <div className="timeline-grid mt-6">
          {timeline && Array.isArray(timeline) && timeline.map((item, idx) => (
            <motion.article
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="card timeline-card p-6 bg-white border border-brand-green/10 shadow-premium hover:shadow-premium-hover flex flex-col gap-3 group text-left relative overflow-hidden"
              key={item.title}
            >
              <div className="flex justify-between items-center">
                <span className="timeline-year bg-brand-green/10 text-brand-green-deep font-extrabold px-3 py-1 rounded-full text-xs">
                  {item.year}
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
              </div>
              <h3 className="text-base font-extrabold text-brand-green-deep group-hover:text-brand-green transition-colors mt-2">{item.title}</h3>
              <p className="text-xs text-brand-text-muted leading-relaxed font-semibold">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* Sustainability Infographic / Carbon Cycle */}
      <motion.section className="panel text-left" variants={itemVariants}>
        <span className="eyebrow">{isHi ? "पर्यावरण स्थिरता" : "SUSTAINABILITY INFOGRAPHIC"}</span>
        <h2 className="text-2xl font-black text-brand-green-deep mt-3">{isHi ? "बायोचार का कार्बन चक्र" : "Biochar Carbon Sequestration Cycle"}</h2>
        <p className="text-sm text-brand-text-muted font-bold mt-1">
          {isHi
            ? "जानिए कैसे बायोचार फसलों के अवशेषों को लंबे समय तक मिट्टी में पोषण देने वाले माध्यम में बदल देता है।"
            : "Learn how Biochar transforms agricultural waste into a permanent soil nutrition sponge while locking carbon."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {[
            {
              num: "1",
              titleEn: "Biomass Waste",
              titleHi: "कृषि अपशिष्ट",
              descEn: "Crop residues are collected instead of being burned, preventing air pollution.",
              descHi: "पराली और कृषि कचरे को खेतों में जलाने के बजाय सुरक्षित रूप से एकत्र किया जाता है।",
              icon: "🌾"
            },
            {
              num: "2",
              titleEn: "Clean Pyrolysis",
              titleHi: "थर्मल रूपांतरण",
              descEn: "Converted in oxygen-free thermal chambers, locking carbon permanently.",
              descHi: "बिना ऑक्सीजन के विशेष चैंबर में पकाया जाता है, जिससे कार्बन ठोस रूप में बंद हो जाता है।",
              icon: "🔥"
            },
            {
              num: "3",
              titleEn: "Soil Sponge",
              titleHi: "सक्रिय कार्बन मिट्टी",
              descEn: "Biochar mixed in soil acts as a spongy reservoir for water and microbes.",
              descHi: "मिट्टी में मिलाकर नमी सोखने वाला स्पंज तैयार किया जाता है जो लंबे समय तक पानी रोकता है।",
              icon: "🧽"
            },
            {
              num: "4",
              titleEn: "Net-Zero Crops",
              titleHi: "टिकाऊ उपज",
              descEn: "Locked carbon stays in soil for centuries; plants grow stronger and greener.",
              descHi: "सैकड़ों वर्षों तक कार्बन मिट्टी में रहता है; फसलें फलती-फूलती और हरी-भरी होती हैं।",
              icon: "🌱"
            }
          ].map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-2xl bg-white border border-brand-green/10 shadow-premium hover:shadow-premium-hover flex flex-col gap-4 text-left relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand-green/5 rounded-bl-full pointer-events-none group-hover:bg-brand-green/10 transition-colors" />
              <div className="flex justify-between items-center relative z-10">
                <span className="text-3xl">{step.icon}</span>
                <span className="text-[10px] font-black text-brand-green bg-brand-green-light px-2.5 py-1 rounded-full">Step {step.num}</span>
              </div>
              <div className="relative z-10 mt-2">
                <h3 className="text-base font-black text-brand-green-deep mb-2">{isHi ? step.titleHi : step.titleEn}</h3>
                <p className="text-xs text-brand-text-muted leading-relaxed font-semibold">{isHi ? step.descHi : step.descEn}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Cards Details */}
      <motion.section className="panel text-left" variants={itemVariants}>
        <p className="eyebrow">{t("ui.section.details")}</p>
        <div className="grid">
          {cards && Array.isArray(cards) && cards.map((item) => (
            <motion.article
              whileHover={{ y: -3, scale: 1.01 }}
              className="card bg-white border border-brand-green/10 shadow-sm p-6 hover:shadow transition-all text-left"
              key={item.title}
            >
              <h3 className="text-base font-extrabold text-brand-green-deep mb-2">{item.title}</h3>
              <p className="text-xs text-brand-text-muted leading-relaxed font-semibold">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* Story Visual Panel */}
      <motion.section className="panel story-panel" variants={itemVariants}>
        <div className="story-panel-copy text-left">
          <p className="eyebrow">{t("pages.about.storyLabel")}</p>
          <h3>{t("pages.about.storyTitle")}</h3>
          <p className="lead">{t("pages.about.storySummary")}</p>
          {storyPoints && Array.isArray(storyPoints) && (
            <ul className="simple-list compact">
              {storyPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="story-panel-visual card relative overflow-hidden group">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={t("pages.about.storyImage", { defaultValue: "/images/farmers-paddy-field.jpg" })}
            alt={t("pages.about.storyLabel")}
          />
          <div className="absolute bottom-4 left-4 right-4 bg-brand-green-deep/85 backdrop-blur border border-white/10 p-3 rounded-xl text-left pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[10px] font-black text-brand-accent-sunlight uppercase tracking-wider block">Farmer Partnership</span>
            <span className="text-xs text-white font-bold leading-tight mt-0.5 block">Cooperative networks supporting crop health together.</span>
          </div>
        </div>
      </motion.section>

      {/* Key Points */}
      <motion.section className="panel text-left" variants={itemVariants}>
        <p className="eyebrow">{t("ui.section.keyPoints")}</p>
        <div className="grid">
          {points && Array.isArray(points) && points.map((point) => (
            <motion.article
              whileHover={{ y: -3 }}
              className="card bg-white border border-brand-green/10 shadow-sm p-6 hover:shadow transition-all text-left"
              key={point}
            >
              <h3 className="text-base font-extrabold text-brand-green-deep">{point}</h3>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* Spotlight */}
      <motion.section className="panel text-left" variants={itemVariants}>
        <p className="eyebrow">{t("ui.section.spotlight")}</p>
        <div className="grid">
          {spotlight && Array.isArray(spotlight) && spotlight.map((item) => (
            <motion.article
              whileHover={{ y: -3 }}
              className="card bg-white border border-brand-green/10 shadow-sm p-6 hover:shadow transition-all text-left"
              key={item}
            >
              <h3 className="text-base font-extrabold text-brand-green-deep">{item}</h3>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};
export default AboutPage;
