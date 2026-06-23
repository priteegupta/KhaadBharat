export interface MultilingualText {
  en: string;
  hi: string;
}

export interface MultilingualList {
  en: string[];
  hi: string[];
}

export interface RawFAQ {
  question: MultilingualText;
  answer: MultilingualText;
}

export interface RawScheme {
  id: string;
  slug: string;
  title: MultilingualText;
  category: string;
  governmentType: "central" | "state";
  state: string; // "all", "punjab", "uttar pradesh", "bihar", "maharashtra", "madhya pradesh", etc.
  benefits: MultilingualText;
  eligibilityPreview: MultilingualText;
  description: MultilingualText;
  eligibility: MultilingualList;
  supportType: MultilingualText;
  process: MultilingualText;
  officialSource: string;
  officialWebsite: string;
  lastVerifiedDate: string; // YYYY-MM-DD
  status: "active" | "upcoming" | "expired" | "review";
  isFeatured: boolean;
  farmerTypes: string[]; // ["small", "marginal", "women", "organic", "all", "fpo", "entrepreneur"]
  benefitType: string; // "cash", "input", "insurance", "loan", "equipment", "solar", "training", "grant"
  subsidyType: string; // "dbt", "subsidy", "free"
  requiredDocuments: MultilingualList;
  faqs: RawFAQ[];
}

export const schemesDb: RawScheme[] = [
  {
    id: "pm-kisan",
    slug: "pm-kisan",
    title: {
      en: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      hi: "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)"
    },
    category: "central-government",
    governmentType: "central",
    state: "all",
    benefits: {
      en: "₹6,000 / year via Direct Benefit Transfer in three equal installments",
      hi: "प्रत्यक्ष लाभ हस्तांतरण (डीबीटी) के माध्यम से तीन समान किश्तों में ₹6,000 / वर्ष"
    },
    eligibilityPreview: {
      en: "Small and marginal landholder farmer families",
      hi: "छोटे और सीमांत भूमिधारक किसान परिवार"
    },
    description: {
      en: "A central sector scheme that provides direct income support of ₹6,000 per year to all landholding farmer families across the country.",
      hi: "एक केंद्रीय क्षेत्र की योजना जो देश भर के सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता प्रदान करती है।"
    },
    eligibility: {
      en: [
        "Must own cultivable land registered in their name",
        "Must have a valid Aadhaar card linked to a bank account",
        "Available to landholder farmers across all states and Union Territories"
      ],
      hi: [
        "उनके नाम पर पंजीकृत कृषि योग्य भूमि होनी चाहिए",
        "बैंक खाते से लिंक आधार कार्ड होना अनिवार्य है",
        "सभी राज्यों और केंद्र शासित प्रदेशों के भूमिधारक किसानों के लिए उपलब्ध है"
      ]
    },
    supportType: {
      en: "Direct Income Support",
      hi: "प्रत्यक्ष आय सहायता"
    },
    process: {
      en: "Register online via the official PM-KISAN portal, or visit a local Common Service Centre (CSC) with land registration documents, Aadhaar, and bank account details.",
      hi: "आधिकारिक पीएम-किसान पोर्टल के माध्यम से ऑनलाइन पंजीकरण करें, या भूमि पंजीकरण दस्तावेजों, आधार और बैंक खाते के विवरण के साथ स्थानीय सामान्य सेवा केंद्र (सीएससी) पर जाएं।"
    },
    officialSource: "Official PM-KISAN Portal",
    officialWebsite: "https://pmkisan.gov.in/",
    lastVerifiedDate: "2026-06-18",
    status: "active",
    isFeatured: true,
    farmerTypes: ["small", "marginal"],
    benefitType: "cash",
    subsidyType: "dbt",
    requiredDocuments: {
      en: ["Aadhaar Card", "Land Ownership Certificate / RoR / Khatauni", "Bank Passbook", "Active Mobile Number", "Identity Proof"],
      hi: ["आधार कार्ड", "भूमि स्वामित्व प्रमाण पत्र / खतौनी", "बैंक पासबुक", "सक्रिय मोबाइल नंबर", "पहचान पत्र"]
    },
    faqs: [
      {
        question: {
          en: "Who is excluded from PM-KISAN benefits?",
          hi: "पीएम-किसान योजना के लाभों से किसे बाहर रखा गया है?"
        },
        answer: {
          en: "Institutional landholders, income tax payers, retired or serving government employees, and professionals (like doctors, engineers, lawyers) are excluded.",
          hi: "संस्थागत भूमि धारक, आयकर दाता, सेवानिवृत्त या सेवारत सरकारी कर्मचारी, और पेशेवर (जैसे डॉक्टर, इंजीनियर, वकील) इस योजना से बाहर हैं।"
        }
      },
      {
        question: {
          en: "How do I check my beneficiary status?",
          hi: "मैं अपनी लाभार्थी स्थिति की जांच कैसे करूं?"
        },
        answer: {
          en: "Farmers can check their status online on the PM-KISAN portal under the 'Beneficiary Status' section using their registration number or mobile number.",
          hi: "किसान अपने पंजीकरण नंबर या मोबाइल नंबर का उपयोग करके पीएम-किसान पोर्टल पर 'लाभार्थी स्थिति' अनुभाग के तहत ऑनलाइन स्थिति की जांच कर सकते हैं।"
        }
      }
    ]
  },
  {
    id: "soil-health-card",
    slug: "soil-health-card",
    title: {
      en: "Soil Health Card Scheme",
      hi: "मृदा स्वास्थ्य कार्ड योजना"
    },
    category: "soil-health",
    governmentType: "central",
    state: "all",
    benefits: {
      en: "Free soil testing, health card reports, and customized recommendations for chemical and organic fertilizers",
      hi: "निःशुल्क मिट्टी परीक्षण, स्वास्थ्य कार्ड रिपोर्ट और रासायनिक व जैविक उर्वरकों के लिए अनुकूलित सलाह"
    },
    eligibilityPreview: {
      en: "All landowning farmers across India",
      hi: "भारत भर के सभी भूमिधारक किसान"
    },
    description: {
      en: "Assists state governments in issuing soil health cards to all farmers to understand soil nutrient status and recommended dosages of organic nutrients like compost and biochar.",
      hi: "किसानों को मिट्टी के पोषक तत्वों की स्थिति और कंपोस्ट व बायोचार जैसे जैविक पोषक तत्वों की अनुशंसित मात्रा को समझने के लिए मृदा स्वास्थ्य कार्ड जारी करने में सहायता प्रदान करती है।"
    },
    eligibility: {
      en: [
        "Open to all landholding farmers in India",
        "Soil samples must be collected from the farmer's agricultural land by designated block officers"
      ],
      hi: [
        "भारत के सभी भूमिधारक किसानों के लिए उपलब्ध",
        "मिट्टी के नमूने नामित ब्लॉक अधिकारियों द्वारा किसान की कृषि भूमि से एकत्र किए जाने चाहिए"
      ]
    },
    supportType: {
      en: "Soil Testing Services & Fertilization Plan",
      hi: "मिट्टी परीक्षण सेवाएं और उर्वरक योजना"
    },
    process: {
      en: "Contact the local block agriculture officer or register on the Soil Health Card portal to request sample collection from your farm.",
      hi: "अपने खेत से नमूना संग्रह का अनुरोध करने के लिए स्थानीय ब्लॉक कृषि अधिकारी से संपर्क करें या मृदा स्वास्थ्य कार्ड पोर्टल पर पंजीकरण करें।"
    },
    officialSource: "National Soil Health Portal",
    officialWebsite: "https://soilhealth.dac.gov.in/",
    lastVerifiedDate: "2026-06-18",
    status: "active",
    isFeatured: true,
    farmerTypes: ["all"],
    benefitType: "services",
    subsidyType: "free",
    requiredDocuments: {
      en: ["Aadhaar Card", "Land Khata/Khasra details", "Mobile Number"],
      hi: ["आधार कार्ड", "भूमि खाता/खसरा विवरण", "मोबाइल नंबर"]
    },
    faqs: [
      {
        question: {
          en: "How often is the soil tested under this scheme?",
          hi: "इस योजना के तहत मिट्टी का परीक्षण कितने समय में किया जाता है?"
        },
        answer: {
          en: "Soil health cards are issued once every 3 years to trace deficiencies and monitor soil health improvements over time.",
          hi: "मिट्टी की कमियों का पता लगाने और समय के साथ मृदा स्वास्थ्य में सुधार की निगरानी के लिए हर 3 साल में एक बार मृदा स्वास्थ्य कार्ड जारी किया जाता है।"
        }
      }
    ]
  },
  {
    id: "pmksy",
    slug: "pmksy",
    title: {
      en: "PMKSY (Pradhan Mantri Krishi Sinchayee Yojana)",
      hi: "पीएमकेएसवाई (प्रधानमंत्री कृषि सिंचाई योजना)"
    },
    category: "irrigation-water",
    governmentType: "central",
    state: "all",
    benefits: {
      en: "Up to 55% financial subsidy for small/marginal farmers and 45% for other farmers to install drip & sprinkler systems",
      hi: "छोटे/सीमांत किसानों के लिए 55% तक और अन्य किसानों के लिए ड्रिप व स्प्रिंकलर सिस्टम लगाने पर 45% तक वित्तीय सब्सिडी"
    },
    eligibilityPreview: {
      en: "Farmers with a functional water source on their agricultural land",
      hi: "कृषि भूमि पर क्रियाशील जल स्रोत वाले किसान"
    },
    description: {
      en: "Focuses on 'Per Drop More Crop' by promoting water-saving micro-irrigation technologies to improve farm-level water-use efficiency.",
      hi: "खेत स्तर पर जल-उपयोग दक्षता में सुधार के लिए पानी की बचत करने वाली सूक्ष्म सिंचाई तकनीकों को बढ़ावा देकर 'प्रति बूंद अधिक फसल' पर ध्यान केंद्रित करती है।"
    },
    eligibility: {
      en: [
        "Farmers of all categories owning cultivable land",
        "Must have a functional water source (well, tubewell, canal connection)",
        "Members of cooperative farming societies and water user associations are prioritized"
      ],
      hi: [
        "कृषि योग्य भूमि के मालिक सभी श्रेणियों के किसान",
        "एक क्रियाशील जल स्रोत (कुआँ, नलकूप, नहर कनेक्शन) होना चाहिए",
        "सहकारी खेती समितियों और जल उपयोगकर्ता संघों के सदस्यों को प्राथमिकता दी जाती है"
      ]
    },
    supportType: {
      en: "Micro-Irrigation Subsidy",
      hi: "सूक्ष्म सिंचाई सब्सिडी"
    },
    process: {
      en: "Apply online through your respective State Horticulture or Agriculture Department portal with land maps and water source proof.",
      hi: "भूमि मानचित्र और जल स्रोत प्रमाण के साथ अपने संबंधित राज्य बागवानी या कृषि विभाग के पोर्टल के माध्यम से ऑनलाइन आवेदन करें।"
    },
    officialSource: "Official PMKSY Portal",
    officialWebsite: "https://pmksy.gov.in/",
    lastVerifiedDate: "2026-06-18",
    status: "active",
    isFeatured: true,
    farmerTypes: ["all", "small", "marginal"],
    benefitType: "equipment",
    subsidyType: "subsidy",
    requiredDocuments: {
      en: ["Aadhaar Card", "Land Records (RoR / 7-12 Extract / Khatauni)", "Electricity Bill (for tubewells)", "Bank Details", "Passport Size Photograph"],
      hi: ["आधार कार्ड", "भूमि रिकॉर्ड (खतौनी / 7-12 उतारा)", "बिजली बिल (नलकूपों के लिए)", "बैंक विवरण", "पासपोर्ट आकार का फोटो"]
    },
    faqs: [
      {
        question: {
          en: "What is the focus of Per Drop More Crop (PDMC)?",
          hi: "प्रति बूंद अधिक फसल (पीडीएमसी) का मुख्य ध्यान किस पर है?"
        },
        answer: {
          en: "PDMC focuses on micro-irrigation technologies like drip, sprinkler, and micro-sprinklers to save water and fertilizer cost.",
          hi: "पीडीएमसी पानी और उर्वरकों की बचत के लिए ड्रिप, स्प्रिंकलर और माइक्रो-स्प्रिंकलर जैसी सूक्ष्म सिंचाई तकनीकों पर ध्यान केंद्रित करता है।"
        }
      }
    ]
  },
  {
    id: "pmfby",
    slug: "pmfby",
    title: {
      en: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
      hi: "प्रधानमंत्री फसल बीमा योजना (पीएमएफबीवाई)"
    },
    category: "crop-insurance",
    governmentType: "central",
    state: "all",
    benefits: {
      en: "Comprehensive crop insurance with very low premiums (1.5% to 5%) covering all natural disasters",
      hi: "बहुत कम प्रीमियम (1.5% से 5%) पर व्यापक फसल बीमा जो सभी प्राकृतिक आपदाओं को कवर करता है"
    },
    eligibilityPreview: {
      en: "All farmers growing notified crops in notified areas",
      hi: "अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी किसान"
    },
    description: {
      en: "Provides low-cost financial crop insurance to protect farmers against yield losses due to non-preventable natural risks like drought, pests, floods, and unseasonal rain.",
      hi: "सूखा, कीड़े, बाढ़ और बेमौसम बारिश जैसे अपरिहार्य प्राकृतिक जोखिमों के कारण होने वाले नुकसान से किसानों को बचाने के लिए कम लागत वाला फसल बीमा प्रदान करती है।"
    },
    eligibility: {
      en: [
        "Open to all farmers including tenant farmers and sharecroppers",
        "Must be cultivating notified crops in notified areas specified by state government",
        "Loan-taking (loanee) farmers are automatically covered (opt-out option available)"
      ],
      hi: [
        "काश्तकार और बटाईदार किसानों सहित सभी किसानों के लिए उपलब्ध",
        "राज्य सरकार द्वारा निर्दिष्ट अधिसूचित क्षेत्रों में अधिसूचित फसलें उगा रहे होने चाहिए",
        "ऋण लेने वाले किसानों को स्वचालित रूप से कवर किया जाता है (बाहर होने का विकल्प उपलब्ध है)"
      ]
    },
    supportType: {
      en: "Crop Insurance Policy",
      hi: "फसल बीमा पॉलिसी"
    },
    process: {
      en: "Apply online via the PMFBY portal, through participating banks, or via licensed crop insurance agents before the crop cut-off date.",
      hi: "फसल की कट-ऑफ तारीख से पहले पीएमएफबीवाई पोर्टल, भागीदार बैंकों या लाइसेंस प्राप्त फसल बीमा एजेंटों के माध्यम से ऑनलाइन आवेदन करें।"
    },
    officialSource: "Official PMFBY Portal",
    officialWebsite: "https://pmfby.gov.in/",
    lastVerifiedDate: "2026-06-18",
    status: "active",
    isFeatured: false,
    farmerTypes: ["all"],
    benefitType: "insurance",
    subsidyType: "subsidy",
    requiredDocuments: {
      en: ["Aadhaar Card", "Sowing Certificate issued by Patwari/Gram Sevak", "Land Ownership Docs / Tenant Agreement", "Bank Passbook with IFSC"],
      hi: ["आधार कार्ड", "पटवारी/ग्राम सेवक द्वारा जारी बुवाई प्रमाण पत्र", "भूमि स्वामित्व दस्तावेज / किरायेदार समझौता", "आईएफएससी कोड के साथ बैंक पासबुक"]
    },
    faqs: [
      {
        question: {
          en: "What are the premium rates for farmers?",
          hi: "किसानों के लिए प्रीमियम दरें क्या हैं?"
        },
        answer: {
          en: "Farmers pay 2.0% premium for Kharif, 1.5% for Rabi, and 5% for annual commercial/horticultural crops. The rest of the premium is paid by the government.",
          hi: "किसान खरीफ के लिए 2.0% प्रीमियम, रबी के लिए 1.5% और वार्षिक वाणिज्यिक/बागवानी फसलों के लिए 5% प्रीमियम का भुगतान करते हैं। शेष प्रीमियम का भुगतान सरकार द्वारा किया जाता है।"
        }
      }
    ]
  },
  {
    id: "pkvy",
    slug: "pkvy",
    title: {
      en: "Paramparagat Krishi Vikas Yojana (PKVY)",
      hi: "परंपरागत कृषि विकास योजना (पीकेवीआई)"
    },
    category: "organic-farming",
    governmentType: "central",
    state: "all",
    benefits: {
      en: "Financial assistance of ₹50,000 per hectare for cluster formation, organic seed/inputs, and PGS certification",
      hi: "क्लस्टर निर्माण, जैविक बीज/इनपुट और पीजीएस प्रमाणीकरण के लिए ₹50,000 प्रति हेक्टेयर की वित्तीय सहायता"
    },
    eligibilityPreview: {
      en: "Farmers forming organic clusters of minimum 20 hectares (50 acres)",
      hi: "कम से कम 20 हेक्टेयर (50 एकड़) के जैविक समूह बनाने वाले किसान"
    },
    description: {
      en: "Promotes organic farming through cluster-based systems and PGS (Participatory Guarantee System) certification. Highly supportive of biochar soil blending and natural inputs.",
      hi: "क्लस्टर-आधारित प्रणालियों और पीजीएस (भागीदारी गारंटी प्रणाली) प्रमाणीकरण के माध्यम से जैविक खेती को बढ़ावा देती है। मिट्टी में बायोचार मिलाने और प्राकृतिक इनपुट का पुरजोर समर्थन करती है।"
    },
    eligibility: {
      en: [
        "Must be part of a registered farmer cluster (minimum 20 farmers per cluster)",
        "Committed to adopting fully organic farming practices with zero chemical usage",
        "Ready to undergo PGS organic certification processes"
      ],
      hi: [
        "एक पंजीकृत किसान क्लस्टर का हिस्सा होना चाहिए (प्रति क्लस्टर न्यूनतम 20 किसान)",
        "शून्य रासायनिक उपयोग के साथ पूरी तरह से जैविक खेती के तरीकों को अपनाने के लिए प्रतिबद्ध होना चाहिए",
        "पीजीएस जैविक प्रमाणीकरण प्रक्रियाओं से गुजरने के लिए तैयार होना चाहिए"
      ]
    },
    supportType: {
      en: "Organic Farming Subsidy & Training",
      hi: "जैविक खेती सब्सिडी और प्रशिक्षण"
    },
    process: {
      en: "Register the organic cluster with the State Agriculture Coordinator or nearest Regional Council under PGS-India.",
      hi: "पीजीएस-इंडिया के तहत राज्य कृषि समन्वयक या निकटतम क्षेत्रीय परिषद के पास जैविक क्लस्टर का पंजीकरण करें।"
    },
    officialSource: "PKVY PGS India Portal",
    officialWebsite: "https://www.pgsindia-ncof.gov.in/",
    lastVerifiedDate: "2026-06-18",
    status: "active",
    isFeatured: true,
    farmerTypes: ["organic", "small", "marginal"],
    benefitType: "input",
    subsidyType: "subsidy",
    requiredDocuments: {
      en: ["Aadhaar Card", "Cluster Registration Details", "Land Records (RoR)", "Bank Account Details", "PGS Farmer Commitment Form"],
      hi: ["आधार कार्ड", "क्लस्टर पंजीकरण विवरण", "भूमि रिकॉर्ड (खतौनी)", "बैंक खाता विवरण", "पीजीएस किसान प्रतिबद्धता फॉर्म"]
    },
    faqs: [
      {
        question: {
          en: "How is the ₹50,000 assistance disbursed?",
          hi: "₹50,000 की सहायता कैसे वितरित की जाती है?"
        },
        answer: {
          en: "Out of ₹50,000, 62% (₹31,000) is given directly to the farmer via DBT for buying organic inputs like biochar, bio-fertilizers, compost, and seeds.",
          hi: "₹50,000 में से 62% (₹31,000) किसानों को बायोचार, जैव-उर्वरक, खाद और बीज जैसे जैविक इनपुट खरीदने के लिए डीबीटी के माध्यम से सीधे दिया जाता है।"
        }
      }
    ]
  },
  {
    id: "agri-infrastructure-fund",
    slug: "agri-infrastructure-fund",
    title: {
      en: "Agriculture Infrastructure Fund (AIF)",
      hi: "कृषि अवसंरचना कोष (एआईएफ)"
    },
    category: "central-government",
    governmentType: "central",
    state: "all",
    benefits: {
      en: "3% interest subvention on loans up to ₹2 Crores for setting up post-harvest infrastructure",
      hi: "कटाई के बाद बुनियादी ढांचा स्थापित करने के लिए ₹2 करोड़ तक के ऋण पर 3% ब्याज की छूट"
    },
    eligibilityPreview: {
      en: "FPOs, PACS, Agri-entrepreneurs, and Startups",
      hi: "एफपीओ, पैक्स, कृषि-उद्यमी और स्टार्टअप"
    },
    description: {
      en: "A medium-long term debt financing facility for investment in viable projects for post-harvest management infrastructure and community farming assets.",
      hi: "कटाई के बाद के प्रबंधन बुनियादी ढांचे और सामुदायिक कृषि संपत्तियों के लिए व्यवहार्य परियोजनाओं में निवेश के लिए एक मध्यम-दीर्घकालिक ऋण वित्तपोषण सुविधा।"
    },
    eligibility: {
      en: [
        "Open to Primary Agricultural Credit Societies (PACS), Marketing Cooperative Societies, and FPOs",
        "Agricultural Entrepreneurs, startups, and individual farmers investing in post-harvest assets are eligible"
      ],
      hi: [
        "प्राथमिक कृषि ऋण समितियों (PACS), विपणन सहकारी समितियों और FPOs के लिए उपलब्ध",
        "कटाई के बाद की संपत्तियों में निवेश करने वाले कृषि उद्यमी, स्टार्टअप और व्यक्तिगत किसान पात्र हैं"
      ]
    },
    supportType: {
      en: "Interest Subvention & Credit Guarantee",
      hi: "ब्याज सहायता और क्रेडिट गारंटी"
    },
    process: {
      en: "Apply online through the AIF portal. Select the participating bank, submit project proposal and financial details for approval.",
      hi: "एआईएफ पोर्टल के माध्यम से ऑनलाइन आवेदन करें। भागीदार बैंक का चयन करें, अनुमोदन के लिए परियोजना प्रस्ताव और वित्तीय विवरण जमा करें।"
    },
    officialSource: "National AIF Portal",
    officialWebsite: "https://agriinfra.dac.gov.in/",
    lastVerifiedDate: "2026-06-18",
    status: "active",
    isFeatured: false,
    farmerTypes: ["fpo", "entrepreneur"],
    benefitType: "loan",
    subsidyType: "subsidy",
    requiredDocuments: {
      en: ["Detailed Project Report (DPR)", "Land details / lease agreement", "PAN Card", "Company/FPO registration docs", "Financial statements"],
      hi: ["विस्तृत परियोजना रिपोर्ट (डीपीआर)", "भूमि विवरण / पट्टा समझौता", "पैन कार्ड", "कंपनी/एफपीओ पंजीकरण दस्तावेज", "वित्तीय विवरण"]
    },
    faqs: [
      {
        question: {
          en: "What is the duration of the interest subvention?",
          hi: "ब्याज सहायता की अवधि क्या है?"
        },
        answer: {
          en: "Interest subvention of 3% is available for a maximum period of 7 years.",
          hi: "3% की ब्याज सहायता अधिकतम 7 वर्षों की अवधि के लिए उपलब्ध है।"
        }
      }
    ]
  },
  {
    id: "kisan-credit-card",
    slug: "kisan-credit-card",
    title: {
      en: "Kisan Credit Card (KCC) Scheme",
      hi: "किसान क्रेडिट कार्ड (केसीसी) योजना"
    },
    category: "central-government",
    governmentType: "central",
    state: "all",
    benefits: {
      en: "Access to flexible credit loans up to ₹3 Lakhs at nominal interest rate of 4% (upon prompt repayment)",
      hi: "4% की नाममात्र ब्याज दर पर ₹3 लाख तक के लचीले क्रेडिट ऋण की सुविधा (शीघ्र पुनर्भुगतान पर)"
    },
    eligibilityPreview: {
      en: "All farmers, sharecroppers, tenant farmers, and animal husbandry practitioners",
      hi: "सभी किसान, बटाईदार, काश्तकार और पशुपालन करने वाले"
    },
    description: {
      en: "Aims to provide comprehensive and timely credit support from the banking system under a single window to meet crop cultivation needs and post-harvest expenses.",
      hi: "फसल खेती की जरूरतों और कटाई के बाद के खर्चों को पूरा करने के लिए एक खिड़की के तहत बैंकिंग प्रणाली से व्यापक और समय पर ऋण सहायता प्रदान करने का उद्देश्य है।"
    },
    eligibility: {
      en: [
        "All owner-cultivator farmers (individual or joint)",
        "Tenant farmers, oral lessees, and sharecroppers",
        "Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers"
      ],
      hi: [
        "सभी मालिक-काश्तकार किसान (व्यक्तिगत या संयुक्त)",
        "काश्तकार किसान, मौखिक पट्टेदार और बटाईदार",
        "किसानों के स्वयं सहायता समूह (SHG) या संयुक्त देयता समूह (JLG)"
      ]
    },
    supportType: {
      en: "Agricultural Credit Line",
      hi: "कृषि क्रेडिट लाइन"
    },
    process: {
      en: "Apply through bank branches, local cooperative banks, or the Kisan Rin Portal with land registry records.",
      hi: "भूमि रजिस्ट्री रिकॉर्ड के साथ बैंक शाखाओं, स्थानीय सहकारी बैंकों या किसान ऋण पोर्टल के माध्यम से आवेदन करें।"
    },
    officialSource: "Kisan Rin Portal",
    officialWebsite: "https://kr.dac.gov.in/",
    lastVerifiedDate: "2026-06-18",
    status: "active",
    isFeatured: false,
    farmerTypes: ["all", "small", "marginal"],
    benefitType: "loan",
    subsidyType: "subsidy",
    requiredDocuments: {
      en: ["Aadhaar Card / Voter ID", "Land Records (RoR / Khatauni)", "No-dues certificate from nearby banks", "Passport size photo"],
      hi: ["आधार कार्ड / मतदाता पहचान पत्र", "भूमि रिकॉर्ड (खतौनी)", "निकटतम बैंकों से कोई बकाया न होने का प्रमाण पत्र", "पासपोर्ट आकार का फोटो"]
    },
    faqs: [
      {
        question: {
          en: "Can KCC be used for animal husbandry and fisheries?",
          hi: "क्या पशुपालन और मत्स्य पालन के लिए केसीसी का उपयोग किया जा सकता है?"
        },
        answer: {
          en: "Yes, the KCC facility has been extended to animal husbandry and fisheries farmers with a credit limit up to ₹2 Lakhs.",
          hi: "हाँ, केसीसी सुविधा का विस्तार पशुपालन और मत्स्य पालन किसानों के लिए भी ₹2 लाख तक की क्रेडिट सीमा के साथ किया गया है।"
        }
      }
    ]
  },
  {
    id: "smam",
    slug: "smam",
    title: {
      en: "SMAM (Sub-Mission on Agricultural Mechanization)",
      hi: "एसएमएएम (कृषि यंत्रीकरण पर उप-मिशन)"
    },
    category: "equipment-machinery",
    governmentType: "central",
    state: "all",
    benefits: {
      en: "40% to 50% capital subsidy on buying advanced agricultural machinery and organic shredders",
      hi: "उन्नत कृषि मशीनरी और जैविक अपशिष्ट कटर मशीन खरीदने पर 40% से 50% तक की पूंजीगत सब्सिडी"
    },
    eligibilityPreview: {
      en: "Small, marginal, and women landholding farmers",
      hi: "छोटे, सीमांत और महिला भूमिधारक किसान"
    },
    description: {
      en: "Promotes farm mechanization to improve work efficiency, reduce labor costs, and establish custom hiring centers for high-tech farm equipment.",
      hi: "कार्य कुशलता में सुधार करने, श्रम लागत को कम करने और उच्च तकनीक वाले कृषि उपकरणों के लिए कस्टम हायरिंग सेंटर स्थापित करने के लिए कृषि यंत्रीकरण को बढ़ावा देता है।"
    },
    eligibility: {
      en: [
        "Indian farmers holding agricultural land",
        "Priority given to SC/ST, small, marginal, and women farmers",
        "Must purchase machinery certified by farm machinery training institutes"
      ],
      hi: [
        "कृषि भूमि के मालिक भारतीय किसान",
        "एससी/एसटी, छोटे, सीमांत और महिला किसानों को प्राथमिकता दी जाती है",
        "कृषि मशीनरी प्रशिक्षण संस्थानों द्वारा प्रमाणित मशीनरी ही खरीदनी होगी"
      ]
    },
    supportType: {
      en: "Farm Machinery Subsidy",
      hi: "कृषि मशीनरी सब्सिडी"
    },
    process: {
      en: "Register and apply online on the DBT Portal for Agricultural Machinery with a quotation from an authorized dealer.",
      hi: "अधिकृत डीलर से कोटेशन के साथ कृषि मशीनरी के लिए डीबीटी पोर्टल पर ऑनलाइन पंजीकरण और आवेदन करें।"
    },
    officialSource: "Agricultural Machinery Portal",
    officialWebsite: "https://agrimachinery.nic.in/",
    lastVerifiedDate: "2026-06-18",
    status: "active",
    isFeatured: false,
    farmerTypes: ["small", "marginal", "women"],
    benefitType: "equipment",
    subsidyType: "subsidy",
    requiredDocuments: {
      en: ["Aadhaar Card", "Land Details (Khatauni)", "Bank Account Details", "Quotation of equipment from registered dealer", "Caste certificate (if applicable)"],
      hi: ["आधार कार्ड", "भूमि विवरण (खतौनी)", "बैंक खाता विवरण", "पंजीकृत डीलर से उपकरण का कोटेशन", "जाति प्रमाण पत्र (यदि लागू हो)"]
    },
    faqs: [
      {
        question: {
          en: "What is a Custom Hiring Centre (CHC)?",
          hi: "कस्टम हायरिंग सेंटर (सीएचसी) क्या है?"
        },
        answer: {
          en: "CHCs are machinery hubs that rent out high-cost farm equipment to small farmers on an hourly/daily basis at affordable rates.",
          hi: "सीएचसी मशीनरी हब हैं जो छोटे किसानों को किफायती दरों पर प्रति घंटा/दैनिक आधार पर उच्च लागत वाले कृषि उपकरण किराए पर देते हैं।"
        }
      }
    ]
  },
  {
    id: "pm-kusum",
    slug: "pm-kusum",
    title: {
      en: "PM-KUSUM Solar Pump Scheme",
      hi: "पीएम-कुसुम सोलर पंप योजना"
    },
    category: "solar-energy",
    governmentType: "central",
    state: "all",
    benefits: {
      en: "Up to 60% total subsidy (central + state) for installing standalone solar agricultural pumps",
      hi: "स्टैंडअलोन सौर कृषि पंप स्थापित करने के लिए 60% तक कुल सब्सिडी (केंद्रीय + राज्य)"
    },
    eligibilityPreview: {
      en: "Farmers, farmer cooperatives, and panchayats with cultivable land",
      hi: "कृषि योग्य भूमि वाले किसान, किसान सहकारी समितियां और पंचायतें"
    },
    description: {
      en: "Promotes solar power adoption among farmers by replacing diesel tubewells with solar pumps, providing green energy and income security.",
      hi: "डीजल नलकूपों को सौर पंपों से बदलकर किसानों में सौर ऊर्जा अपनाने को बढ़ावा देती है, जिससे हरित ऊर्जा और आय सुरक्षा मिलती है।"
    },
    eligibility: {
      en: [
        "Must own cultivable land and have water resources for micro-irrigation",
        "Must not have an existing grid-tied electrical tubewell connection (or agree to convert it)",
        "Panchayats and cluster groups are also eligible to set up mini solar plants"
      ],
      hi: [
        "कृषि योग्य भूमि होनी चाहिए और सूक्ष्म सिंचाई के लिए जल संसाधन होने चाहिए",
        "मौजूदा ग्रिड-बंधा बिजली नलकूप कनेक्शन नहीं होना चाहिए (या इसे बदलने के लिए सहमत होना चाहिए)",
        "पंचायतें और क्लस्टर समूह भी मिनी सोलर प्लांट स्थापित करने के पात्र हैं"
      ]
    },
    supportType: {
      en: "Solar Irrigation Subsidy",
      hi: "सौर सिंचाई सब्सिडी"
    },
    process: {
      en: "Apply through the respective State Nodal Agency for Renewable Energy (e.g. PEDA, HAREDA, UREDA) or the PM-KUSUM portal.",
      hi: "संबंधित राज्य अक्षय ऊर्जा नोडल एजेंसी (जैसे पेडा, हरेडा, यूरेडा) या पीएम-कुसुम पोर्टल के माध्यम से आवेदन करें।"
    },
    officialSource: "Ministry of New & Renewable Energy",
    officialWebsite: "https://pmkusum.mnre.gov.in/",
    lastVerifiedDate: "2026-06-18",
    status: "active",
    isFeatured: true,
    farmerTypes: ["all", "small"],
    benefitType: "solar",
    subsidyType: "subsidy",
    requiredDocuments: {
      en: ["Aadhaar Card", "Land ownership document (Jamabandi)", "Bank Details", "Mobile Number linked to Aadhaar", "Water source feasibility certificate"],
      hi: ["आधार कार्ड", "भूमि स्वामित्व दस्तावेज (जमाबंदी)", "बैंक विवरण", "आधार से लिंक मोबाइल नंबर", "जल स्रोत की व्यवहार्यता का प्रमाण पत्र"]
    },
    faqs: [
      {
        question: {
          en: "Can farmers sell surplus solar power?",
          hi: "क्या किसान अतिरिक्त सौर ऊर्जा बेच सकते हैं?"
        },
        answer: {
          en: "Yes, under Component-A and C of the scheme, farmers can sell excess solar power generated back to DISCOMs at pre-determined tariffs.",
          hi: "हाँ, योजना के घटक-ए और सी के तहत, किसान निर्धारित दरों पर डिस्कॉम (डिस्कॉम) को उत्पन्न अतिरिक्त सौर ऊर्जा वापस बेच सकते हैं।"
        }
      }
    ]
  },
  {
    id: "mksp",
    slug: "mksp",
    title: {
      en: "Mahila Kisan Sashaktikaran Pariyojana (MKSP)",
      hi: "महिला किसान सशक्तिकरण परियोजना (एमकेएसपी)"
    },
    category: "women-farmer",
    governmentType: "central",
    state: "all",
    benefits: {
      en: "Free training in sustainable farming, organic composting, and direct assistance for inputs",
      hi: "टिकाऊ खेती, जैविक खाद बनाने में मुफ्त प्रशिक्षण और इनपुट के लिए सीधी सहायता"
    },
    eligibilityPreview: {
      en: "Women farmers engaged in agriculture, self-help groups (SHGs)",
      hi: "कृषि कार्य में लगी महिला किसान, स्वयं सहायता समूह (एसएचजी)"
    },
    description: {
      en: "A sub-component of NRLM that aims to empower women in agriculture by making systematic investments to enhance their participation and productivity in organic agriculture.",
      hi: "एनआरएलएम का एक उप-घटक जिसका उद्देश्य जैविक कृषि में उनकी भागीदारी और उत्पादकता बढ़ाने के लिए व्यवस्थित निवेश करके कृषि में महिलाओं को सशक्त बनाना है।"
    },
    eligibility: {
      en: [
        "Must be a practicing woman farmer or member of a rural Self-Help Group (SHG)",
        "Priority given to landless laborers and smallholder women"
      ],
      hi: [
        "एक अभ्यास करने वाली महिला किसान या ग्रामीण स्वयं सहायता समूह (SHG) की सदस्य होनी चाहिए",
        "भूमिहीन मजदूरों और छोटे धारक महिलाओं को प्राथमिकता दी जाती है"
      ]
    },
    supportType: {
      en: "Capacity Building & Input Supply",
      hi: "क्षमता निर्माण और इनपुट आपूर्ति"
    },
    process: {
      en: "Apply through local block-level NRLM clusters, local self-help group networks, or district project management units.",
      hi: "स्थानीय ब्लॉक-स्तरीय एनआरएलएम (एनआरएलएम) क्लस्टर, स्थानीय स्वयं सहायता समूह नेटवर्क या जिला परियोजना प्रबंधन इकाइयों के माध्यम से आवेदन करें।"
    },
    officialSource: "DAY-NRLM Portal",
    officialWebsite: "https://daynrlm.gov.in/",
    lastVerifiedDate: "2026-06-18",
    status: "active",
    isFeatured: false,
    farmerTypes: ["women"],
    benefitType: "training",
    subsidyType: "free",
    requiredDocuments: {
      en: ["Aadhaar Card", "SHG Membership proof / certificate", "Bank details of SHG or individual", "Residential proof"],
      hi: ["आधार कार्ड", "एसएचजी सदस्यता प्रमाण / प्रमाण पत्र", "एसएचजी या व्यक्तिगत बैंक विवरण", "निवास प्रमाण पत्र"]
    },
    faqs: [
      {
        question: {
          en: "Is there any financial aid for land purchase?",
          hi: "क्या भूमि खरीद के लिए कोई वित्तीय सहायता है?"
        },
        answer: {
          en: "No, MKSP focuses on skills, training, productivity enhancements, and organic cultivation assets rather than land purchase loans.",
          hi: "नहीं, एमकेएसपी भूमि खरीद ऋण के बजाय कौशल, प्रशिक्षण, उत्पादकता बढ़ाने और जैविक खेती की संपत्तियों पर ध्यान केंद्रित करता है।"
        }
      }
    ]
  },
  {
    id: "organic-bihar",
    slug: "organic-bihar",
    title: {
      en: "Bihar Organic Corridor Scheme",
      hi: "बिहार जैविक कॉरिडोर योजना"
    },
    category: "state-government",
    governmentType: "state",
    state: "bihar",
    benefits: {
      en: "₹11,500 / acre direct cash input subsidy for organic transition and certification",
      hi: "जैविक संक्रमण और प्रमाणीकरण के लिए ₹11,500 / एकड़ का सीधा नकद इनपुट सब्सिडी"
    },
    eligibilityPreview: {
      en: "Landowners in designated Ganga river basin organic corridor districts",
      hi: "नामित गंगा नदी बेसिन जैविक कॉरिडोर जिलों के भूमि मालिक"
    },
    description: {
      en: "A Bihar state initiative establishing organic farming corridors along the Ganga river. Provides direct cash subsidies for purchasing biochar, compost, and seeds.",
      hi: "गंगा नदी के किनारे जैविक खेती कॉरिडोर स्थापित करने की बिहार राज्य की पहल। बायोचार, खाद और बीज खरीदने के लिए सीधा नकद अनुदान प्रदान करता है।"
    },
    eligibility: {
      en: [
        "Must own agricultural land within the 13 designated organic corridor districts along the Ganga",
        "Must register on the Bihar DBT Agriculture portal",
        "Must pledge to transition completely to organic agricultural practices with zero chemical inputs"
      ],
      hi: [
        "गंगा के किनारे नामित 13 जैविक कॉरिडोर जिलों में कृषि भूमि होनी चाहिए",
        "बिहार डीबीटी कृषि पोर्टल पर पंजीकरण करना अनिवार्य है",
        "शून्य रासायनिक इनपुट के साथ पूरी तरह से जैविक कृषि प्रथाओं में बदलने का संकल्प लेना होगा"
      ]
    },
    supportType: {
      en: "Organic Transition Grant",
      hi: "जैविक परिवर्तन अनुदान"
    },
    process: {
      en: "Submit applications to the District Agriculture Officer or register online via the Bihar DBT Agriculture portal.",
      hi: "जिला कृषि अधिकारी को आवेदन जमा करें या बिहार डीबीटी कृषि पोर्टल के माध्यम से ऑनलाइन पंजीकरण करें।"
    },
    officialSource: "Bihar DBT Agriculture Portal",
    officialWebsite: "https://dbtagriculture.bihar.gov.in/",
    lastVerifiedDate: "2026-06-18",
    status: "active",
    isFeatured: false,
    farmerTypes: ["organic", "small"],
    benefitType: "input",
    subsidyType: "dbt",
    requiredDocuments: {
      en: ["Aadhaar Card", "Land Possession Certificate (LPC) / Land Rent Receipt", "Active Bank Account linked to Aadhaar", "Affidavit to stop chemical fertilizers"],
      hi: ["आधार कार्ड", "भूमि कब्जा प्रमाण पत्र (एलपीसी) / लगान रसीद", "आधार से लिंक सक्रिय बैंक खाता", "रासायनिक उर्वरक बंद करने का शपथ पत्र"]
    },
    faqs: [
      {
        question: {
          en: "Which districts are covered?",
          hi: "कौन से जिले इसके अंतर्गत आते हैं?"
        },
        answer: {
          en: "13 districts along the banks of the Ganga including Patna, Buxar, Bhojpur, Nalanda, Vaishali, and Bhagalpur.",
          hi: "पटना, बक्सर, भोजपुर, नालंदा, वैशाली और भागलपुर सहित गंगा के तट पर स्थित 13 जिले शामिल हैं।"
        }
      }
    ]
  },
  {
    id: "biochar-up",
    slug: "biochar-up",
    title: {
      en: "UP Bio-Fertilizer & Biochar Promotion Subsidy",
      hi: "यूपी जैव-उर्वरक और बायोचार संवर्धन सब्सिडी"
    },
    category: "state-government",
    governmentType: "state",
    state: "uttar pradesh",
    benefits: {
      en: "50% off direct subsidy on purchasing certified organic compost, biochar, and bio-fertilizers",
      hi: "प्रमाणित जैविक खाद, बायोचार और जैव-उर्वरकों की खरीद पर 50% प्रत्यक्ष सब्सिडी"
    },
    eligibilityPreview: {
      en: "Farmers registered on UP Agriculture DBT portal",
      hi: "यूपी कृषि डीबीटी पोर्टल पर पंजीकृत किसान"
    },
    description: {
      en: "An initiative by Uttar Pradesh state to restore soil organic carbon by subsidizing certified bio-fertilizers and biochar from authorized cooperative stores.",
      hi: "अधिकृत सहकारी भंडारों से प्रमाणित जैव-उर्वरकों और बायोचार पर सब्सिडी देकर मिट्टी के जैविक कार्बन को बहाल करने की उत्तर प्रदेश राज्य की एक पहल।"
    },
    eligibility: {
      en: [
        "Must be a registered farmer of Uttar Pradesh",
        "Purchase must be done through cooperative societies or authorized dealer networks",
        "Registered land details must match government registry"
      ],
      hi: [
        "उत्तर प्रदेश का पंजीकृत किसान होना चाहिए",
        "खरीद सहकारी समितियों या अधिकृत डीलर नेटवर्क के माध्यम से की जानी चाहिए",
        "पंजीकृत भूमि विवरण सरकारी रजिस्ट्री से मेल खाना चाहिए"
      ]
    },
    supportType: {
      en: "Fertilizer Purchase Subsidy",
      hi: "उर्वरक खरीद सब्सिडी"
    },
    process: {
      en: "Register on UP Agriculture DBT portal and purchase inputs using Aadhaar verification at local cooperative societies.",
      hi: "यूपी कृषि डीबीटी पोर्टल पर पंजीकरण करें और स्थानीय सहकारी समितियों में आधार सत्यापन का उपयोग करके इनपुट खरीदें।"
    },
    officialSource: "UP Agriculture Department",
    officialWebsite: "https://upagriculture.com/",
    lastVerifiedDate: "2026-06-18",
    status: "active",
    isFeatured: false,
    farmerTypes: ["small", "marginal", "organic"],
    benefitType: "input",
    subsidyType: "subsidy",
    requiredDocuments: {
      en: ["Aadhaar Card", "UP DBT Farmer Registration Number", "Khatauni Copy", "Bank Passbook"],
      hi: ["आधार कार्ड", "यूपी डीबीटी किसान पंजीकरण संख्या", "खतौनी कॉपी", "बैंक पासबुक"]
    },
    faqs: [
      {
        question: {
          en: "Is this subsidy given directly to bank accounts?",
          hi: "क्या यह सब्सिडी सीधे बैंक खातों में दी जाती है?"
        },
        answer: {
          en: "Yes, it is disbursed as Direct Benefit Transfer (DBT) after verifying the purchase invoice uploaded by the cooperative.",
          hi: "हाँ, सहकारी द्वारा अपलोड किए गए खरीद चालान को सत्यापित करने के बाद इसे प्रत्यक्ष लाभ हस्तांतरण (डीबीटी) के रूप में वितरित किया जाता है।"
        }
      }
    ]
  },
  {
    id: "acabc",
    slug: "acabc",
    title: {
      en: "Agri-Clinics and Agri-Business Centers (ACABC) Scheme",
      hi: "कृषि-क्लिनिक और कृषि-व्यवसाय केंद्र (एसीएबीसी) योजना"
    },
    category: "young-farmer",
    governmentType: "central",
    state: "all",
    benefits: {
      en: "36% to 44% financial startup subsidy and training for agricultural graduates setting up centers",
      hi: "केंद्र स्थापित करने वाले कृषि स्नातकों के लिए 36% से 44% तक वित्तीय स्टार्टअप सब्सिडी और प्रशिक्षण"
    },
    eligibilityPreview: {
      en: "Young agriculture graduates, diploma holders, and science graduates",
      hi: "युवा कृषि स्नातक, डिप्लोमा धारक और विज्ञान स्नातक"
    },
    description: {
      en: "Aims to tap the expertise of unemployed agricultural graduates to provide expert advice, services, and crop clinics to farmers while offering self-employment.",
      hi: "बेरोजगार कृषि स्नातकों की विशेषज्ञता का लाभ उठाकर किसानों को विशेषज्ञ सलाह, सेवाएं और फसल क्लीनिक प्रदान करने के साथ-साथ स्वरोजगार प्रदान करना है।"
    },
    eligibility: {
      en: [
        "Age limit between 18 to 45 years",
        "Must hold a degree/diploma in agriculture or allied subjects like horticulture, animal husbandry, forestry, etc.",
        "Must undergo 45 days free residential training at MANAGE-approved centers"
      ],
      hi: [
        "आयु सीमा 18 से 45 वर्ष के बीच",
        "कृषि या बागवानी, पशुपालन, वानिकी आदि जैसे संबद्ध विषयों में डिग्री/डिप्लोमा होना चाहिए।",
        "MANAGE द्वारा अनुमोदित केंद्रों पर 45 दिनों का निःशुल्क आवासीय प्रशिक्षण प्राप्त करना होगा"
      ]
    },
    supportType: {
      en: "Agri-Business Startup Loan & Training",
      hi: "कृषि-व्यवसाय स्टार्टअप ऋण और प्रशिक्षण"
    },
    process: {
      en: "Apply online at the ACABC portal to enroll in the training program. Post-training, submit a business project proposal to NABARD for loan and subsidy approval.",
      hi: "प्रशिक्षण कार्यक्रम में नामांकन के लिए एसीएबीसी पोर्टल पर ऑनलाइन आवेदन करें। प्रशिक्षण के बाद, ऋण और सब्सिडी के लिए नाबार्ड (नाबार्ड) को एक व्यावसायिक परियोजना प्रस्ताव जमा करें।"
    },
    officialSource: "National ACABC Portal",
    officialWebsite: "https://www.agriclinics.net/",
    lastVerifiedDate: "2026-06-18",
    status: "active",
    isFeatured: false,
    farmerTypes: ["entrepreneur"],
    benefitType: "grant",
    subsidyType: "subsidy",
    requiredDocuments: {
      en: ["Agriculture Degree/Diploma certificate", "Aadhaar Card", "MANAGE training completion certificate", "Detailed project business plan", "Bank Account Details"],
      hi: ["कृषि डिग्री / डिप्लोमा प्रमाण पत्र", "आधार कार्ड", "मैनेज प्रशिक्षण पूरा होने का प्रमाण पत्र", "विस्तृत परियोजना व्यवसाय योजना", "बैंक विवरण"]
    },
    faqs: [
      {
        question: {
          en: "What is the maximum loan limit?",
          hi: "अधिकतम ऋण सीमा क्या है?"
        },
        answer: {
          en: "Loans up to ₹20 Lakhs for individual projects and up to ₹100 Lakhs for group projects can be availed under this scheme.",
          hi: "इस योजना के तहत व्यक्तिगत परियोजनाओं के लिए ₹20 लाख तक और समूह परियोजनाओं के लिए ₹100 लाख तक का ऋण लिया जा सकता है।"
        }
      }
    ]
  }
];
