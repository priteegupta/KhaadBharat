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
  const { t } = useTranslation();

  const points = t("pages.about.points", { returnObjects: true }) as string[];
  const spotlight = t("pages.about.spotlight", { returnObjects: true }) as string[];
  const visionPoints = t("pages.about.visionPoints", { returnObjects: true }) as string[];
  const timeline = t("pages.about.timeline", { returnObjects: true }) as Array<{ year: string; title: string; body: string }>;
  const cards = t("pages.about.cards", { returnObjects: true }) as Array<{ title: string; body: string }>;
  const storyPoints = t("pages.about.storyPoints", { returnObjects: true }) as string[];

  // Retrieve photo properties dynamically
  const photoSrc = t("pages.about.photoSrc", { defaultValue: "/images/founder-nidhi-passport.png" });
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
        <div className="about-copy">
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

        <aside className="card about-photo-card">
          <figure className="founder-portrait">
            <div className="founder-portrait-frame">
              <img className="founder-portrait-image" src={photoSrc} alt={photoLabel} />
            </div>
            <figcaption>
              <strong>{photoLabel}</strong>
              <p>{photoNote}</p>
            </figcaption>
          </figure>
        </aside>
      </motion.section>

      {/* Timeline Section */}
      <motion.section className="panel" variants={itemVariants}>
        <p className="eyebrow">{t("ui.section.timeline")}</p>
        <div className="timeline-grid">
          {timeline && Array.isArray(timeline) && timeline.map((item) => (
            <article className="card timeline-card" key={item.title}>
              <span className="timeline-year">{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </motion.section>

      {/* Cards Details */}
      <motion.section className="panel" variants={itemVariants}>
        <p className="eyebrow">{t("ui.section.details")}</p>
        <div className="grid">
          {cards && Array.isArray(cards) && cards.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </motion.section>

      {/* Story Visual Panel */}
      <motion.section className="panel story-panel" variants={itemVariants}>
        <div className="story-panel-copy">
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
        <div className="story-panel-visual card">
          <img src={t("pages.about.storyImage", { defaultValue: "/images/hero-village.svg" })} alt={t("pages.about.storyLabel")} />
        </div>
      </motion.section>

      {/* Key Points */}
      <motion.section className="panel" variants={itemVariants}>
        <p className="eyebrow">{t("ui.section.keyPoints")}</p>
        <div className="grid">
          {points && Array.isArray(points) && points.map((point) => (
            <article className="card" key={point}>
              <h3>{point}</h3>
            </article>
          ))}
        </div>
      </motion.section>

      {/* Spotlight */}
      <motion.section className="panel" variants={itemVariants}>
        <p className="eyebrow">{t("ui.section.spotlight")}</p>
        <div className="grid">
          {spotlight && Array.isArray(spotlight) && spotlight.map((item) => (
            <article className="card" key={item}>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};
export default AboutPage;
