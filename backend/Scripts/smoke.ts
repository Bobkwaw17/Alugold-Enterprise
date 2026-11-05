// Smoke test. Offline checks always run; the full flow runs when MONGODB_URI (+ ADMIN_EMAIL/PASSWORD seeded) is set.
//   npm test
import "dotenv/config";
process.env.NODE_ENV = "test";
process.env.JWT_SECRET ||= "smoke-test-secret";
import mongoose from "mongoose";
import app from "../app";

let failed = 0;
const check = (name: string, ok: boolean, extra = "") => {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : "  " + extra}`);
};

async function main() {
  const server = app.listen(0);
  const base = `http://127.0.0.1:${(server.address() as any).port}`;
  const call = async (method: string, path: string, body?: unknown, token?: string, raw?: string) => {
    const r = await fetch(base + path, {
      method,
      headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) },
      body: raw ?? (body ? JSON.stringify(body) : undefined),
    });
    return { status: r.status, json: (await r.json().catch(() => ({}))) as any };
  };

  // ---- offline (no DB) ----
  check("GET / is active", (await call("GET", "/")).status === 200);
  check("unknown route -> 404", (await call("GET", "/nope")).status === 404);
  check("malformed JSON -> 400", (await call("POST", "/api/quotes", undefined, undefined, "{bad")).status === 400);
  check("quote missing fields -> 400", (await call("POST", "/api/quotes", { email: "x" })).status === 400);
  check("booking missing fields -> 400", (await call("POST", "/api/bookings", { service: "cladding" })).status === 400);
  check("booking past date -> 400", (await call("POST", "/api/bookings", {
    service: "cladding", date: "2000-01-01", timeSlot: "09:00 AM – 10:30 AM", fullName: "A", email: "a@b.co" })).status === 400);
  check("booking bad slot -> 400", (await call("POST", "/api/bookings", {
    service: "cladding", date: "2999-01-01", timeSlot: "midnight", fullName: "A", email: "a@b.co" })).status === 400);
  check("slots bad date -> 400", (await call("GET", "/api/bookings/slots?date=tomorrow")).status === 400);
  check("newsletter bad email -> 400", (await call("POST", "/api/newsletter/subscribe", { email: "nope" })).status === 400);
  check("contact missing -> 400", (await call("POST", "/api/contact", {})).status === 400);
  check("login missing -> 400", (await call("POST", "/api/auth/login", {})).status === 400);
  check("create service w/o token -> 401", (await call("POST", "/api/services", { name: "x", description: "y" })).status === 401);
  check("delete service w/o token -> 401", (await call("DELETE", "/api/services/abc")).status === 401);
  for (const [m, path] of [["GET", "/api/quotes"], ["GET", "/api/contact"], ["GET", "/api/newsletter"], ["GET", "/api/admin/stats"], ["PUT", "/api/content"], ["DELETE", "/api/projects/x"]])
    check(`${m} ${path} w/o token -> 401`, (await call(m, path, m === "PUT" ? { site_tagline: "x" } : undefined)).status === 401);
  check("GET /api/content is public shape", ["object"].includes(typeof (await call("GET", "/")).json));
  check("GET bookings w/o token -> 401", (await call("GET", "/api/bookings")).status === 401);
  check("projects w/o token -> 401", (await call("GET", "/api/projects")).status === 401);
  check("preferences w/o token -> 401", (await call("GET", "/api/users/abc/preferences")).status === 401);
  check("bad token -> 401", (await call("GET", "/api/projects", undefined, "garbage")).status === 401);

  // ---- full flow (needs DB) ----
  if (process.env.MONGODB_URI && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    await mongoose.connect(process.env.MONGODB_URI);
    const date = "2999-06-15";
    const slot = "11:00 AM – 12:30 PM";
    const login = await call("POST", "/api/auth/login", { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
    check("admin login", login.status === 200 && !!login.json.data?.token, JSON.stringify(login.json));
    const token = login.json.data?.token;
    const uid = login.json.data?.user?._id;
    check("wrong password -> 401", (await call("POST", "/api/auth/login", { email: process.env.ADMIN_EMAIL, password: "wrong" })).status === 401);

    const b1 = await call("POST", "/api/bookings", { service: "cladding", date, timeSlot: slot, fullName: "Smoke", email: "s@t.co" });
    check("create booking -> 201", b1.status === 201, JSON.stringify(b1.json));
    check("double-book -> 409", (await call("POST", "/api/bookings", { service: "cladding", date, timeSlot: slot, fullName: "B", email: "b@t.co" })).status === 409);
    const slots = await call("GET", `/api/bookings/slots?date=${date}`);
    check("slot shows unavailable", slots.json.data?.slots?.find((s: any) => s.slot === slot)?.available === false);
    const id = b1.json.data?._id;
    check("cancel frees slot", (await call("PATCH", `/api/bookings/${id}`, { status: "cancelled" }, token)).status === 200
      && (await call("GET", `/api/bookings/slots?date=${date}`)).json.data.slots.find((s: any) => s.slot === slot).available === true);
    check("delete booking", (await call("DELETE", `/api/bookings/${id}`, undefined, token)).status === 200);

    const sv = await call("POST", "/api/services", { name: "Smoke Service", description: "d", order: 99 }, token);
    check("create service -> slug", sv.status === 201 && sv.json.data.slug === "smoke-service", JSON.stringify(sv.json));
    check("get service by slug", (await call("GET", "/api/services/smoke-service")).json.data?.name === "Smoke Service");
    check("list services sorted by order", (await call("GET", "/api/services")).json.data.at(-1)?.slug === "smoke-service");
    check("delete service", (await call("DELETE", `/api/services/${sv.json.data?._id}`, undefined, token)).status === 200);
    const cu = await call("PUT", "/api/content", { home_heroTitle: "Smoke Title" }, token);
    check("update content", cu.status === 200 && cu.json.data.home_heroTitle === "Smoke Title", JSON.stringify(cu.json));
    check("unknown content key -> 400", (await call("PUT", "/api/content", { evil: "x" }, token)).status === 400);
    check("empty value reverts", (await call("PUT", "/api/content", { home_heroTitle: "" }, token)).json.data.home_heroTitle === undefined);
    const st = await call("GET", "/api/admin/stats", undefined, token);
    check("admin stats", st.status === 200 && typeof st.json.data.newQuotes === "number", JSON.stringify(st.json));
    const ql = await call("GET", "/api/quotes", undefined, token);
    check("admin list quotes", ql.status === 200 && Array.isArray(ql.json.data));
    check("create quote -> 201", (await call("POST", "/api/quotes", { fullName: "Q", email: "q@t.co", serviceType: "cladding", projectDescription: "x" })).status === 201);
    const pr = await call("PUT", `/api/users/${uid}/preferences`, { materials: ["Aluminum"], notifications: { email: false } }, token);
    check("update preferences", pr.status === 200 && pr.json.data.notifications.email === false, JSON.stringify(pr.json));
    const proj = await call("POST", "/api/projects", { name: "Smoke Project", serviceType: "cladding", description: "d" }, token);
    check("create project", proj.status === 201, JSON.stringify(proj.json));
    if (proj.json.data?._id) await mongoose.connection.collection("projects").deleteOne({ name: "Smoke Project" });
    await mongoose.connection.collection("quotes").deleteMany({ email: "q@t.co" });
    await mongoose.disconnect();
  } else {
    console.log("SKIP  full flow (set MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD and run `npm run seed` first)");
  }

  server.close();
  console.log(failed ? `\n${failed} FAILED` : "\nAll checks passed");
  process.exit(failed ? 1 : 0);
}
main();
