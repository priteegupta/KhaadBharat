import React from "react";
import { useTranslation } from "react-i18next";

interface Pack {
  title: string;
  size: string;
  bag: string;
  details: string[];
}

interface CatalogBoardVisualProps {
  headline: string;
  subtitle: string;
  packages: Pack[];
}

export const CatalogBoardVisual: React.FC<CatalogBoardVisualProps> = ({ headline, subtitle, packages = [] }) => {
  const { t } = useTranslation("product");

  return (
    <div className="catalog-board-art" aria-label={headline}>
      <svg viewBox="0 0 1600 1000" role="img" aria-label={headline}>
        <defs>
          <linearGradient id="catalogBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f7f0df" />
            <stop offset="100%" stopColor="#dfe7b9" />
          </linearGradient>
          <linearGradient id="catalogPanel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e1be89" />
            <stop offset="100%" stopColor="#ca9962" />
          </linearGradient>
        </defs>
        <rect width="1600" height="1000" fill="url(#catalogBg)" />
        <circle cx="1440" cy="180" r="260" fill="#d4e5ab" opacity={0.32} />
        <circle cx="170" cy="120" r="190" fill="#f0d7a6" opacity={0.28} />

        <text x="800" y="84" textAnchor="middle" className="catalog-svg-title">{t("visual.catalogTitle")}</text>
        <text x="800" y="132" textAnchor="middle" className="catalog-svg-subtitle">{headline}</text>
        <text x="800" y="170" textAnchor="middle" className="catalog-svg-body">{subtitle}</text>

        <g transform="translate(122 210)">
          <rect width="1356" height="110" rx="24" fill="#fff8ea" opacity={0.92} stroke="#bfa46b" strokeWidth="3" />
          {packages.slice(0, 3).map((pack, index) => (
            <g key={pack.title} transform={`translate(${170 + index * 390} 56)`}>
              <circle cx="0" cy="0" r="24" fill="#43672e" />
              <text x="0" y="7" textAnchor="middle" className="catalog-svg-step">{index + 1}</text>
              <text x="48" y="8" className="catalog-svg-step-title">{pack.size}</text>
              <text x="48" y="33" className="catalog-svg-step-body">{pack.title}</text>
            </g>
          ))}
        </g>

        {packages.slice(0, 3).map((pack, index) => (
          <g key={pack.title} transform={`translate(${160 + index * 470} ${330 + (index === 1 ? -20 : 0)})`}>
            <rect x="0" y="0" width="360" height="520" rx="34" fill="url(#catalogPanel)" opacity={0.95} />
            <text x="180" y="112" textAnchor="middle" className="catalog-svg-pack-size">{pack.size}</text>
            <rect x="48" y="220" width="264" height="112" rx="18" fill="#355523" />
            <text x="180" y="286" textAnchor="middle" className="catalog-svg-pack-title">{t("visual.biochar")}</text>
            <text x="180" y="322" textAnchor="middle" className="catalog-svg-pack-sub">{pack.bag}</text>
            <rect x="54" y="372" width="252" height="96" rx="16" fill="#f3e5c8" opacity={0.82} />
            <text x="180" y="418" textAnchor="middle" className="catalog-svg-body">{pack.details?.[0] || t("visual.catalogDetail1")}</text>
            <text x="180" y="446" textAnchor="middle" className="catalog-svg-body">{pack.details?.[1] || t("visual.catalogDetail2")}</text>
          </g>
        ))}

        <rect x="108" y="898" width="1384" height="64" rx="20" fill="#2f4a1e" />
        <text x="800" y="939" textAnchor="middle" className="catalog-svg-footer">{t("visual.catalogFooter")}</text>
      </svg>
    </div>
  );
};
export default CatalogBoardVisual;
