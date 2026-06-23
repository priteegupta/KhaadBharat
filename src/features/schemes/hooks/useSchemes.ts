import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getSchemesByLanguage } from "../../../data/schemes";

export interface SchemeData {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  eligibility: string[];
  eligibilityPreview?: string;
  benefits: string;
  officialSource: string;
  officialWebsite: string;
  lastUpdated?: string;
  lastVerified?: string;
  lastVerifiedDate?: string;
  status?: "active" | "upcoming" | "expired" | "review";
  governmentType?: string;
  state?: string;
  farmerType?: string; // legacy compatibility
  farmerTypes: string[];
  subsidyType?: string;
  benefitType: string;
  supportType?: string;
  isFeatured?: boolean;
  deadline?: string;
  process?: string;
  requiredDocuments: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const useSchemes = () => {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ["schemes", i18n.language],
    queryFn: async (): Promise<SchemeData[]> => {
      // Simulate small API delay to ensure skeleton loading works beautifully
      await new Promise((resolve) => setTimeout(resolve, 150));
      
      return getSchemesByLanguage(i18n.language);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export default useSchemes;
