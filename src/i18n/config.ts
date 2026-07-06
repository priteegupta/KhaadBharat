import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./en/common.json";
import translationHI from "./hi/common.json";
import mediaEN from "./en/media.json";
import mediaHI from "./hi/media.json";
import weatherEN from "./en/weather.json";
import weatherHI from "./hi/weather.json";
import productEN from "./en/product.json";
import productHI from "./hi/product.json";
import schemesEN from "./en/schemes.json";
import schemesHI from "./hi/schemes.json";
import faqEN from "./en/faq.json";
import faqHI from "./hi/faq.json";
import contactEN from "./en/contact.json";
import contactHI from "./hi/contact.json";

const resources = {
  en: {
    common: {
      ...translationEN,
      media: mediaEN,
      weather: weatherEN,
    },
    product: productEN,
    schemes: schemesEN,
    faq: faqEN,
    contact: contactEN,
  },
  hi: {
    common: {
      ...translationHI,
      media: mediaHI,
      weather: weatherHI,
    },
    product: productHI,
    schemes: schemesHI,
    faq: faqHI,
    contact: contactHI,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "hi",
    ns: ["common", "product", "schemes", "faq", "contact"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: "khaad-bharat-lang-v2",
    },
  });

export default i18n;
