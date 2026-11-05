import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../Models/User";
import Service from "../Models/Service";

async function main() {
  await mongoose.connect(process.env.MONGODB_URI as string);

  const email = (process.env.ADMIN_EMAIL ?? "").toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
  await User.findOneAndUpdate(
    { email },
    { name: process.env.ADMIN_NAME ?? "Admin", email, password: await bcrypt.hash(password, 12), role: "admin" },
    { upsert: true, setDefaultsOnInsert: true }
  );
  console.log(`Admin ready: ${email}`);

  const services = [
    { name: "Premium Aluminum Cladding", slug: "premium-aluminum-cladding", category: "Architectural Exteriors", featured: true, order: 1,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDd5M0AWNl09kNcPwEsLQ5p03k393TT9-T0q_FHJFo7C_HgTJhl0VNL9gUouFhVmfTH8MxIpPnEekKMUqr-7g7bXI4V37UbIG9PZDrpo3nZm_kgSf_YyaZ2hjtait_S0gZl4jg2sE2VYntUW8hzvWW-YvX8-Aw5MSyd40ViQq3DXxHz4kc2am6AMgkP_AbPguSOeKeuVKtcPmBCCnLZOVOvrHsRSDHuk9K7zwUlZA37sYomGPRjKBjoMCPkr4li-Hu0QnKQpn1zIiAF",
      imageAlt: "High-end metallic building cladding under direct golden hour sunlight.",
      description: "Durable, weather-resistant solutions that define the modern skyline. Our cladding systems are engineered for both aesthetic brilliance and structural longevity." },
    { name: "Custom Fabrication", slug: "custom-fabrication", category: "Craft & Engineering", order: 2,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBM-39FPiTn3mneJCOSoi-CX0gzvzupTC0s8WT67igb6E2h6rZ8uzlWy_x2ySilw7jGQrUjA9Urec1CY_K3Oy4Kb8dRsu5r8tm-1huuba0f05ERkU5ChhVGtOAX2ncyUwqnnmOx7Gu5jcozXZKYOhz5Ekm3siOW1UKRA0aLOUVOOCmDGMk7YTWkHHi7YJqWOmSrQqdYPdNds6Rv1bD-6fEKhfwJ5-zjzm6zAyxgIy8QiB8Mg5wYY_ZIzcrzlClPxZRWw40AU9CYNNRS",
      imageAlt: "Craftsman working on a bespoke architectural metal component.",
      description: "Bespoke metalwork and assembly tailored to unique architectural specifications." },
    { name: "Curtain Wall Systems", slug: "curtain-wall-systems", category: "Structural Glass", order: 3,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuHR7oDs0c4SFvzsyNefOsOskYr8U4ZHGUOMlTnlN88eKbm6dViIYZ5Jwn3XE5qOQM_heHSp2I3bK3LXsD9SPfQradYP_DSo4HYJkwKk0IB8K7_KNBE_4f3txlxK_JfcGQTUYXfjkV-bnh0pEmuwLKIMB_yRjwKAO77164vuULG0Zo_G3QMQ8E3rrhN4Ue0OfaNvsIrb3msnom9ijzCFemwtZH-JZaUqLwc2KvSCdM1DdVTFmC26urChJSqN2FLmNVPybOfTV09Z4u",
      imageAlt: "Glass and aluminum curtain wall reflecting a clear blue sky.",
      description: "Sophisticated floor-to-ceiling glass systems with integrated aluminum framing." },
    { name: "Technical Maintenance", slug: "technical-maintenance", category: "Asset Longevity", order: 4,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDziIZLAAvRpdHMZbwFr65pRztW5rUoPiipUDrTGp9LbHK6uDbKJy9vn2HBPTOJw0Qg-VZmlV3zgeHx1NlYGWd63gI3pwj2cdU9iF6S7er1CPJWluGwssqzpslZ1JE6oL-Kj5MwAG75XEGQCGgzMqNQC59OcB6egXwf3L5DkDtt6_KmGiCujz7TYH3BFAjOf0GB3BhgQoN6yD1yrvoupOc4IL9X4xfx2I3stPjsOf5rVldIk9J1_5J-EleHyq5nAQgg9gpUYdATRVtq",
      imageAlt: "Technician conducting a professional inspection on a modern facade.",
      description: "Post-installation support and periodic structural integrity inspections." },
  ];
  // upsert by slug and refresh content so re-seeding keeps data current
  for (const s of services) await Service.updateOne({ slug: s.slug }, { $set: s }, { upsert: true });
  console.log(`Services ready: ${services.length}`);

  await mongoose.disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
