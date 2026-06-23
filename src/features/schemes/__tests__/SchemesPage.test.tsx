// @vitest-environment jsdom
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SchemesPage } from "../pages/SchemesPage";

// Mock React's hooks for direct functional component calling
vi.mock("react", async (importOriginal) => {
  const original = await importOriginal<typeof import("react")>();
  return {
    ...original,
    useState: (initialValue: any) => {
      return [typeof initialValue === "function" ? initialValue() : initialValue, vi.fn()];
    },
    useRef: (initialValue: any) => {
      return { current: initialValue || null };
    },
    useEffect: () => {},
    useLayoutEffect: () => {},
  };
});

// Mock react-router-dom
vi.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
}));

const enSchemes = [
  {
    id: "pm-kisan",
    slug: "pm-kisan",
    title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "subsidy",
    governmentType: "central",
    state: "all",
    benefits: "₹6,000 / year",
    eligibilityPreview: "Small & marginal landholders",
    description: "Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
    eligibility: [
      "Must own cultivable land registered in their name",
      "Must have valid Aadhaar card linked to bank account",
      "Available to small and marginal farmers across all states"
    ],
    supportType: "Direct Benefit Transfer (DBT)",
    deadline: "Ongoing",
    process: "Register online at PM-KISAN portal or via local CSC center with land records.",
    officialSource: "Official PM-KISAN Portal",
    officialWebsite: "https://pmkisan.gov.in/",
    isFeatured: true,
    farmerType: "small",
    farmerTypes: ["small", "marginal"],
    benefitType: "cash",
    subsidyType: "dbt",
    requiredDocuments: ["Aadhaar", "Land Records"],
    faqs: [
      { question: "Q1", answer: "A1" }
    ]
  },
  {
    id: "soil-health-card",
    slug: "soil-health-card",
    title: "Soil Health Card Scheme",
    category: "soil health",
    governmentType: "central",
    state: "all",
    benefits: "Free testing & card",
    eligibilityPreview: "All landowning farmers",
    description: "Assists state governments to issue soil health cards to all farmers, detailing chemical parameters to enable tailored dosing of organic nutrients like Biochar.",
    eligibility: [
      "Open to all landholder farmers across India",
      "Soil sample collection will be done by local block officers"
    ],
    supportType: "Free Testing & Soil Health Report",
    deadline: "Ongoing",
    process: "Contact block agriculture officer or register at Soil Health Portal to schedule sample collection.",
    officialSource: "National Soil Health Portal",
    officialWebsite: "https://soilhealth.dac.gov.in/",
    isFeatured: true,
    farmerType: "all",
    farmerTypes: ["all"],
    benefitType: "services",
    subsidyType: "free",
    requiredDocuments: ["Aadhaar"],
    faqs: [
      { question: "Q1", answer: "A1" }
    ]
  }
];

const hiSchemes = [
  {
    id: "pm-kisan",
    slug: "pm-kisan",
    title: "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)",
    category: "subsidy",
    governmentType: "central",
    state: "all",
    benefits: "₹6,000 / वर्ष",
    eligibilityPreview: "छोटे और सीमांत भूमि धारक किसान",
    description: "सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता तीन समान किस्तों में प्रदान की जाती है।",
    eligibility: [
      "उनके नाम पर पंजीकृत कृषि योग्य भूमि होनी चाहिए",
      "बैंक खाते से लिंक आधार कार्ड होना अनिवार्य है"
    ],
    supportType: "प्रत्यक्ष लाभ हस्तांतरण (DBT)",
    deadline: "जारी है",
    process: "भूमि दस्तावेजों के साथ पीएम-किसान पोर्टल पर ऑनलाइन या स्थानीय सीएससी केंद्र के माध्यम से पंजीकरण करें।",
    officialSource: "आधिकारिक पीएम-किसान पोर्टल",
    officialWebsite: "https://pmkisan.gov.in/",
    isFeatured: true,
    farmerType: "small",
    farmerTypes: ["small", "marginal"],
    benefitType: "cash",
    subsidyType: "dbt",
    requiredDocuments: ["आधार", "भूमि दस्तावेज"],
    faqs: [
      { question: "Q1", answer: "A1" }
    ]
  }
];

let mockLanguage = "en";

// Mock i18next useTranslation
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (key === "list") {
        return mockLanguage === "hi" ? hiSchemes : enSchemes;
      }
      if (key === "faqs") {
        return [
          { question: "How do I apply?", answer: "Apply online." },
          { question: "Are schemes state-specific?", answer: "Yes." }
        ];
      }
      if (key === "subsidyCards") {
        return [
          { title: "Fertilizer Support", amount: "50% Off", description: "Desc", type: "fertilizer" }
        ];
      }
      if (key === "processSteps") {
        return [
          { title: "Step 1", description: "Desc 1" }
        ];
      }
      if (key === "eligibilityGuide.steps") {
        return [
          { title: "Step 1", description: "Desc 1" }
        ];
      }
      return key;
    },
    i18n: {
      language: mockLanguage,
    }
  }),
}));

// Mock React Query useSchemes hook
vi.mock("../hooks/useSchemes", () => ({
  default: () => ({
    data: mockLanguage === "hi" ? hiSchemes : enSchemes,
    isLoading: false,
  }),
  useSchemes: () => ({
    data: mockLanguage === "hi" ? hiSchemes : enSchemes,
    isLoading: false,
  }),
}));

// Mock SEO
vi.mock("../../../components/common/SEO", () => ({
  default: () => <div data-testid="seo-mock" />,
  __esModule: true,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
    section: ({ children, className }: any) => <section className={className}>{children}</section>,
  },
}));

describe("SchemesPage Component Unit Tests", () => {
  beforeEach(() => {
    mockLanguage = "en";
  });

  it("should render schemes components correctly in English", () => {
    mockLanguage = "en";
    const element = SchemesPage({});
    expect(element).toBeDefined();

    // Verify root container children are rendered
    const container = React.Children.toArray((element as any).props.children);
    expect(container.length).toBeGreaterThan(5); // Should render multiple sections: SEO, Hero, Featured, Filters, etc.
    
    // The first child is SEO mock
    const seoNode = container[0] as any;
    expect(seoNode.type).toBeDefined();

    // The second child is SchemeHero wrapper
    const heroSection = container[1] as any;
    const heroComp = React.Children.toArray(heroSection.props.children)[0] as any;
    expect(heroComp.type).toBeDefined();
  });

  it("should render schemes components correctly in Hindi", () => {
    mockLanguage = "hi";
    const element = SchemesPage({});
    expect(element).toBeDefined();
    
    const container = React.Children.toArray((element as any).props.children);
    expect(container.length).toBeGreaterThan(5);

    // Assert that the page renders without errors in Hindi language mode
    const heroSection = container[1] as any;
    expect(heroSection).toBeDefined();
  });
});
