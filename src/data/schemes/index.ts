import { schemesDb, RawScheme } from "./schemesDb";
import { subsidyCardsEN, subsidyCardsHI } from "./subsidyCards";
import { SchemeData } from "../../features/schemes/hooks/useSchemes";

export const translateScheme = (scheme: RawScheme, lang: string): SchemeData => {
  const isHindi = lang === "hi";
  
  return {
    id: scheme.id,
    slug: scheme.slug,
    title: isHindi ? scheme.title.hi : scheme.title.en,
    category: scheme.category,
    description: isHindi ? scheme.description.hi : scheme.description.en,
    eligibility: isHindi ? scheme.eligibility.hi : scheme.eligibility.en,
    eligibilityPreview: isHindi ? scheme.eligibilityPreview.hi : scheme.eligibilityPreview.en,
    benefits: isHindi ? scheme.benefits.hi : scheme.benefits.en,
    officialSource: scheme.officialSource,
    officialWebsite: scheme.officialWebsite,
    lastVerified: scheme.lastVerifiedDate,
    lastVerifiedDate: scheme.lastVerifiedDate,
    status: scheme.status,
    governmentType: scheme.governmentType,
    state: scheme.state,
    farmerType: scheme.farmerTypes[0] || "all", // compatibility fallback
    farmerTypes: scheme.farmerTypes,
    subsidyType: scheme.subsidyType,
    benefitType: scheme.benefitType,
    supportType: isHindi ? scheme.supportType.hi : scheme.supportType.en,
    isFeatured: scheme.isFeatured,
    deadline: isHindi ? "जारी है" : "Ongoing",
    process: isHindi ? scheme.process.hi : scheme.process.en,
    requiredDocuments: isHindi ? scheme.requiredDocuments.hi : scheme.requiredDocuments.en,
    faqs: scheme.faqs.map((faq) => ({
      question: isHindi ? faq.question.hi : faq.question.en,
      answer: isHindi ? faq.answer.hi : faq.answer.en,
    })),
  };
};

export const getSchemesByLanguage = (lang: string): SchemeData[] => {
  return schemesDb.map((scheme) => translateScheme(scheme, lang));
};

export const getSubsidyCardsByLanguage = (lang: string) => {
  return lang === "hi" ? subsidyCardsHI : subsidyCardsEN;
};

