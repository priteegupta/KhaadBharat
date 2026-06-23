import React from "react";
import { useTranslation } from "react-i18next";

interface Pack {
  title: string;
  size: string;
  bag: string;
  details: string[];
}

interface PackVisualProps {
  pack: Pack;
  benefitPoints: Array<{ title: string; body: string }>;
  index: string;
}

export const PackVisual: React.FC<PackVisualProps> = ({ pack, benefitPoints = [], index }) => {
  const { t } = useTranslation("product");
  const [naturalPct, naturalLabel] = t("visual.natural").split(" ");

  const supportLines = [
    benefitPoints[0]?.title || "Soil health",
    benefitPoints[1]?.title || "Water retention",
    benefitPoints[2]?.title || "Carbon support",
    benefitPoints[3]?.title || "Root growth",
  ];
  const suffix = String(index).replace(/\W+/g, "") || "pack";
  const paperId = `packPaper-${suffix}`;
  const bandId = `packBand-${suffix}`;

  return (
    <div className="pack-art" aria-label={`${pack.title} visual`}>
      <svg viewBox="0 0 720 980" role="img" aria-label={pack.title}>
        <defs>
          <linearGradient id={paperId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e7c896" />
            <stop offset="100%" stopColor="#cf9f67" />
          </linearGradient>
          <linearGradient id={bandId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4b6a2f" />
            <stop offset="100%" stopColor="#29401a" />
          </linearGradient>
        </defs>
        <rect width="720" height="980" rx="38" fill={`url(#${paperId})`} />
        <rect x="36" y="44" width="648" height="56" rx="18" fill="#dfc38f" opacity={0.8} />
        <circle cx="595" cy="146" r="50" fill={`url(#${bandId})`} />
        <text x="595" y="136" textAnchor="middle" className="pack-svg-small">{naturalPct}</text>
        <text x="595" y="158" textAnchor="middle" className="pack-svg-small">{naturalLabel}</text>
        <text x="595" y="182" textAnchor="middle" className="pack-svg-tiny">{t("visual.chemicalFree")}</text>
        <text x="360" y="150" textAnchor="middle" className="pack-svg-brand">{t("visual.brand")}</text>
        <text x="360" y="260" textAnchor="middle" className="pack-svg-title">{t("visual.biochar")}</text>
        <text x="360" y="302" textAnchor="middle" className="pack-svg-subtitle">{pack.bag}</text>

        <circle cx="360" cy="500" r="170" fill="none" stroke="#4f6e34" strokeWidth="6" />
        <path d="M180 520c52-38 162-58 180-58s128 20 180 58" fill="#6d8b4f" opacity={0.15} />
        <path d="M205 548c58-28 124-42 155-42s97 14 155 42" fill="none" stroke="#4f6e34" strokeWidth="3" opacity={0.4} />
        <path d="M245 575c52-18 84-28 115-28s63 10 115 28" fill="none" stroke="#4f6e34" strokeWidth="3" opacity={0.3} />
        <path d="M308 640c0 0 18-72 38-104 11-18 22-28 14-28s23 10 34 28c20 32 38 104 38 104" fill="#2f2d28" />
        <ellipse cx="360" cy="530" rx="33" ry="13" fill="#161410" />
        <ellipse cx="404" cy="542" rx="28" ry="11" fill="#181511" />
        <ellipse cx="320" cy="545" rx="26" ry="10" fill="#211c16" />
        <path d="M360 390c-26-16-52-13-80 2 24 30 46 44 80 44s56-14 80-44c-28-15-54-18-80-2z" fill="#4f8a38" />
        <path d="M360 396c-10-36-8-64 0-88 8 24 10 52 0 88z" fill="#69b84e" />
        <path d="M360 396l-72-30 60 62" fill="#69b84e" />
        <path d="M360 396l72-30-60 62" fill="#69b84e" />

        <g>
          <rect x="98" y="744" width="524" height="108" rx="22" fill={`url(#${bandId})`} />
          {supportLines.map((line, i) => {
            const x = 163 + i * 124;
            const splitX = 229 + i * 124;
            return (
              <g key={line}>
                <line x1={splitX} y1="758" x2={splitX} y2="830" stroke="#f0ddba" strokeWidth="2" opacity={0.5} />
                <circle cx={x} cy="784" r="23" fill="#f4ead4" />
                <text x={x} y="789" textAnchor="middle" className="pack-svg-mini">{i + 1}</text>
                <text x={x} y="823" textAnchor="middle" className="pack-svg-chip">{line}</text>
              </g>
            );
          })}
        </g>

        <rect x="226" y="858" width="268" height="84" rx="18" fill="#45602d" stroke="#f0ddba" strokeWidth="4" />
        <text x="360" y="913" textAnchor="middle" className="pack-svg-size">{pack.size}</text>
        <text x="360" y="938" textAnchor="middle" className="pack-svg-tiny">{t("visual.netWeight")}</text>
      </svg>
    </div>
  );
};
export default PackVisual;
