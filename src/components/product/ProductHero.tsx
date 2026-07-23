import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Leaf, ShieldCheck, Droplets, Sprout, Play, RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { getAssetUrl } from "../../utils/url";

// Sparkline SVG Trend
const Sparkline: React.FC = () => (
  <svg className="w-16 h-6 text-brand-green opacity-70 mt-2 self-end" viewBox="0 0 60 20" fill="none">
    <path d="M2,18 Q15,12 25,14 T45,4 T58,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="58" cy="2" r="2" fill="currentColor" />
  </svg>
);

// Custom Interactive Card with 3D Tilt Effect
const InteractiveBenefitCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}> = ({ title, description, icon, index }) => {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    const rotateX = -(y / (box.height / 2)) * 10;
    const rotateY = (x / (box.width / 2)) * 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: "transform 0.05s ease-out",
      willChange: "transform",
      boxShadow: "0 20px 40px rgba(16, 32, 12, 0.12)"
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="p-5 rounded-3xl bg-white border border-brand-green/10 hover:border-brand-green/30 transition-all duration-300 flex flex-col gap-3 text-left shadow-sm select-none"
    >
      {/* Icon Wrapper */}
      <div className="w-14 h-14 flex items-center justify-center mb-1">
        {icon}
      </div>

      <div>
        <h4 className="text-xs font-black text-brand-green-deep tracking-tight mb-1">{title}</h4>
        <p className="text-[10px] font-semibold text-brand-text-muted leading-relaxed">{description}</p>
      </div>

      <Sparkline />
    </motion.div>
  );
};

export const ProductHero: React.FC = () => {
  const { t, i18n } = useTranslation("product");
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const isHi = i18n.language === "hi";

  const getLocalizedCrop = (cropName: string) => {
    const cropMap: Record<string, string> = {
      wheat: isHi ? "गेहूं" : "Wheat",
      rice: isHi ? "धान" : "Rice",
      sugarcane: isHi ? "गन्ना" : "Sugarcane",
      cotton: isHi ? "कपास" : "Cotton"
    };
    return cropMap[cropName] || cropName;
  };

  const [downloadUrl, setDownloadUrl] = useState("/downloads/Khaad_Bharat_Biochar_Photo_Guide.pdf");
  const [downloadName, setDownloadName] = useState("Khaad_Bharat_Biochar_Photo_Guide.pdf");

  useEffect(() => {
    if (isHi) {
      const hindiUrl = "/downloads/खाद_भारत_बायोचार_जानकारी_पुस्तिका.pdf";
      fetch(getAssetUrl(hindiUrl), { method: "HEAD" })
        .then((res) => {
          if (res.ok) {
            setDownloadUrl(hindiUrl);
            setDownloadName("खाद_भारत_बायोचार_जानकारी_पुस्तिका.pdf");
          } else {
            setDownloadUrl("/downloads/Khaad_Bharat_Biochar_Photo_Guide.pdf");
            setDownloadName("Khaad_Bharat_Biochar_Photo_Guide.pdf");
          }
        })
        .catch(() => {
          setDownloadUrl("/downloads/Khaad_Bharat_Biochar_Photo_Guide.pdf");
          setDownloadName("Khaad_Bharat_Biochar_Photo_Guide.pdf");
        });
    } else {
      setDownloadUrl("/downloads/Khaad_Bharat_Biochar_Photo_Guide.pdf");
      setDownloadName("Khaad_Bharat_Biochar_Photo_Guide.pdf");
    }
  }, [isHi]);

  // Simulation State variables
  const [activeView, setActiveView] = useState<"comparison" | "simulation">("comparison");
  const [selectedCrop, setSelectedCrop] = useState<"wheat" | "rice" | "sugarcane" | "cotton">("wheat");
  const [simStatus, setSimStatus] = useState<"idle" | "running" | "completed">("idle");

  const handleExploreClick = () => {
    const el = document.getElementById("product-gallery-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    const rotateX = -(y / (box.height / 2)) * 3;
    const rotateY = (x / (box.width / 2)) * 3;

    setTiltStyle({
      transform: `perspective(1800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
      transition: "transform 0.15s ease-out",
      willChange: "transform"
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
    });
  };

  const startSimulation = () => {
    setSimStatus("running");
    setTimeout(() => {
      setSimStatus("completed");
    }, 3500);
  };

  const resetSimulation = () => {
    setSimStatus("idle");
  };

  // Crop simulation data
  const cropSimulationData = {
    wheat: {
      name: isHi ? "गेहूं (Wheat)" : "Wheat",
      dosage: isHi ? "1.5 - 2 टन / एकड़" : "1.5 - 2 tons / acre",
      yield: "+18%",
      waterSaved: isHi ? "4 सिंचाई चक्र कम" : "4 watering cycles saved",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      borderColor: "border-amber-500/20"
    },
    rice: {
      name: isHi ? "धान (Rice)" : "Rice / Paddy",
      dosage: isHi ? "2 - 2.5 टन / एकड़" : "2 - 2.5 tons / acre",
      yield: "+22%",
      waterSaved: isHi ? "6 सिंचाई चक्र कम" : "6 watering cycles saved",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20"
    },
    sugarcane: {
      name: isHi ? "गन्ना (Sugarcane)" : "Sugarcane",
      dosage: isHi ? "3 - 4 टन / एकड़" : "3 - 4 tons / acre",
      yield: "+30%",
      waterSaved: isHi ? "8 सिंचाई चक्र कम" : "8 watering cycles saved",
      color: "text-green-600",
      bg: "bg-green-600/10",
      borderColor: "border-green-600/20"
    },
    cotton: {
      name: isHi ? "कपास (Cotton)" : "Cotton",
      dosage: isHi ? "2 टन / एकड़" : "2 tons / acre",
      yield: "+20%",
      waterSaved: isHi ? "5 सिंचाई चक्र कम" : "5 watering cycles saved",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      borderColor: "border-blue-400/20"
    }
  };

  // Mockup Benefits Cards
  const mockupBenefits = [
    {
      title: isHi ? "जल संचयन" : "Water Retention",
      description: isHi 
        ? "जड़ों में नमी बनाए रखने के लिए, अपने वजन से 6 गुना तक पानी रोकता है।" 
        : "Holds up to 6x its weight in water, keeping soil moist longer.",
      icon: (
        <svg className="w-12 h-12 text-blue-500 filter drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <text x="12" y="16" fill="white" fontSize="6.5" fontWeight="900" textAnchor="middle">6x</text>
        </svg>
      )
    },
    {
      title: isHi ? "बेहतर उपज" : "Better Yields",
      description: isHi 
        ? "अधिक उत्पादकता के लिए मिट्टी की उर्वरता और संरचना में सुधार करता है।" 
        : "Improves soil fertility and structure for higher productivity.",
      icon: (
        <svg className="w-12 h-12 text-brand-green filter drop-shadow-md" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="18" rx="8" ry="3" fill="#654321" />
          <path d="M12,17 Q11,10 12,6" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M12,12 Q7,10 9,7 Q11,7 12,12" fill="#22c55e" />
          <path d="M12,9 Q17,7 15,4 Q13,4 12,9" fill="#15803d" />
        </svg>
      )
    },
    {
      title: isHi ? "पोषक तत्व संरक्षण" : "Nutrient Protection",
      description: isHi 
        ? "पोषक तत्वों को बहने से रोकता है और खादों को अधिक प्रभावी बनाता है।" 
        : "Prevents nutrient leaching and makes fertilizers more effective.",
      icon: (
        <svg className="w-12 h-12 text-brand-green filter drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#22c55e" stroke="#15803d" />
          <path d="M12,7 Q10,12 12,17 Q14,12 12,7" fill="white" />
        </svg>
      )
    },
    {
      title: isHi ? "लागत में कमी" : "Reduce Costs",
      description: isHi 
        ? "दक्षता में सुधार करता है और समग्र कृषि खर्चों को कम करता है।" 
        : "Improves efficiency and reduces overall farming expenses.",
      icon: (
        <svg className="w-12 h-12 text-brand-brown-warm filter drop-shadow-md" viewBox="0 0 24 24" fill="none">
          <path d="M7 11c0-3.3 2.7-6 6-6s6 2.7 6 6c0 5.5-3.5 8-6 8s-6-2.5-6-8z" fill="#85bb65" />
          <ellipse cx="13" cy="5" rx="3" ry="1.5" fill="#558833" />
          <text x="13" y="14" fill="white" fontSize="8" fontWeight="900" textAnchor="middle">₹</text>
        </svg>
      )
    },
    {
      title: isHi ? "धरती के लिए बेहतर" : "Better for Earth",
      description: isHi 
        ? "मिट्टी में कार्बन को लॉक करता है और पर्यावरणीय प्रभाव को कम करता है।" 
        : "Locks carbon in soil and reduces environmental impact.",
      icon: (
        <svg className="w-12 h-12 text-blue-400 filter drop-shadow-md" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" fill="#3b82f6" />
          <path d="M9 7c1 0 2 1 2 2s1 2 2 2h2v1c0 2-2 3-4 3H8v-2H6V9l3-2z" fill="#22c55e" />
          <path d="M14 14c1 0 2 1 1 2s-1 1-2 1v1h-1v-2l2-2z" fill="#22c55e" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-12 mb-6">
      {/* Hero Section Container */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-green-light/40 to-transparent py-16 sm:py-20 rounded-3xl border border-brand-green/10">
        {/* Background soft gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green-light/60 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-brown-soft/20 rounded-full blur-3xl opacity-30 -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 mb-6"
            >
              <Leaf className="w-4 h-4 text-brand-green animate-pulse" />
              <span className="text-xs font-black text-brand-green uppercase tracking-widest">
                {t("hero.badge", "KHAAD BHARAT BIOCHAR")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-green-deep leading-tight tracking-tight mb-4"
            >
              {t("hero.title", "Natural BIO CHAR for Smarter Farming")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl font-bold text-brand-brown-warm mb-4"
            >
              {t("hero.subtitle", "Improve soil. Save water. Support better yields.")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm font-semibold text-brand-text-muted leading-relaxed mb-8 max-w-xl"
            >
              {t("hero.description", "KHAAD BHARAT BIOCHAR is a natural carbon-rich soil enhancer designed to help Indian farmers improve soil quality, retain moisture, and reduce farming costs.")}
            </motion.p>

            {/* Call-to-actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={handleExploreClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-black text-white bg-brand-green hover:bg-brand-green-deep shadow-premium hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-0.5 group cursor-pointer"
              >
                <span>{t("hero.ctaExplore", "Explore Benefits")}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={getAssetUrl(downloadUrl)}
                download={downloadName}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-black text-brand-green-deep bg-white hover:bg-brand-green-light border border-brand-green/20 hover:border-brand-green/40 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>{t("hero.ctaDownload", "Download Product Guide")}</span>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-brand-text-muted/70 mt-6 font-bold flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              {t("hero.subtext", "Powered by JSL Enterprises")}
            </motion.p>
          </div>

          {/* Right Column: Interactive Circular globe & simulator tabs */}
          <div className="lg:col-span-5 flex flex-col items-center gap-4 relative z-10 w-full max-w-md mx-auto">
            
            {/* If Simulator Mode is active, show selector at the top OUTSIDE the circle */}
            {activeView === "simulation" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col items-center gap-2 mb-2"
              >
                <span className="text-xs font-black text-brand-green-deep uppercase tracking-widest bg-brand-green/10 border border-brand-green/15 px-3 py-1 rounded-full">
                  {isHi ? "जैविक विकास सिम्युलेटर" : "Lush Growth Simulator"}
                </span>
                
                {/* Crop Selector Tabs */}
                <div className="flex gap-1.5 bg-brand-green-light/45 p-1 rounded-full border border-brand-green/15 w-full justify-between max-w-sm shadow-sm">
                  {(["wheat", "rice", "sugarcane", "cotton"] as const).map((crop) => (
                    <button
                      key={crop}
                      disabled={simStatus === "running"}
                      onClick={() => {
                        setSelectedCrop(crop);
                        setSimStatus("idle");
                      }}
                      className={`px-3.5 py-1 rounded-full text-xs font-black tracking-wide transition-all capitalize cursor-pointer ${
                        selectedCrop === crop
                          ? "bg-brand-green text-white shadow"
                          : "text-brand-green-deep hover:bg-brand-green/10"
                      }`}
                    >
                      {getLocalizedCrop(crop)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* The main tilting globe container */}
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={tiltStyle}
              className="relative w-[340px] h-[340px] select-none scale-[0.8] xs:scale-90 sm:scale-95 md:scale-100 origin-center my-4 lg:my-0"
            >
              <AnimatePresence mode="wait">
                {activeView === "comparison" ? (
                  /* VIEW A: Soil Comparison Globe (Mockup Layout) */
                  <motion.div
                    key="comparison-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    {/* Outer Circle Container (overflow hidden, handles reflection and solid shapes) */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#edebe1] via-[#f7f5ee] to-white border border-[#d8d4c5] shadow-premium overflow-hidden flex items-center justify-center p-4">
                      
                      {/* Lattice pattern backdrop */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2c5234_1px,transparent_1px)] [background-size:14px_14px]" />

                      {/* 3D Isometric Soil Slab Block matching the Mockup */}
                      <div className="relative z-10 w-full max-w-[280px] aspect-square flex flex-col items-center justify-center mt-6">
                        <svg className="w-[230px] h-[230px]" viewBox="0 0 200 200">
                          {/* Animation styles */}
                          <style>{`
                            @keyframes dashFlow {
                              to { stroke-dashoffset: -14; }
                            }
                            .flow-arrows-line {
                              animation: dashFlow 1.2s infinite linear;
                            }
                            @keyframes pulseHalo {
                              0%, 100% { transform: scale(1); opacity: 0.2; }
                              50% { transform: scale(1.15); opacity: 0.45; }
                            }
                            .halo-glow {
                              animation: pulseHalo 2.5s infinite ease-in-out;
                              transform-origin: 100px 102px;
                            }
                          `}</style>

                          {/* Left Half Top Surface (Dark charcoal-black soil) */}
                          <path d="M100,65 L45,82 L100,102 Z" fill="#1d1813" stroke="#15100c" strokeWidth="0.5" />
                          
                          {/* Right Half Top Surface (Warm brown soil) */}
                          <path d="M100,65 L155,82 L100,102 Z" fill="#543f30" stroke="#433226" strokeWidth="0.5" />

                          {/* Front Left Face (Dark soil) */}
                          <path d="M45,82 L100,102 L100,132 L45,112 Z" fill="#15100c" />
                          
                          {/* Front Right Face (Brown soil) */}
                          <path d="M100,102 L155,82 L155,112 L100,132 Z" fill="#433226" />

                          {/* Symmetrical Central Plant Stalk (Detailed stem texture) */}
                          <path d="M100,72 C99,56 100,42 100,28" fill="none" stroke="#1b4332" strokeWidth="3.5" strokeLinecap="round" />
                          <path d="M100,72 C99.5,56 100,42 100,28" fill="none" stroke="#40916c" strokeWidth="1" strokeLinecap="round" />

                          {/* Symmetrical Lush Realistic Leaves (Split halves + veins + petiole nodes) */}
                          {/* Leaf 1 (Top Center) */}
                          <g>
                            <path d="M100,28 C96,18 97,10 100,4 Z" fill="#40916c" />
                            <path d="M100,28 C104,18 103,10 100,4 Z" fill="#52b788" />
                            <path d="M100,28 L100,6" fill="none" stroke="#d8f3dc" strokeWidth="0.8" opacity="0.8" />
                            <path d="M100,22 Q97,19 97,17" fill="none" stroke="#d8f3dc" strokeWidth="0.5" opacity="0.6" />
                            <path d="M100,22 Q103,19 103,17" fill="none" stroke="#d8f3dc" strokeWidth="0.5" opacity="0.6" />
                            <path d="M100,16 Q98,13 98,12" fill="none" stroke="#d8f3dc" strokeWidth="0.5" opacity="0.6" />
                            <path d="M100,16 Q102,13 102,12" fill="none" stroke="#d8f3dc" strokeWidth="0.5" opacity="0.6" />
                          </g>

                          {/* Leaf 2 (Upper Left) */}
                          <g>
                            <path d="M100,38 C88,34 82,24 82,18 Z" fill="#2d6a4f" />
                            <path d="M100,38 C92,30 92,20 82,18 Z" fill="#40916c" />
                            <path d="M100,38 Q91,28 84,20" fill="none" stroke="#b7e4c7" strokeWidth="0.8" opacity="0.8" />
                            <path d="M94,32 Q88,29 86,25" fill="none" stroke="#b7e4c7" strokeWidth="0.5" opacity="0.6" />
                            <path d="M90,26 Q86,22 84,19" fill="none" stroke="#b7e4c7" strokeWidth="0.5" opacity="0.6" />
                          </g>

                          {/* Leaf 3 (Upper Right) */}
                          <g>
                            <path d="M100,38 C108,30 108,20 118,18 Z" fill="#1b4332" />
                            <path d="M100,38 C112,34 118,24 118,18 Z" fill="#2d6a4f" />
                            <path d="M100,38 Q109,28 116,20" fill="none" stroke="#b7e4c7" strokeWidth="0.8" opacity="0.8" />
                            <path d="M94,32 Q100,29 102,25" fill="none" stroke="#b7e4c7" strokeWidth="0.5" opacity="0.6" />
                            <path d="M90,26 Q94,22 96,19" fill="none" stroke="#b7e4c7" strokeWidth="0.5" opacity="0.6" />
                          </g>

                          {/* Leaf 4 (Lower Left) */}
                          <g>
                            <path d="M100,48 C84,46 76,40 78,32 Z" fill="#2d6a4f" />
                            <path d="M100,48 C90,40 88,34 78,32 Z" fill="#40916c" />
                            <path d="M100,48 Q88,40 80,34" fill="none" stroke="#b7e4c7" strokeWidth="0.8" opacity="0.8" />
                            <path d="M92,42 Q83,39 82,35" fill="none" stroke="#b7e4c7" strokeWidth="0.5" opacity="0.6" />
                          </g>

                          {/* Leaf 5 (Lower Right) */}
                          <g>
                            <path d="M100,48 C110,40 112,34 122,32 Z" fill="#1b4332" />
                            <path d="M100,48 C116,46 124,40 122,32 Z" fill="#2d6a4f" />
                            <path d="M100,48 Q112,40 120,34" fill="none" stroke="#b7e4c7" strokeWidth="0.8" opacity="0.8" />
                            <path d="M92,42 Q101,39 102,35" fill="none" stroke="#b7e4c7" strokeWidth="0.5" opacity="0.6" />
                          </g>

                          {/* Petal nodes at joints */}
                          <circle cx="100" cy="38" r="1.8" fill="#95d5b2" />
                          <circle cx="100" cy="48" r="1.8" fill="#95d5b2" />

                          {/* Roots splitting down center */}
                          {/* Left healthy deep roots */}
                          <path d="M100,72 Q86,88 74,96" fill="none" stroke="#6b5344" strokeWidth="2.2" strokeLinecap="round" />
                          <path d="M100,72 Q92,94 85,116" fill="none" stroke="#523d30" strokeWidth="2" strokeLinecap="round" />
                          <path d="M86,88 Q74,98 62,102" fill="none" stroke="#6b5344" strokeWidth="1.5" strokeLinecap="round" />
                          {/* Right shallow sparse roots */}
                          <path d="M100,72 Q112,82 118,89" fill="none" stroke="#8c6c53" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M100,72 Q106,88 108,96" fill="none" stroke="#8c6c53" strokeWidth="1.2" strokeLinecap="round" />

                          {/* Split center line separator */}
                          <line x1="100" y1="65" x2="100" y2="132" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.3" />

                          {/* Flow loops (Right-to-Left conversion arrows) */}
                          {/* Right to Center dashed arc */}
                          <path
                            d="M 148,96 C 132,108 120,108 100,102"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="2.2"
                            strokeDasharray="4 3"
                            strokeLinecap="round"
                            className="flow-arrows-line"
                            style={{ strokeDashoffset: 0 }}
                          />
                          {/* Center to Left dashed arc */}
                          <path
                            d="M 100,102 C 80,96 68,96 52,96"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="2.2"
                            strokeDasharray="4 3"
                            strokeLinecap="round"
                            className="flow-arrows-line"
                            style={{ strokeDashoffset: 0 }}
                          />

                          {/* Glowing green halo behind center play button */}
                          <circle cx="100" cy="102" r="18" fill="#22c55e" className="halo-glow" />
                        </svg>
                      </div>
                    </div>

                    {/* Left Side Overlay Info */}
                    <div className="absolute left-3 top-[25%] z-20 flex flex-col items-start gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-brand-green text-white text-[8px] font-black uppercase tracking-wider shadow">
                        {isHi ? "बायोचार के साथ" : "With Biochar"}
                      </span>
                      <div className="flex flex-col gap-1.5 mt-1 bg-white/95 backdrop-blur-sm p-2 rounded-xl border border-brand-green/10 text-left shadow-sm">
                        <span className="text-[7.5px] font-black text-brand-green-deep flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-brand-green/15 flex items-center justify-center text-brand-green">
                            <Droplets className="w-2 h-2" />
                          </span>
                          {isHi ? "बेहतर नमी धारण" : "Better Water Retention"}
                        </span>
                        <span className="text-[7.5px] font-black text-brand-green-deep flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-brand-green/15 flex items-center justify-center text-brand-green">
                            <ShieldCheck className="w-2 h-2" />
                          </span>
                          {isHi ? "पोषक तत्व संरक्षण" : "Nutrient Protection"}
                        </span>
                        <span className="text-[7.5px] font-black text-brand-green-deep flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-brand-green/15 flex items-center justify-center text-brand-green">
                            <Sprout className="w-2 h-2" />
                          </span>
                          {isHi ? "बेहतर मिट्टी संरचना" : "Improved Soil Structure"}
                        </span>
                      </div>
                    </div>

                    {/* Right Side Overlay Info */}
                    <div className="absolute right-3 top-[25%] z-20 flex flex-col items-end gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-[#5c4a3c] text-white text-[8px] font-black uppercase tracking-wider shadow">
                        {isHi ? "बायोचार के बिना" : "Without Biochar"}
                      </span>
                      <div className="flex flex-col gap-1.5 mt-1 bg-white/95 backdrop-blur-sm p-2 rounded-xl border border-[#5c4a3c]/10 text-right shadow-sm">
                        <span className="text-[7.5px] font-black text-[#5c4a3c] flex items-center gap-1.5 justify-end">
                          {isHi ? "पानी का नुकसान" : "Water Loss"}
                          <span className="w-3.5 h-3.5 rounded-full bg-[#5c4a3c]/15 flex items-center justify-center text-[#5c4a3c]">
                            <Droplets className="w-2 h-2" />
                          </span>
                        </span>
                        <span className="text-[7.5px] font-black text-[#5c4a3c] flex items-center gap-1.5 justify-end">
                          {isHi ? "पोषक तत्वों का रिसाव" : "Nutrient Leaching"}
                          <span className="w-3.5 h-3.5 rounded-full bg-[#5c4a3c]/15 flex items-center justify-center text-[#5c4a3c]">
                            <AlertTriangle className="w-2 h-2" />
                          </span>
                        </span>
                        <span className="text-[7.5px] font-black text-[#5c4a3c] flex items-center gap-1.5 justify-end">
                          {isHi ? "खराब मिट्टी संरचना" : "Poor Soil Structure"}
                          <span className="w-3.5 h-3.5 rounded-full bg-[#5c4a3c]/15 flex items-center justify-center text-[#5c4a3c]">
                            <Sprout className="w-2 h-2" />
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Central Interactive Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-25 mt-12">
                      <button
                        onClick={() => {
                          setActiveView("simulation");
                          setSimStatus("idle");
                        }}
                        className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer z-30 pulse-button"
                        style={{
                          boxShadow: "0 4px 10px rgba(34, 197, 94, 0.3)",
                        }}
                      >
                        <Play className="w-3.5 h-3.5 text-brand-green fill-current ml-0.5" />
                      </button>
                    </div>

                    {/* Floating Badge 1: Water Saver */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="absolute -top-3 -right-6 bg-white/95 backdrop-blur-sm border border-brand-green/10 p-2.5 rounded-2xl shadow-premium flex items-center gap-2.5 z-30"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                        <Droplets className="w-4.5 h-4.5 animate-bounce" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] font-black text-brand-green-deep">{isHi ? "जल संचयी" : "Water Saver"}</span>
                        <span className="text-[9px] text-brand-text-muted font-bold">{isHi ? "6 गुना तक अवशोषण" : "Up to 6x absorption"}</span>
                      </div>
                    </motion.div>

                    {/* Floating Badge 2: Biochar Activated */}
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                      className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm border border-brand-green/10 p-2.5 rounded-2xl shadow-premium flex items-center gap-2.5 z-30 w-[190px]"
                    >
                      <div className="w-8 h-8 rounded-xl bg-brand-green-light flex items-center justify-center text-brand-green">
                        <Leaf className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] font-black text-brand-green-deep">{isHi ? "बायोचार सक्रिय" : "BIOCHAR ACTIVATED"}</span>
                        <span className="text-[9px] text-brand-brown-warm font-black">{isHi ? "100% जैविक कार्बन" : "100% ORGANIC CARBON"}</span>
                      </div>
                    </motion.div>

                    {/* Floating Badge 3: Rich Microbes */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.8 }}
                      className="absolute bottom-1 -right-6 bg-white/95 backdrop-blur-sm border border-brand-green/10 p-2.5 rounded-2xl shadow-premium flex items-center gap-2.5 z-30"
                    >
                      <div className="w-8 h-8 rounded-xl bg-brand-green/5 flex items-center justify-center text-brand-green">
                        <Sprout className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] font-black text-brand-green-deep">{isHi ? "सक्रिय जीवाणु" : "Rich Microbes"}</span>
                        <span className="text-[9px] text-brand-text-muted font-bold">{isHi ? "स्वस्थ जड़ क्षेत्र" : "Healthy Rootzone"}</span>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  /* VIEW B: Realistic Growth & Hydration Simulation (Visuals Only) */
                  <motion.div
                    key="simulator-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#edebe1] via-[#f7f5ee] to-white border border-[#d8d4c5] shadow-premium overflow-hidden flex items-center justify-center p-4"
                  >
                    {/* Honeycomb lattice backdrop */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2c5234_1px,transparent_1px)] [background-size:14px_14px]" />

                    {/* Symmetrical Soil block & central plant morphing */}
                    <div className="relative z-10 w-full max-w-[280px] aspect-square flex flex-col items-center justify-center mt-6">
                      <svg className="w-[230px] h-[230px]" viewBox="0 0 200 200">
                        {/* Simulation Animations CSS Style definitions */}
                        <style>{`
                          @keyframes simulationRain {
                            0% { transform: translateY(-30px); opacity: 0; }
                            20% { opacity: 1; }
                            80% { opacity: 0.8; }
                            100% { transform: translateY(110px); opacity: 0; }
                          }
                          .rain-particle-1 { animation: simulationRain 1.2s infinite linear; }
                          .rain-particle-2 { animation: simulationRain 0.9s infinite linear 0.3s; }
                          .rain-particle-3 { animation: simulationRain 1.4s infinite linear 0.15s; }
                          .rain-particle-4 { animation: simulationRain 1.1s infinite linear 0.45s; }

                          @keyframes waterAbsorb {
                            0% { transform: scale(1); filter: drop-shadow(0 0 1px #3b82f6); opacity: 0.6; }
                            50% { transform: scale(1.25); filter: drop-shadow(0 0 5px #60a5fa); opacity: 1; }
                            100% { transform: scale(1); filter: drop-shadow(0 0 1px #3b82f6); opacity: 0.6; }
                          }
                          .water-pore-glowing { animation: waterAbsorb 1.5s infinite ease-in-out; }
                        `}</style>

                        {/* Left Half Top Surface (Dark charcoal-black soil) */}
                        <path d="M100,65 L45,82 L100,102 Z" fill="#1d1813" stroke="#15100c" strokeWidth="0.5" />
                        
                        {/* Right Half Top Surface (Warm brown soil) */}
                        <path d="M100,65 L155,82 L100,102 Z" fill="#543f30" stroke="#433226" strokeWidth="0.5" />

                        {/* Front Left Face (Dark soil) */}
                        <path d="M45,82 L100,102 L100,132 L45,112 Z" fill="#15100c" />
                        
                        {/* Front Right Face (Brown soil) */}
                        <path d="M100,102 L155,82 L155,112 L100,132 Z" fill="#433226" />

                        {/* Biochar Spherical Granules on Left Top Surface */}
                        <circle cx="72" cy="74" r="2.5" fill="#000" />
                        <circle cx="60" cy="88" r="2.5" fill="#000" />
                        <circle cx="85" cy="80" r="3" fill="#000" />
                        <circle cx="92" cy="94" r="2.5" fill="#000" />
                        <circle cx="78" cy="90" r="2.5" fill="#000" />

                        {/* Biochar Granules inside Left Front Face matrix */}
                        <circle cx="60" cy="100" r="2.5" fill="#000" />
                        <circle cx="75" cy="112" r="3.5" fill="#000" />
                        <circle cx="88" cy="122" r="2.5" fill="#000" />
                        <circle cx="52" cy="106" r="2" fill="#000" />

                        {/* Split center line separator */}
                        <line x1="100" y1="65" x2="100" y2="132" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.3" />

                        {/* Biochar Active Moisture glowing locks */}
                        {(simStatus === "running" || simStatus === "completed") && (
                          <g>
                            <circle cx="72" cy="74" r="1.5" fill="#3b82f6" className="water-pore-glowing" />
                            <circle cx="60" cy="88" r="1.5" fill="#3b82f6" className="water-pore-glowing" style={{ animationDelay: "0.4s" }} />
                            <circle cx="85" cy="80" r="1.8" fill="#3b82f6" className="water-pore-glowing" style={{ animationDelay: "0.8s" }} />
                          </g>
                        )}

                        {/* Falling Rain Particle Streams during simulation */}
                        {simStatus === "running" && (
                          <g className="rain-particles-layer">
                            {/* Falling drops */}
                            <circle cx="60" cy="30" r="1.3" fill="#3b82f6" className="rain-particle-1" />
                            <circle cx="85" cy="25" r="1.6" fill="#3b82f6" className="rain-particle-2" />
                            <circle cx="115" cy="28" r="1.3" fill="#3b82f6" className="rain-particle-3" />
                            <circle cx="140" cy="22" r="1.5" fill="#3b82f6" className="rain-particle-4" />
                            
                            {/* Right side water leaching indicator drops flowing out of the bottom */}
                            <circle cx="120" cy="115" r="1.3" fill="#3b82f6" className="rain-particle-2" />
                            <circle cx="145" cy="112" r="1.3" fill="#3b82f6" className="rain-particle-4" />
                          </g>
                        )}

                        {/* Traditional Wilting Plant (Right Side) */}
                        <g className="traditional-dry-crop" opacity="0.7">
                          {/* Stalk */}
                          <path d="M115,76 Q118,62 116,52" fill="none" stroke="#a16207" strokeWidth="1.5" />
                          <path d="M116,52 Q121,48 118,46 Q114,48 116,52" fill="#ca8a04" />
                          {/* Weak shallow roots */}
                          <path d="M115,76 Q110,81 107,85" fill="none" stroke="#a16207" strokeWidth="0.8" />
                        </g>

                        {/* Biochar Growing Plant (Left Side) */}
                        <g className="biochar-growth-crop">
                          {/* Dynamic root growth pathway based on simStatus */}
                          <path
                            d={
                              simStatus === "completed"
                                ? "M85,76 Q70,96 58,108 M85,76 L86,110 M72,88 Q60,98 50,102"
                                : "M85,76 Q75,86 70,90 M85,76 L85,92 M78,82 Q70,88 65,91"
                            }
                            fill="none"
                            stroke={simStatus === "completed" ? "#22c55e" : "#8c6c53"}
                            strokeWidth={simStatus === "completed" ? "2.2" : "1.5"}
                            style={{ transition: "all 3.5s ease-out" }}
                          />

                          {/* Dynamic Crop stalk & leaves based on crop choice */}
                          {selectedCrop === "wheat" && (
                            <g className="wheat-visual">
                              {/* Stalk */}
                              <path
                                d={simStatus === "completed" ? "M85,76 Q83,42 81,16" : "M85,76 Q84,50 83,32"}
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth={simStatus === "completed" ? "3" : "2"}
                                style={{ transition: "all 3.5s ease-out" }}
                              />
                              {/* Wheat ears (appear when complete) */}
                              {simStatus === "completed" && (
                                <g opacity="1" className="fade-in">
                                  <circle cx="81" cy="14" r="3" fill="#f59e0b" />
                                  <circle cx="78" cy="9" r="3" fill="#eab308" />
                                  <circle cx="84" cy="7" r="3" fill="#eab308" />
                                </g>
                              )}
                            </g>
                          )}

                          {selectedCrop === "rice" && (
                            <g className="rice-visual">
                              {/* Paddy stalks */}
                              <path
                                d={simStatus === "completed" ? "M85,76 Q75,38 72,20 M85,76 Q87,38 91,15" : "M85,76 Q78,48 76,32"}
                                fill="none"
                                stroke="#10b981"
                                strokeWidth={simStatus === "completed" ? "2.5" : "1.8"}
                                style={{ transition: "all 3.5s ease-out" }}
                              />
                              {simStatus === "completed" && (
                                <path d="M72,20 Q66,12 63,8 M91,15 Q97,8 95,4" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
                              )}
                            </g>
                          )}

                          {selectedCrop === "sugarcane" && (
                            <g className="sugarcane-visual">
                              {/* Tall sugarcane stalk */}
                              <path
                                d={simStatus === "completed" ? "M85,76 L87,10" : "M85,76 L86,38"}
                                fill="none"
                                stroke="#059669"
                                strokeWidth={simStatus === "completed" ? "4.5" : "3"}
                                style={{ transition: "all 3.5s ease-out" }}
                              />
                              {simStatus === "completed" && (
                                <g className="sugarcane-leaves">
                                  <path d="M87,10 Q67,0 60,-2" fill="none" stroke="#34d399" strokeWidth="1.8" />
                                  <path d="M87,10 Q107,3 113,0" fill="none" stroke="#059669" strokeWidth="1.8" />
                                </g>
                              )}
                            </g>
                          )}

                          {selectedCrop === "cotton" && (
                            <g className="cotton-visual">
                              {/* Branching stem */}
                              <path
                                d={simStatus === "completed" ? "M85,76 Q83,45 81,25" : "M85,76 Q84,52 83,38"}
                                fill="none"
                                stroke="#854d0e"
                                strokeWidth="2"
                                style={{ transition: "all 3.5s ease-out" }}
                              />
                              {simStatus === "completed" && (
                                <g className="cotton-balls">
                                  <path d="M83,48 Q67,40 63,38 M82,36 Q99,26 103,25" fill="none" stroke="#854d0e" strokeWidth="1.5" />
                                  <circle cx="63" cy="38" r="5" fill="#fff" stroke="#d1d5db" />
                                  <circle cx="103" cy="25" r="5" fill="#fff" stroke="#d1d5db" />
                                  <circle cx="81" cy="25" r="7.5" fill="#fff" stroke="#d1d5db" />
                                </g>
                              )}
                            </g>
                          )}
                        </g>
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* If Simulator Mode is active, show stats and action buttons OUTSIDE below the globe */}
            {activeView === "simulation" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col gap-4 mt-2 max-w-sm"
              >
                {/* Simulate Button (Show if idle) */}
                {simStatus === "idle" && (
                  <button
                    onClick={startSimulation}
                    className="w-full py-3.5 rounded-full bg-brand-green hover:bg-brand-green-deep text-white text-xs font-black tracking-wider uppercase hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-premium"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    {isHi ? "सिमुलेशन शुरू करें" : "Start Simulation"}
                  </button>
                )}

                {/* Running status bar */}
                {simStatus === "running" && (
                  <div className="flex flex-col items-center bg-white/80 border border-brand-green/10 rounded-2xl p-4 gap-2 w-full shadow-sm text-center">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-500 animate-bounce" />
                      <span className="text-xs font-black text-brand-green-deep tracking-widest uppercase animate-pulse">
                        {isHi ? "मिट्टी पानी सोख रही है..." : "Hydrating Soil Matrix..."}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-brand-green-light rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.5, ease: "linear" }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* Guidance Cards & Controls (Show when completed) */}
                {simStatus === "completed" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4"
                  >
                    {/* Guidance detail cards */}
                    <div className="grid grid-cols-3 gap-3 text-xs leading-normal">
                      <div className="bg-white border border-brand-green/10 p-3 rounded-2xl text-center shadow-sm">
                        <span className="text-[10px] text-brand-text-muted block font-bold mb-0.5">{isHi ? "मात्रा गाइड" : "Dosage"}</span>
                        <strong className="text-brand-green-deep block font-black">{cropSimulationData[selectedCrop].dosage}</strong>
                      </div>
                      <div className="bg-white border border-brand-green/10 p-3 rounded-2xl text-center shadow-sm">
                        <span className="text-[10px] text-brand-text-muted block font-bold mb-0.5">{isHi ? "पैदावार लाभ" : "Yield Gain"}</span>
                        <strong className="text-brand-green block font-black">{cropSimulationData[selectedCrop].yield}</strong>
                      </div>
                      <div className="bg-white border border-brand-green/10 p-3 rounded-2xl text-center shadow-sm">
                        <span className="text-[10px] text-brand-text-muted block font-bold mb-0.5">{isHi ? "पानी की बचत" : "Water Saved"}</span>
                        <strong className="text-blue-500 block font-black">{cropSimulationData[selectedCrop].waterSaved}</strong>
                      </div>
                    </div>

                    {/* Reset & Back Buttons */}
                    <div className="flex gap-3 w-full">
                      <button
                        onClick={resetSimulation}
                        className="flex-1 py-3 rounded-full bg-white hover:bg-brand-green-light border border-brand-green/20 text-brand-green-deep text-xs font-black uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        {isHi ? "रीसेट करें" : "Reset Simulation"}
                      </button>
                      <button
                        onClick={() => {
                          setActiveView("comparison");
                          setSimStatus("idle");
                        }}
                        className="flex-1 py-3 rounded-full bg-brand-green hover:bg-brand-green-deep text-white text-xs font-black uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-premium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {isHi ? "तुलना देखें" : "Back to Comparison"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Block (See the Difference. Feel the Impact.) */}
      <section className="py-12 border-t border-brand-green/10 text-center">
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-black text-brand-green-deep mb-2">
            {isHi ? "अंतर देखें। प्रभाव महसूस करें।" : "See the Difference. Feel the Impact."}
          </h2>
          <p className="text-sm font-black text-brand-brown-warm tracking-wide uppercase">
            {isHi ? "असली किसानों के लिए वास्तविक लाभ।" : "Real benefits for real farmers."}
          </p>
        </div>

        {/* 5 Mockup Benefits Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {mockupBenefits.map((benefit, idx) => (
            <InteractiveBenefitCard
              key={idx}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              index={idx}
            />
          ))}
        </div>

        {/* Rounded Horizontal Stats Bar */}
        <div className="mt-12 bg-brand-green-light/45 border border-brand-green/10 rounded-2xl py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-green-deep/10 text-brand-green-deep flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black text-brand-green-deep leading-none">100%</span>
              <span className="text-[10px] text-brand-text-muted font-bold">{isHi ? "जैविक और प्राकृतिक" : "Organic & Natural"}</span>
            </div>
          </div>

          <div className="w-px h-8 bg-brand-green/15 hidden md:block" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-green-deep/10 text-brand-green-deep flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black text-brand-green-deep leading-none">6x</span>
              <span className="text-[10px] text-brand-text-muted font-bold">{isHi ? "अधिक जल अवशोषण" : "More Water Absorption"}</span>
            </div>
          </div>

          <div className="w-px h-8 bg-brand-green/15 hidden md:block" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-green-deep/10 text-brand-green-deep flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black text-brand-green-deep leading-none">30%+</span>
              <span className="text-[10px] text-brand-text-muted font-bold">{isHi ? "पैदावार में वृद्धि" : "Increase in Yield"}</span>
            </div>
          </div>

          <div className="w-px h-8 bg-brand-green/15 hidden md:block" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-green-deep/10 text-brand-green-deep flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black text-brand-green-deep leading-none">10,000+</span>
              <span className="text-[10px] text-brand-text-muted font-bold">{isHi ? "किसानों का भरोसा" : "Farmers Trust Us"}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductHero;
