// Whitelist of editable page texts. Keep in sync with frontend/src/lib/contentDefaults.js
export const CONTENT_KEYS = [
  "site_tagline",
  "home_heroTitle", "home_heroSubtitle",
  "home_standardEyebrow", "home_standardTitle", "home_standardBody1", "home_standardBody2",
  "home_stat1Value", "home_stat1Label", "home_stat2Value", "home_stat2Label",
  "home_expertiseTitle",
  "home_ctaTitle", "home_ctaBody",
  "about_eyebrow", "about_heroTitle", "about_heroBody",
  "about_stat1Value", "about_stat1Label", "about_stat2Value", "about_stat2Label",
  "about_detailsTitle", "about_detailsSubtitle",
  "about_ctaTitle", "about_ctaBody",
  "service_eyebrow", "service_heroTitle", "service_heroBody",
  "contact_hotline", "contact_email",
] as const;
