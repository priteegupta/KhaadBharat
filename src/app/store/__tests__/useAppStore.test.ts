// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAppStore } from "../useAppStore";

// Mock i18n
vi.mock("../../../i18n/config", () => {
  return {
    default: {
      changeLanguage: vi.fn(),
    },
  };
});

describe("Zustand app store tests", () => {
  beforeEach(() => {
    // Reset Zustand store state before each test
    useAppStore.setState({
      lang: "en",
      enquiries: [],
      exportEnquiries: [],
    });
    localStorage.clear();
  });

  it("should have correct default state", () => {
    const state = useAppStore.getState();
    expect(state.lang).toBe("en");
    expect(state.enquiries).toEqual([]);
    expect(state.exportEnquiries).toEqual([]);
  });

  it("should change language preference correctly", () => {
    const store = useAppStore.getState();
    store.setLang("hi");

    const updatedState = useAppStore.getState();
    expect(updatedState.lang).toBe("hi");
    expect(localStorage.getItem("khaad-bharat-language")).toBe("hi");
    expect(document.documentElement.lang).toBe("hi");
  });

  it("should add general enquiries and cap them at 3 items", () => {
    const store = useAppStore.getState();
    
    const item1 = { name: "Ramesh", phone: "9876543210", interest: "farmer", language: "English", message: "Need biochar" };
    const item2 = { name: "Suresh", phone: "9876543211", interest: "dealer", language: "Hindi", message: "Onboarding details" };
    const item3 = { name: "Kamlesh", phone: "9876543212", interest: "farmer", language: "Hindi", message: "Moisture query" };
    const item4 = { name: "Naresh", phone: "9876543213", interest: "export", language: "English", message: "Bulk quote" };

    store.addEnquiry(item1);
    store.addEnquiry(item2);
    store.addEnquiry(item3);
    store.addEnquiry(item4);

    const state = useAppStore.getState();
    expect(state.enquiries.length).toBe(3);
    // The most recently added (item4) should be at the top index (index 0)
    expect(state.enquiries[0].name).toBe("Naresh");
    expect(state.enquiries[1].name).toBe("Kamlesh");
    expect(state.enquiries[2].name).toBe("Suresh");
    
    // Check localStorage syncing
    const cached = JSON.parse(localStorage.getItem("khaad-bharat-enquiries") || "[]");
    expect(cached.length).toBe(3);
    expect(cached[0].name).toBe("Naresh");
  });

  it("should add export enquiries and cap them at 3 items", () => {
    const store = useAppStore.getState();

    const entry1 = { name: "Al-Faisal", company: "Riyadh Farms", country: "Saudi Arabia", email: "info@alfaisal.com", interest: "export", message: "Organic fertilizer bulk" };
    const entry2 = { name: "Yuki", company: "Tokyo Agri", country: "Japan", email: "yuki@tokyoagri.jp", interest: "export", message: "Biochar sample request" };
    const entry3 = { name: "John", company: "London Soil", country: "UK", email: "john@londonsoil.co.uk", interest: "export", message: "Distributor onboarding" };
    const entry4 = { name: "David", company: "Sydney Crops", country: "Australia", email: "david@sydneycrops.com.au", interest: "export", message: "Import rates check" };

    store.addExportEnquiry(entry1);
    store.addExportEnquiry(entry2);
    store.addExportEnquiry(entry3);
    store.addExportEnquiry(entry4);

    const state = useAppStore.getState();
    expect(state.exportEnquiries.length).toBe(3);
    expect(state.exportEnquiries[0].name).toBe("David");
    expect(state.exportEnquiries[1].name).toBe("John");
    expect(state.exportEnquiries[2].name).toBe("Yuki");

    const cached = JSON.parse(localStorage.getItem("khaad-bharat-export-enquiries") || "[]");
    expect(cached.length).toBe(3);
    expect(cached[0].name).toBe("David");
  });
});
