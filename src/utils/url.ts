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
