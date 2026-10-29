// Editable page texts: defaults shown when the admin hasn't overridden a key.
// Keys must match backend/Utils/contentKeys.ts. Groups drive the admin "Page Content" editor.
export const CONTENT_GROUPS = [
  { title: "Site-wide", fields: [
    { key: "site_tagline", label: "Footer tagline", multiline: true, default: "Redefining the skyline with precision engineering and architectural solutions for high-net-worth developers" },
    { key: "contact_hotline", label: "Hotline", default: "+44 (0) 20 7946 0123" },
    { key: "contact_email", label: "Contact email", default: "consult@alugold.com" },
  ]},
  { title: "Home page", fields: [
    { key: "home_heroTitle", label: "Hero title", default: "Modern Construction & Consultation Services" },
    { key: "home_heroSubtitle", label: "Hero subtitle", default: "Reliable solutions for contemporary building needs" },
    { key: "home_standardEyebrow", label: "Standard — eyebrow", default: "The Alugold Standard" },
    { key: "home_standardTitle", label: "Standard — title", default: "Decades of Engineering Mastery" },
    { key: "home_standardBody1", label: "Standard — paragraph 1", multiline: true, default: "ALUGOLD ENTERPRISE stands at the intersection of architectural vision and structural reality. We specialize in high-end aluminum and glass solutions that define the modern skyline." },
    { key: "home_standardBody2", label: "Standard — paragraph 2", multiline: true, default: "Our approach combines rigorous engineering standards with an aesthetic eye, ensuring that every project—from simple window fabrications to complex curtain wall systems—meets the highest global benchmarks for quality and durability." },
    { key: "home_stat1Value", label: "Stat 1 value", default: "15+" },
    { key: "home_stat1Label", label: "Stat 1 label", default: "Years Excellence" },
    { key: "home_stat2Value", label: "Stat 2 value", default: "500+" },
    { key: "home_stat2Label", label: "Stat 2 label", default: "Projects Completed" },
    { key: "home_expertiseTitle", label: "Expertise heading", default: "Our Core Expertise" },
    { key: "home_ctaTitle", label: "Call-to-action title", default: "Need a reliable construction partner?" },
    { key: "home_ctaBody", label: "Call-to-action text", multiline: true, default: "From conceptual design to final handover, we deliver excellence at every stage. Let's discuss your next landmark project." },
  ]},
  { title: "About page", fields: [
    { key: "about_eyebrow", label: "Hero eyebrow", default: "Our Heritage & Vision" },
    { key: "about_heroTitle", label: "Hero title", default: "Precision Engineering Meets Architectural Artistry" },
    { key: "about_heroBody", label: "Hero text", multiline: true, default: "At ALUGOLD ENTERPRISE, we don't just build; we craft. Our team of master engineers and designers specialize in premium aluminum and glass solutions that define the skyline of luxury." },
    { key: "about_stat1Value", label: "Stat 1 value", default: "15+" },
    { key: "about_stat1Label", label: "Stat 1 label", default: "Years Excellence" },
    { key: "about_stat2Value", label: "Stat 2 value", default: "500+" },
    { key: "about_stat2Label", label: "Stat 2 label", default: "Premium Projects" },
    { key: "about_detailsTitle", label: "Details heading", default: "Excellence in Every Detail" },
    { key: "about_detailsSubtitle", label: "Details subheading", default: "The ALUGOLD standard of architectural integrity." },
    { key: "about_ctaTitle", label: "Call-to-action title", default: "Require Immediate Consultation?" },
    { key: "about_ctaBody", label: "Call-to-action text", multiline: true, default: "Our senior project directors are available for private consultations regarding large-scale architectural implementations." },
  ]},
  { title: "Services page", fields: [
    { key: "service_eyebrow", label: "Hero eyebrow", default: "Premium Architectural Solutions" },
    { key: "service_heroTitle", label: "Hero title", default: "Expert Services for Structural Excellence" },
    { key: "service_heroBody", label: "Hero text", multiline: true, default: "Specializing in high-performance cladding, custom fabrication, and architectural curtain walls for the world's most ambitious developments." },
  ]},
]

export const DEFAULTS = Object.fromEntries(CONTENT_GROUPS.flatMap((g) => g.fields.map((f) => [f.key, f.default])))
