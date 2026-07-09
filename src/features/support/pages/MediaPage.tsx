import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sprout, MapPin, HeartPulse, ChevronRight, FileText } from "lucide-react";
import SEO from "../../../components/common/SEO";
import MediaHero from "../../../components/media/MediaHero";
import MediaTabs, { MediaTabType } from "../../../components/media/MediaTabs";
import FeaturedVideoCard from "../../../components/media/FeaturedVideoCard";
import StoryCard from "../../../components/media/StoryCard";
import GalleryGrid from "../../../components/media/GalleryGrid";
import DownloadCard from "../../../components/media/DownloadCard";
import ResourceCard from "../../../components/media/ResourceCard";
import PressCard from "../../../components/media/PressCard";
import MediaCTA from "../../../components/media/MediaCTA";

interface VideoData {
  id: string;
  title: string;
  desc: string;
  duration: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
}

interface StoryData {
  id: string;
  name: string;
  location: string;
  crop: string;
  impact: string;
  summary: string;
  story: string;
  image: string;
}

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

interface DocumentData {
  id: string;
  title: string;
  desc: string;
  fileType: string;
  fileSize: string;
  fileUrl: string;
}

interface CampaignData {
  id: string;
  title: string;
  desc: string;
  tag: string;
  image: string;
}

interface PressData {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  url: string;
}

interface ResourceData {
  id: string;
  title: string;
  category: string;
  fileType: string;
  fileSize: string;
  fileUrl: string;
}

export const MediaPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<MediaTabType>("videos");
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  
  // Resource category filter state
  const [resourceFilter, setResourceFilter] = useState<string>("All");

  const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedStory]);

  // Load arrays from translation file
  const supportingVideos = t("media.videos.supporting", { returnObjects: true, defaultValue: [] }) as VideoData[];
  const farmerStories = t("media.stories.items", { returnObjects: true, defaultValue: [] }) as StoryData[];
  const galleryItems = t("media.gallery.items", { returnObjects: true, defaultValue: [] }) as GalleryItem[];
  const brochures = t("media.brochures.items", { returnObjects: true, defaultValue: [] }) as DocumentData[];
  const campaigns = t("media.campaigns.items", { returnObjects: true, defaultValue: [] }) as CampaignData[];
  const pressReleases = t("media.press.items", { returnObjects: true, defaultValue: [] }) as PressData[];
  const brandResources = t("media.resources.items", { returnObjects: true, defaultValue: [] }) as ResourceData[];

  const featuredVideo = t("media.videos.featured", { returnObjects: true }) as VideoData;

  const scrollToTabs = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWatchStories = () => {
    setActiveTab("stories");
    setTimeout(scrollToTabs, 100);
  };

  const handleDownloadBrochure = () => {
    setActiveTab("brochures");
    setTimeout(scrollToTabs, 100);
  };

  // Filtered resources based on sub-tabs
  const filteredResources = brandResources.filter((item) => {
    if (resourceFilter === "All" || resourceFilter === t("media.resources.filterAll")) return true;
    return item.category === resourceFilter;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <SEO title={t("media.hero.badge")} description={t("media.hero.subtitle")} />

      {/* 1. Cinematic Hero Section */}
      <MediaHero
        onWatchStories={handleWatchStories}
        onDownloadBrochure={handleDownloadBrochure}
      />

      {/* 2. Anchor target and Sticky Categories Tabs */}
      <div ref={tabsContainerRef} className="scroll-mt-24">
        <MediaTabs activeTab={activeTab} onChangeTab={setActiveTab} />
      </div>

      {/* 3. Dynamic Section Content */}
      <main className="flex-grow mb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* --- VIDEOS TAB --- */}
            {activeTab === "videos" && (
              <section className="flex flex-col gap-10">
                <div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-deep">
                    {t("media.videos.sectionTitle")}
                  </h2>
                  <p className="text-sm text-brand-text-muted font-semibold">
                    {t("media.videos.sectionSubtitle")}
                  </p>
                </div>

                {/* Featured Video Row */}
                {featuredVideo && (
                  <div className="mb-6">
                    <FeaturedVideoCard video={featuredVideo} isFeatured />
                  </div>
                )}

                {/* Supporting Videos Grid */}
                {supportingVideos.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {supportingVideos.map((video) => (
                      <FeaturedVideoCard key={video.id} video={video} />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* --- FARMER STORIES TAB --- */}
            {activeTab === "stories" && (
              <section className="flex flex-col gap-10">
                <div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-deep">
                    {t("media.stories.sectionTitle")}
                  </h2>
                  <p className="text-sm text-brand-text-muted font-semibold">
                    {t("media.stories.sectionSubtitle")}
                  </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {farmerStories.map((story) => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      onOpenModal={() => setSelectedStory(story)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* --- GALLERY TAB --- */}
            {activeTab === "gallery" && (
              <section className="flex flex-col gap-10">
                <div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-deep">
                    {t("media.gallery.sectionTitle")}
                  </h2>
                  <p className="text-sm text-brand-text-muted font-semibold">
                    {t("media.gallery.sectionSubtitle")}
                  </p>
                </div>

                <GalleryGrid items={galleryItems} />
              </section>
            )}

            {/* --- BROCHURES TAB --- */}
            {activeTab === "brochures" && (
              <section className="flex flex-col gap-10">
                <div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-deep">
                    {t("media.brochures.sectionTitle")}
                  </h2>
                  <p className="text-sm text-brand-text-muted font-semibold">
                    {t("media.brochures.sectionSubtitle")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {brochures.map((doc) => (
                    <DownloadCard key={doc.id} document={doc} />
                  ))}
                </div>
              </section>
            )}

            {/* --- CAMPAIGNS TAB --- */}
            {activeTab === "campaigns" && (
              <section className="flex flex-col gap-10">
                <div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-deep">
                    {t("media.campaigns.sectionTitle")}
                  </h2>
                  <p className="text-sm text-brand-text-muted font-semibold">
                    {t("media.campaigns.sectionSubtitle")}
                  </p>
                </div>

                <div className="relative border-l-2 border-brand-green/20 ml-4 md:ml-8 pl-6 md:pl-10 flex flex-col gap-8 max-w-4xl mx-auto">
                  {campaigns.map((camp, index) => (
                    <motion.article
                      key={camp.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group rounded-3xl bg-white border border-brand-green/10 shadow-premium p-6 hover:shadow-premium-hover transition-all duration-300 flex flex-col md:flex-row gap-6 text-left"
                    >
                      {/* Timeline Node dot */}
                      <div className="absolute -left-[37px] md:-left-[51px] top-8 w-5 h-5 rounded-full bg-brand-green border-4 border-brand-beige-panel shadow group-hover:scale-110 transition-transform" />

                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] w-full md:w-60 shrink-0 overflow-hidden bg-brand-green-light rounded-2xl">
                        <img
                          src={camp.image}
                          alt={camp.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-brand-accent-sunlight text-brand-text text-[9px] font-black uppercase shadow-sm">
                          {camp.tag}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-center flex-grow">
                        <h3 className="text-lg font-black text-brand-green-deep mb-2 group-hover:text-brand-green transition-colors">
                          {camp.title}
                        </h3>
                        <p className="text-xs text-brand-text-muted leading-relaxed font-semibold">
                          {camp.desc}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>
            )}

            {/* --- PRESS TAB --- */}
            {activeTab === "press" && (
              <section className="flex flex-col gap-10">
                <div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-deep">
                    {t("media.press.sectionTitle")}
                  </h2>
                  <p className="text-sm text-brand-text-muted font-semibold">
                    {t("media.press.sectionSubtitle")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {pressReleases.map((press) => (
                    <PressCard key={press.id} press={press} />
                  ))}
                </div>
              </section>
            )}

            {/* --- RESOURCES TAB --- */}
            {activeTab === "resources" && (
              <section className="flex flex-col gap-10">
                <div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-deep">
                    {t("media.resources.sectionTitle")}
                  </h2>
                  <p className="text-sm text-brand-text-muted font-semibold">
                    {t("media.resources.sectionSubtitle")}
                  </p>
                </div>

                {/* Sub-filters for resources */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                  {[
                    { id: t("media.resources.filterAll"), label: t("media.resources.filterAll") },
                    { id: t("media.resources.filterLogos"), label: t("media.resources.filterLogos") },
                    { id: t("media.resources.filterPacks"), label: t("media.resources.filterPacks") },
                    { id: t("media.resources.filterBanners"), label: t("media.resources.filterBanners") }
                  ].map((filter) => {
                    const isSelected = resourceFilter === filter.id;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => setResourceFilter(filter.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-extrabold border transition-all duration-200 ${
                          isSelected
                            ? "bg-brand-green text-white border-brand-green shadow-sm"
                            : "bg-white text-brand-text/75 border-brand-green/10 hover:border-brand-green/35 hover:text-brand-green"
                        }`}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredResources.map((res) => (
                    <ResourceCard key={res.id} resource={res} />
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Strong Footer CTA Section */}
      <MediaCTA />

      {/* 5. Farmer Story Modal Lightbox */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-text/90 backdrop-blur-sm"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="relative max-w-2xl w-full bg-brand-beige-panel rounded-3xl border border-white/20 shadow-2xl p-6 flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-brand-green/10 text-brand-green-deep hover:bg-brand-green hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Portrait & Core Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                <div className="sm:col-span-4 aspect-square w-full rounded-2xl overflow-hidden bg-brand-green-light shadow-inner">
                  <img
                    src={selectedStory.image}
                    alt={selectedStory.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:col-span-8 flex flex-col gap-2.5">
                  <span className="text-[10px] font-black text-brand-brown-warm tracking-wider uppercase">
                    {t("media.tabs.stories")}
                  </span>
                  <h3 className="text-2xl font-black text-brand-green-deep">
                    {selectedStory.name}
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand-text">
                      <MapPin className="w-3.5 h-3.5 text-brand-green" />
                      <span className="font-extrabold text-brand-text-muted">{t("media.stories.locationLabel")}:</span>
                      {selectedStory.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand-text">
                      <Sprout className="w-3.5 h-3.5 text-brand-green" />
                      <span className="font-extrabold text-brand-text-muted">{t("media.stories.cropLabel")}:</span>
                      {selectedStory.crop}
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Body */}
              <div className="border-t border-brand-green/10 pt-4 flex flex-col gap-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-green/5 border border-brand-green/10 text-xs font-bold text-brand-green-deep">
                  <HeartPulse className="w-4 h-4 text-brand-brown-warm flex-shrink-0" />
                  <span className="font-black text-brand-text-muted">{t("media.stories.impactLabel")}:</span>
                  {selectedStory.impact}
                </div>
                
                <p className="text-sm text-brand-text-muted leading-relaxed font-semibold whitespace-pre-line">
                  {selectedStory.story}
                </p>
              </div>

              {/* Close Action */}
              <div className="border-t border-brand-green/5 pt-4 flex justify-end">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-black text-white bg-brand-green-deep hover:bg-brand-green transition-colors"
                >
                  {t("media.stories.closeStory")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaPage;
