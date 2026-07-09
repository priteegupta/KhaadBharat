import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  const { t } = useTranslation();

  const defaultTitle = t("brand.heroProduct") + " - " + t("brand.tagline");
  const defaultDesc = t("pages.home.summary");
  const metaTitle = title ? `${title} | KHAAD BHARAT` : defaultTitle;
  const metaDescription = description || defaultDesc;
  const metaKeywords = keywords || "biochar, organic fertilizer, Indian farming, soil health, water retention, sustainable agriculture, KHAAD BHARAT";

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content="/images/social-preview.webp" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content="/images/social-preview.webp" />
    </Helmet>
  );
};
export default SEO;
