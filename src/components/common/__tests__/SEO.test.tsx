import React from "react";
import { describe, it, expect, vi } from "vitest";
import { SEO } from "../SEO";

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === "brand.heroProduct") return "Biochar Fertilizer";
      if (key === "brand.tagline") return "Farmer's Best Friend";
      if (key === "pages.home.summary") return "Premium organic biochar.";
      return key;
    },
  }),
}));

// Mock react-helmet-async
vi.mock("react-helmet-async", () => {
  return {
    Helmet: ({ children }: { children: React.ReactNode }) => <div className="helmet">{children}</div>,
  };
});

describe("SEO Component Unit Tests", () => {
  it("should generate correct metadata with defaults", () => {
    const element = SEO({});
    expect(element).toBeDefined();
    
    // Traverse the children of the Helmet component
    const helmetChildren = React.Children.toArray((element as any).props.children);
    
    // Find title
    const titleChild = helmetChildren.find((child: any) => child.type === "title");
    expect(titleChild).toBeDefined();
    expect((titleChild as any).props.children).toBe("Biochar Fertilizer - Farmer's Best Friend");

    // Find description
    const descMeta = helmetChildren.find((child: any) => child.type === "meta" && child.props.name === "description");
    expect(descMeta).toBeDefined();
    expect((descMeta as any).props.content).toBe("Premium organic biochar.");
  });

  it("should accept custom title and override defaults", () => {
    const element = SEO({ title: "About Us", description: "Learn more about us" });
    const helmetChildren = React.Children.toArray((element as any).props.children);

    const titleChild = helmetChildren.find((child: any) => child.type === "title");
    expect(titleChild).toBeDefined();
    expect((titleChild as any).props.children).toBe("About Us | KHAAD BHARAT");

    const descMeta = helmetChildren.find((child: any) => child.type === "meta" && child.props.name === "description");
    expect(descMeta).toBeDefined();
    expect((descMeta as any).props.content).toBe("Learn more about us");
  });
});
