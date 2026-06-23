export interface SubsidyCardData {
  title: string;
  amount: string;
  description: string;
  type: string;
}

export const subsidyCardsEN: SubsidyCardData[] = [
  {
    title: "Fertilizer Support",
    amount: "50% Subvention",
    description: "Financial support on purchasing bio-inputs, organic compost, and soil health carbon blocks.",
    type: "fertilizer"
  },
  {
    title: "Equipment Subsidy",
    amount: "80% Capital Aid",
    description: "Government aid on installing micro-irrigation systems, solar pump motors, and organic shredders.",
    type: "equipment"
  },
  {
    title: "Certified Seed Subsidy",
    amount: "Free Mini-Kits",
    description: "Distribution of climate-resilient crop seeds and organic seed varieties through local bodies.",
    type: "seeds"
  },
  {
    title: "Eco Farm Incentives",
    amount: "₹50k / Hectare",
    description: "Direct cash support for clusters shifting from chemical agriculture to eco-friendly practices.",
    type: "eco"
  }
];

export const subsidyCardsHI: SubsidyCardData[] = [
  {
    title: "उर्वरक सहायता",
    amount: "50% सब्सिडी",
    description: "जैव-इनपुट, जैविक खाद और मिट्टी के स्वास्थ्य के लिए कार्बन ब्लॉक खरीदने पर वित्तीय सहायता।",
    type: "fertilizer"
  },
  {
    title: "कृषि यंत्र सब्सिडी",
    amount: "80% पूंजीगत सहायता",
    description: "सूक्ष्म सिंचाई प्रणाली, सौर पंप मोटर और जैविक अपशिष्ट कटर मशीन स्थापित करने पर सरकारी सहायता।",
    type: "equipment"
  },
  {
    title: "प्रमाणित बीज सब्सिडी",
    amount: "मुफ्त मिनी-किट",
    description: "स्थानीय निकायों के माध्यम से जलवायु-अनुकूल और जैविक बीज किस्मों का मुफ्त वितरण।",
    type: "seeds"
  },
  {
    title: "पारिस्थितिकी अनुकूल कृषि प्रोत्साहन",
    amount: "₹50,000 / हेक्टेयर",
    description: "रासायनिक कृषि से पर्यावरण-अनुकूल पद्धतियों में स्थानांतरित होने वाले किसान समूहों को नकद प्रोत्साहन सहायता।",
    type: "eco"
  }
];
