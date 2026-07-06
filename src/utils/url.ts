import React from "react";

/**
 * Validates whether a given string is a correctly formatted, absolute URL.
 * 
 * @param url The URL string to validate
 * @returns boolean true if valid URL, false otherwise
 */
export const isValidUrl = (url?: string): boolean => {
  if (!url) return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Resolves public assets paths using Vite's BASE_URL.
 */
export const getAssetUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("/")) {
    const base = import.meta.env.BASE_URL || "/";
    return `${base.replace(/\/$/, "")}${url}`;
  }
  return url;
};

/**
 * Parsers text to wrap email addresses and phone numbers in clickable links.
 */
export const formatTextWithLinks = (text: string) => {
  if (!text) return "";
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const phoneRegex = /(\+91\s*\d{5}\s*\d{5}|\+91\s*\d{10}|\b\d{10}\b)/g;
  const combinedRegex = /(\+91\s*\d{5}\s*\d{5}|\+91\s*\d{10}|\b\d{10}\b|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

  const parts = text.split(combinedRegex);
  return parts.map((part, index) => {
    if (emailRegex.test(part)) {
      return React.createElement(
        "a",
        {
          key: index,
          href: `mailto:${part}`,
          className: "text-brand-green hover:underline font-bold"
        },
        part
      );
    }
    if (phoneRegex.test(part)) {
      const cleanPhone = part.replace(/\s+/g, "");
      return React.createElement(
        "a",
        {
          key: index,
          href: `tel:${cleanPhone}`,
          className: "text-brand-green hover:underline font-bold"
        },
        part
      );
    }
    return part;
  });
};

