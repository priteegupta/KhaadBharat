import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  ShieldCheck,
  Leaf,
  Sparkles,
  TrendingDown,
  Star,
  Milestone,
  Sprout,
  Compass,
  ArrowRight,
  Database,
  BarChart3
} from "lucide-react";
import SEO from "../../../components/common/SEO";
import HeroSection from "../../../components/ui/HeroSection";
import TrustStrip from "../../../components/ui/TrustStrip";
import SectionHeader from "../../../components/ui/SectionHeader";
import FeatureCard from "../../../components/ui/FeatureCard";
import BenefitCard from "../../../components/ui/BenefitCard";

// Stagger entry configurations
const sectionContainerVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeHubTab, setActiveHubTab] = useState<"soil" | "water" | "calculator" | "roadmap">("soil");
  const [soilState, setSoilState] = useState<"before" | "after">("after");
  const [farmSize, setFarmSize] = useState<number>(2);
  const [cropType, setCropType] = useState<string>("wheat");
  const isHi = i18n.language === "hi";

  // 3D Tilt Hover effect states & handlers
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Calculate rotation angles (max 15 degrees)
    const rotateX = -(y / (box.height / 2)) * 15;
    const rotateY = (x / (box.width / 2)) * 15;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
      willChange: "transform"
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
    });
  };

  // Load arrays from translations
  const biocharPoints = t("pages.home.biocharPoints", { returnObjects: true, defaultValue: [] }) as string[];
  const demandPoints = t("pages.home.demandPoints", { returnObjects: true, defaultValue: [] }) as string[];
  const benefitPoints = t("pages.home.benefitPoints", { returnObjects: true, defaultValue: [] }) as Array<{ title: string; body: string }>;
  const irrigationPoints = t("pages.home.irrigationPoints", { returnObjects: true, defaultValue: [] }) as string[];
  const promisePoints = t("pages.home.promisePoints", { returnObjects: true, defaultValue: [] }) as string[];
  const brandPillars = t("pages.home.cards", { returnObjects: true, defaultValue: [] }) as Array<{ title: string; body: string }>;
  const ecosystemPoints = t("pages.home.rollout", { returnObjects: true, defaultValue: [] }) as Array<{ title: string; body: string }>;

  // Calculate savings dynamically
  const waterSavingsAmount = farmSize * (cropType === "sugarcane" ? 450000 : cropType === "rice" ? 350000 : cropType === "vegetables" ? 250000 : 180000);
  const fertilizerSavingsAmount = farmSize * 4200;
  const yieldIncreasePercentage = cropType === "sugarcane" ? "92%" : cropType === "rice" ? "88%" : "85%";

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <SEO title={t("pages.home.eyebrow")} />

      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 2. Horizontal Trust Strip */}
      <TrustStrip />

      {/* 3. Interactive Farmer's Explorer Hub */}
      <motion.section
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-6xl mx-auto flex flex-col gap-8"
      >
        <div className="text-center flex flex-col items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black text-brand-green bg-brand-green/10 border border-brand-green/20 w-fit uppercase tracking-widest shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            {isHi ? "इंटरएक्टिव कृषि केंद्र" : "FARMER'S INTERACTIVE HUB"}
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-brand-green-deep tracking-tight">
            {isHi ? "बायोचार कृषि सिमुलेशन" : "Explore Biochar Benefits In Real-Time"}
          </h2>
          <p className="text-xs sm:text-sm text-brand-text-muted max-w-2xl font-bold">
            {isHi 
              ? "नीचे दिए गए टैब पर क्लिक करें और देखें कि बायोचार आपकी मिट्टी, सिंचाई, बचत और फसल की गुणवत्ता को कैसे बदलता है।" 
              : "Click the tabs below to simulate how Biochar transforms your soil chemistry, reduces water loss, and boosts your income."}
          </p>
        </div>

        {/* Tab Navigation Menu */}
        <div className="relative flex justify-start md:justify-center border-b border-brand-green/15 pb-2 overflow-x-auto no-scrollbar px-4 md:px-0">
          <div className="flex gap-2 p-1 rounded-2xl bg-brand-green-light/25 border border-brand-green/10 shrink-0">
            {[
              { id: "soil", label: isHi ? "मृदा स्वास्थ्य" : "Soil Health", icon: <Sprout className="w-4 h-4" /> },
              { id: "water", label: isHi ? "जल संरक्षण" : "Water Savings", icon: <Droplets className="w-4 h-4" /> },
              { id: "calculator", label: isHi ? "बचत कैलकुलेटर" : "Profit Calculator", icon: <TrendingDown className="w-4 h-4" /> },
              { id: "roadmap", label: isHi ? "हमारी योजना" : "Future Roadmap", icon: <Milestone className="w-4 h-4" /> }
            ].map((tab) => {
              const isActive = activeHubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveHubTab(tab.id as any)}
                  className="relative px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 focus:outline-none shrink-0 z-0"
                  style={{ color: isActive ? "#fff" : "var(--primary-deep)" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeHubTabPill"
                      className="absolute inset-0 bg-brand-green-deep rounded-xl shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Stage */}
        <div className="bg-brand-beige-panel/40 border border-brand-green/10 rounded-3xl p-6 md:p-8 min-h-[420px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeHubTab === "soil" && (
              <motion.div
                key="soil-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full items-center"
              >
                {/* Left Side Content */}
                <div className="flex flex-col gap-6 text-left">
                  <div>
                    <span className="text-[10px] font-black text-brand-green uppercase tracking-wider block mb-1">
                      {isHi ? "भाग 1: मृदा संवर्धन" : "PART 1: SOIL ENRICHMENT"}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-brand-green-deep leading-tight">
                      {t("pages.home.biocharTitle")}
                    </h3>
                    <p className="text-xs text-brand-text-muted font-bold mt-2 leading-relaxed">
                      {t("pages.home.biocharSummary")}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {biocharPoints.map((point, index) => (
                      <FeatureCard key={index} title={point} index={index} />
                    ))}
                  </div>
                </div>

                {/* Right Side Comparison Widget */}
                <div className="flex flex-col gap-4 w-full">
                  <div className="relative flex gap-1 bg-brand-green-light/40 border border-brand-green/10 p-1 rounded-full w-full max-w-xs mx-auto z-0">
                    <button
                      onClick={() => setSoilState("before")}
                      className="relative flex-1 py-1.5 px-3 rounded-full text-[10px] font-black transition-all focus:outline-none"
                      style={{ color: soilState === "before" ? "#fff" : "var(--primary-deep)" }}
                    >
                      {soilState === "before" && (
                        <motion.span
                          layoutId="tabSoilSelection"
                          className="absolute inset-0 bg-red-600 rounded-full shadow"
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                      <span className="relative z-10">{isHi ? "बायोचार के बिना" : "Before"}</span>
                    </button>
                    <button
                      onClick={() => setSoilState("after")}
                      className="relative flex-1 py-1.5 px-3 rounded-full text-[10px] font-black transition-all focus:outline-none"
                      style={{ color: soilState === "after" ? "#fff" : "var(--primary-deep)" }}
                    >
                      {soilState === "after" && (
                        <motion.span
                          layoutId="tabSoilSelection"
                          className="absolute inset-0 bg-brand-green-deep rounded-full shadow"
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                      <span className="relative z-10">{isHi ? "बायोचार के साथ" : "After"}</span>
                    </button>
                  </div>

                  <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={tiltStyle}
                    className="relative rounded-2xl bg-white p-4 border border-brand-green/10 shadow-premium overflow-hidden sm:aspect-[4/3] w-full flex flex-col justify-between"
                  >
                    <div className="relative flex-grow rounded-xl overflow-hidden mb-3 bg-brand-beige-deep h-48 sm:h-56">
                      <AnimatePresence mode="wait">
                        {soilState === "before" ? (
                          <motion.div
                            key="soil-image-before"
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0"
                          >
                            <img
                              className="w-full h-full object-cover grayscale contrast-125 saturate-50 sepia-[0.1]"
                              src="/images/dry-untreated-soil.webp"
                              alt="Untreated soil"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 via-transparent to-transparent pointer-events-none" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="soil-image-after"
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0"
                          >
                            <img
                              className="w-full h-full object-cover"
                              src="/images/rich-biochar-soil.webp"
                              alt="Biochar soil"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-green-deep/40 via-transparent to-transparent pointer-events-none" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="absolute top-3 left-3 z-20">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-sm border ${
                          soilState === "before" ? "bg-red-600 border-red-500" : "bg-brand-green border-brand-green/30"
                        }`}>
                          {soilState === "before"
                            ? (isHi ? "कमजोर सूखी मिट्टी" : "Untreated Soil")
                            : (isHi ? "समृद्ध बायोचार मिट्टी" : "Moist Biochar Soil")}
                        </span>
                      </div>
                    </div>

                    {/* Quick stats points */}
                    <div className="grid grid-cols-3 gap-3 border-t border-brand-green/5 pt-2 text-left">
                      {soilState === "before" ? (
                        <>
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black text-red-600 uppercase">{isHi ? "नमी रोक" : "Water Retention"}</span>
                            <span className="text-xs font-black text-brand-green-deep">15% ({isHi ? "कम" : "Low"})</span>
                          </div>
                          <div className="flex flex-col border-l border-brand-green/10 pl-3">
                            <span className="text-[9px] font-black text-red-600 uppercase">{isHi ? "पोषण स्तर" : "Nutrients"}</span>
                            <span className="text-xs font-black text-brand-green-deep">{isHi ? "लीचिंग" : "Leached"}</span>
                          </div>
                          <div className="flex flex-col border-l border-brand-green/10 pl-3">
                            <span className="text-[9px] font-black text-red-600 uppercase">{isHi ? "फसल जड़ें" : "Crop Roots"}</span>
                            <span className="text-xs font-black text-brand-green-deep">{isHi ? "कमज़ोर" : "Weak"}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black text-brand-green uppercase">{isHi ? "नमी रोक" : "Water Retention"}</span>
                            <span className="text-xs font-black text-brand-green-deep">85% ({isHi ? "6x स्पंज" : "6x Spongy"})</span>
                          </div>
                          <div className="flex flex-col border-l border-brand-green/10 pl-3">
                            <span className="text-[9px] font-black text-brand-green uppercase">{isHi ? "पोषण स्तर" : "Nutrients"}</span>
                            <span className="text-xs font-black text-brand-green-deep">{isHi ? "संरक्षित" : "Locked"}</span>
                          </div>
                          <div className="flex flex-col border-l border-brand-green/10 pl-3">
                            <span className="text-[9px] font-black text-brand-green uppercase">{isHi ? "फसल जड़ें" : "Crop Roots"}</span>
                            <span className="text-xs font-black text-brand-green-deep">{isHi ? "गहरी/मजबूत" : "Deep & Lush"}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeHubTab === "water" && (
              <motion.div
                key="water-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full items-center"
              >
                {/* Left Side Content */}
                <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                  <div>
                    <span className="text-[10px] font-black text-brand-green uppercase tracking-wider block mb-1">
                      {isHi ? "भाग 2: जल संचय" : "PART 2: WATER CONSERVATION"}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-brand-green-deep leading-tight">
                      {t("pages.home.irrigationTitle")}
                    </h3>
                    <p className="text-xs text-brand-text-muted font-bold mt-2 leading-relaxed">
                      {t("pages.home.irrigationSummary")}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {irrigationPoints.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl bg-white border border-brand-green/5 shadow-sm hover:border-brand-green/20 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                          <Droplets className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-brand-green-deep leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side Visual Reservoir */}
                <div className="lg:col-span-5 relative rounded-2xl bg-white p-4 border border-brand-green/10 shadow-premium overflow-hidden aspect-[4/3] w-full flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src="/images/soil-irrigation.webp"
                    alt="Irrigation savings demo"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Dynamic Water Reservoir Panel */}
                  <div className="absolute bottom-4 right-4 bg-white/95 border border-brand-green/15 p-4 rounded-xl shadow-premium flex flex-col items-center gap-2 relative z-10 w-40">
                    <span className="text-[9px] font-black text-brand-green uppercase tracking-wider">{isHi ? "नमी सूचकांक" : "Moisture Index"}</span>
                    <div className="relative w-full h-20 bg-blue-50 border border-blue-100 rounded-lg overflow-hidden flex items-end">
                      <motion.div
                        initial={{ height: "20%" }}
                        animate={{ height: "85%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-full bg-blue-400 opacity-80"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1 pointer-events-none">
                        <Droplets className="w-5 h-5 text-blue-600 animate-bounce mb-0.5" />
                        <span className="text-[10px] font-black text-blue-900">{isHi ? "85% नमी" : "85% Moisture"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeHubTab === "calculator" && (
              <motion.div
                key="calculator-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                {/* Double column Calculator Block */}
                <div className="flex flex-col md:flex-row gap-8 items-stretch w-full">
                  {/* Form controls */}
                  <div className="flex-1 flex flex-col gap-5 justify-between text-left">
                    <div>
                      <span className="inline-block px-3 py-1 text-[10px] font-black tracking-widest text-brand-green uppercase bg-brand-green/10 rounded-full mb-3">
                        {isHi ? "बचत अनुमान उपकरण" : "Savings Estimator"}
                      </span>
                      <h3 className="text-xl md:text-2xl font-extrabold text-brand-green-deep tracking-tight">
                        {isHi ? "बायोचार बचत कैलकुलेटर" : "Biochar Farmer Savings Calculator"}
                      </h3>
                      <p className="text-xs text-brand-text-muted font-bold mt-1 leading-relaxed">
                        {isHi ? "अपनी भूमि का आकार और फसल चुनकर देखें कि बायोचार से आपकी कितनी बचत और लाभ होगा।" : "Select your farm size and crop type to estimate the water, fertilizer, and yield benefits."}
                      </p>
                    </div>

                    {/* Farm size selection */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-brand-green uppercase tracking-wider pl-1">
                        {isHi ? "भूमि का आकार (एकड़):" : "Land Size (in Acres):"} <span className="text-brand-green-deep font-black">({farmSize} {isHi ? "एकड़" : "Acres"})</span>
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 5, 10].map((size) => (
                          <button
                            key={size}
                            onClick={() => setFarmSize(size)}
                            className={`flex-grow py-2 px-3 rounded-xl text-xs font-black transition-all border ${
                              farmSize === size
                                ? "bg-brand-green text-white border-transparent shadow-sm"
                                : "bg-white border-brand-green/15 text-brand-green-deep hover:bg-brand-green-light/40"
                            }`}
                          >
                            {size} {isHi ? "एकड़" : "Acres"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Crop Type Select */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="crop-select" className="text-xs font-black text-brand-green uppercase tracking-wider pl-1">
                        {isHi ? "फसल का प्रकार:" : "Select Crop Type:"}
                      </label>
                      <select
                        id="crop-select"
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                        className="w-full px-4 py-3 rounded-full border border-brand-green/20 focus:outline-none focus:border-brand-green bg-white text-sm font-semibold text-brand-text cursor-pointer"
                      >
                        <option value="wheat">{isHi ? "गेहूं (Wheat)" : "Wheat"}</option>
                        <option value="rice">{isHi ? "धान (Rice / Paddy)" : "Rice / Paddy"}</option>
                        <option value="sugarcane">{isHi ? "गन्ना (Sugarcane)" : "Sugarcane"}</option>
                        <option value="vegetables">{isHi ? "सब्जियां (Vegetables)" : "Vegetables"}</option>
                      </select>
                    </div>
                  </div>

                  {/* Outputs dashboard */}
                  <div className="flex-1 bg-brand-green-deep text-white rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-green/20 rounded-full blur-2xl pointer-events-none" />

                    <h4 className="text-xs font-black text-brand-accent-sunlight uppercase tracking-widest border-b border-white/10 pb-2 text-left">
                      {isHi ? "अनुमानित वार्षिक लाभ" : "Estimated Annual Benefits"}
                    </h4>

                    {/* Stat Rows */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-accent-sunlight shrink-0">
                          <Droplets className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-[10px] text-white/60 font-black uppercase tracking-wider">{isHi ? "सिंचाई जल की बचत" : "Water Savings"}</span>
                          <strong className="text-lg font-black text-white">
                            {waterSavingsAmount.toLocaleString()} {isHi ? "लीटर" : "Liters"}
                          </strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-accent-sunlight shrink-0">
                          <TrendingDown className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-[10px] text-white/60 font-black uppercase tracking-wider">{isHi ? "खाद लागत में बचत" : "Fertilizer Savings"}</span>
                          <strong className="text-lg font-black text-white">
                            ₹{fertilizerSavingsAmount.toLocaleString()} / {isHi ? "वर्ष" : "Yr"}
                          </strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-accent-sunlight shrink-0">
                          <Sprout className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-[10px] text-white/60 font-black uppercase tracking-wider">{isHi ? "संभावित फसल उपज वृद्धि" : "Est. Yield Increase"}</span>
                          <strong className="text-lg font-black text-white">
                            {cropType === "vegetables" ? "20% - 25%" : "15% - 20%"} {isHi ? "अतिरिक्त" : "More"}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Circular soil health index gauge */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4 mt-2">
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] text-white/50 font-black uppercase tracking-wider">
                          {isHi ? "मृदा स्वास्थ्य सुधार" : "Soil Health Improvement"}
                        </span>
                        <strong className="text-base font-black text-white mt-0.5">
                          {yieldIncreasePercentage}
                        </strong>
                        <span className="text-[8px] text-brand-accent-sunlight font-bold mt-0.5">
                          {isHi ? "मृदा जल धारण क्षमता में वृद्धि" : "Increase in soil water index"}
                        </span>
                      </div>

                      {/* Dynamic SVG gauge */}
                      <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="24" cy="24" r="20" className="stroke-white/10" strokeWidth="3.5" fill="transparent" />
                          <motion.circle
                            cx="24"
                            cy="24"
                            r="20"
                            className="stroke-brand-accent-sunlight"
                            strokeWidth="3.5"
                            fill="transparent"
                            strokeDasharray={125.6}
                            initial={{ strokeDashoffset: 125.6 }}
                            animate={{ strokeDashoffset: 125.6 - (125.6 * (cropType === "sugarcane" ? 0.92 : cropType === "rice" ? 0.88 : 0.85)) }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-brand-accent-sunlight">
                          {yieldIncreasePercentage}
                        </div>
                      </div>
                    </div>

                    <p className="text-[9px] font-bold text-white/50 leading-snug border-t border-white/10 pt-2 text-left mt-2">
                      * {isHi
                        ? "नोट: वास्तविक परिणाम मिट्टी की गुणवत्ता, स्थानीय मौसम और बायोचार अनुप्रयोग दर के अनुसार भिन्न हो सकते हैं।"
                        : "Note: actual results may vary depending on baseline soil health, local weather conditions, and application rate."}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeHubTab === "roadmap" && (
              <motion.div
                key="roadmap-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-10 w-full"
              >
                {/* Brand Pillars & Roadmap */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  {/* Next steps timeline */}
                  <div className="flex flex-col gap-5 text-left">
                    <div>
                      <span className="text-[10px] font-black text-brand-green uppercase tracking-wider block mb-1">
                        {isHi ? "चरण-वार कृषि रोलआउट" : "STEP-BY-STEP FARM ROLLOUT"}
                      </span>
                      <h3 className="text-lg font-black text-brand-green-deep">
                        {t("ui.section.nextStepsTitle", "Our Farmer Outreach Roadmap")}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-4">
                      {ecosystemPoints.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-3.5 items-start p-4 rounded-xl bg-white border border-brand-green/5 shadow-sm"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-green/10 text-brand-green shrink-0">
                            <span className="text-xs font-black">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-brand-green-deep">{item.title}</h4>
                            <p className="text-[11px] text-brand-text-muted mt-1 leading-snug font-bold">{item.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Brand Pillars */}
                  <div className="flex flex-col gap-5 text-left border-t md:border-t-0 md:border-l border-brand-green/10 pt-5 md:pt-0 md:pl-8">
                    <div>
                      <span className="text-[10px] font-black text-brand-green uppercase tracking-wider block mb-1">
                        {isHi ? "मुख्य कृषि स्तंभ" : "CORE AGRICULTURAL PILLARS"}
                      </span>
                      <h3 className="text-lg font-black text-brand-green-deep">
                        {t("ui.section.brandPillars", "Core Mission Priorities")}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-3.5">
                      {brandPillars.map((pillar, idx) => {
                        const icons = [
                          <Droplets className="w-5 h-5 text-brand-green" key="drop" />,
                          <TrendingDown className="w-5 h-5 text-brand-green" key="trend" />,
                          <Star className="w-5 h-5 text-brand-green" key="star" />,
                        ];
                        return (
                          <div
                            key={idx}
                            className="flex gap-3.5 items-start p-4 rounded-xl bg-white border border-brand-green/5 shadow-sm"
                          >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-green-light shrink-0">
                              {icons[idx] || <Leaf className="w-5 h-5 text-brand-green" />}
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-brand-green-deep">{pillar.title}</h4>
                              <p className="text-[11px] text-brand-text-muted mt-1 leading-snug font-bold">{pillar.body}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* 4. Farmers Gain Benefits Grid */}
      <motion.section
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-10"
      >
        <SectionHeader
          eyebrow={t("pages.home.benefitTitle")}
          title={t("pages.home.benefitTitle")}
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitPoints.map((item, index) => (
            <BenefitCard key={index} title={item.title} description={item.body} />
          ))}
        </div>
      </motion.section>

      {/* 5. Promise Section */}
      <motion.section
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="rounded-3xl bg-brand-green-deep text-white p-8 md:p-12 shadow-premium relative overflow-hidden"
      >
        {/* Background ambient light */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-brown-warm/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto gap-8">
          <div className="flex flex-col gap-2">
            <span className="inline-block px-3 py-1 text-xs font-black tracking-widest text-brand-accent-sunlight uppercase bg-white/10 rounded-full w-fit mx-auto">
              {t("pages.home.promiseTitle")}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {t("pages.home.closingLine", "Smarter farming starts with BIO CHAR.")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
            {promisePoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/15"
              >
                <ShieldCheck className="w-5 h-5 text-brand-accent-sunlight flex-shrink-0" />
                <span className="text-sm font-extrabold">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
