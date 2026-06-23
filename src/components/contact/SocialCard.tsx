import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Custom SVG Icons to avoid Lucide version incompatibilities for brand logos
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface SocialPlatform {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  url: string;
  colorClass: string;
  bgLightClass: string;
}

export const SocialCard: React.FC = () => {
  const { t } = useTranslation("contact");

  const platforms: SocialPlatform[] = [
    {
      name: "Facebook",
      icon: FacebookIcon,
      url: "https://facebook.com",
      colorClass: "text-[#1877F2] hover:text-white hover:bg-[#1877F2]",
      bgLightClass: "bg-[#1877F2]/8",
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      url: "https://instagram.com",
      colorClass: "text-[#E1306C] hover:text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]",
      bgLightClass: "bg-[#E1306C]/8",
    },
    {
      name: "YouTube",
      icon: YoutubeIcon,
      url: "https://youtube.com",
      colorClass: "text-[#FF0000] hover:text-white hover:bg-[#FF0000]",
      bgLightClass: "bg-[#FF0000]/8",
    },
    {
      name: "LinkedIn",
      icon: LinkedinIcon,
      url: "https://linkedin.com",
      colorClass: "text-[#0077B5] hover:text-white hover:bg-[#0077B5]",
      bgLightClass: "bg-[#0077B5]/8",
    },
  ];

  return (
    <div className="bg-white border border-brand-green/10 rounded-3xl p-6 md:p-8 mb-12 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 text-[10px] md:text-xs font-black tracking-widest text-brand-green uppercase bg-brand-green/10 rounded-full mb-3">
          SOCIAL CHANNELS
        </span>
        <h3 className="text-xl md:text-2xl font-extrabold text-brand-green-deep tracking-tight">
          {t("social.title")}
        </h3>
        <p className="text-xs md:text-sm text-brand-text-muted font-bold mt-1">
          {t("social.subtitle")}
        </p>
      </div>

      {/* Cards list */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {platforms.map((p) => {
          const Icon = p.icon;
          return (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-6 rounded-2xl border border-brand-green/5 shadow-sm flex flex-col items-center justify-center text-center transition-all duration-300 ${p.colorClass}`}
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-brand-green-light transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider">
                {p.name}
              </span>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialCard;
