import { create } from "zustand";
import i18n from "../../i18n/config";

export interface Enquiry {
  name: string;
  phone: string;
  email?: string;
  state?: string;
  interest: string;
  language: string;
  message: string;
  createdAt: string;
}

export interface ExportEnquiry {
  name: string;
  company: string;
  country: string;
  email: string;
  interest: string;
  message: string;
  createdAt: string;
}

interface AppState {
  lang: "en" | "hi";
  setLang: (lang: "en" | "hi") => void;
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, "createdAt">) => void;
  exportEnquiries: ExportEnquiry[];
  addExportEnquiry: (enquiry: Omit<ExportEnquiry, "createdAt">) => void;
}

const getStoredItem = (key: string, fallback: string) => {
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const setStoredItem = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Fail silently
  }
};

export const useAppStore = create<AppState>((set) => ({
  lang: (getStoredItem("khaad-bharat-language", "en") as "en" | "hi") || "en",
  setLang: (lang) => {
    set({ lang });
    setStoredItem("khaad-bharat-language", lang);
    document.documentElement.lang = lang;
    i18n.changeLanguage(lang);
  },
  enquiries: (() => {
    try {
      const data = getStoredItem("khaad-bharat-enquiries", "[]");
      return JSON.parse(data);
    } catch {
      return [];
    }
  })(),
  addEnquiry: (enquiry) => {
    set((state) => {
      const newEnquiry: Enquiry = {
        ...enquiry,
        createdAt: new Date().toISOString(),
      };
      const updated = [newEnquiry, ...state.enquiries].slice(0, 3);
      setStoredItem("khaad-bharat-enquiries", JSON.stringify(updated));
      return { enquiries: updated };
    });
  },
  exportEnquiries: (() => {
    try {
      const data = getStoredItem("khaad-bharat-export-enquiries", "[]");
      return JSON.parse(data);
    } catch {
      return [];
    }
  })(),
  addExportEnquiry: (enquiry) => {
    set((state) => {
      const newExport: ExportEnquiry = {
        ...enquiry,
        createdAt: new Date().toISOString(),
      };
      const updated = [newExport, ...state.exportEnquiries].slice(0, 3);
      setStoredItem("khaad-bharat-export-enquiries", JSON.stringify(updated));
      return { exportEnquiries: updated };
    });
  },
}));
