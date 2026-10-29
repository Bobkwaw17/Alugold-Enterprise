import ResourceSection, { fmtDate } from "../components/ResourceSection"

const Muted = ({ children }) => <span className="text-[#5f5e5e]">{children}</span>
const Body = (text) => <p className="whitespace-pre-wrap">{text || "—"}</p>

export const Bookings = () => (
  <ResourceSection
    title="Bookings" path="/bookings" statusOptions={["pending", "confirmed", "cancelled"]}
    columns={[
      { key: "date", label: "Date" }, { key: "timeSlot", label: "Time" }, { key: "service", label: "Service" },
      { key: "fullName", label: "Name" }, { key: "email", label: "Email", render: (b) => <a className="text-[#735c00] underline" href={`mailto:${b.email}`} onClick={(e) => e.stopPropagation()}>{b.email}</a> },
    ]}
    expand={(b) => Body(b.projectDescription)} empty="No bookings yet."
  />
)

export const Quotes = () => (
  <ResourceSection
    title="Quote Requests" path="/quotes" statusOptions={["new", "contacted", "closed"]}
    columns={[
      { key: "createdAt", label: "Received", render: (q) => <Muted>{fmtDate(q.createdAt)}</Muted> },
      { key: "fullName", label: "Name" },
      { key: "email", label: "Email", render: (q) => <a className="text-[#735c00] underline" href={`mailto:${q.email}`} onClick={(e) => e.stopPropagation()}>{q.email}</a> },
      { key: "phone", label: "Phone" }, { key: "serviceType", label: "Service" },
    ]}
    expand={(q) => Body(q.projectDescription)} empty="No quote requests yet."
  />
)

export const Messages = () => (
  <ResourceSection
    title="Messages" path="/contact" statusOptions={["unread", "read", "archived"]}
    columns={[
      { key: "createdAt", label: "Received", render: (m) => <Muted>{fmtDate(m.createdAt)}</Muted> },
      { key: "fullName", label: "Name" },
      { key: "email", label: "Email", render: (m) => <a className="text-[#735c00] underline" href={`mailto:${m.email}`} onClick={(e) => e.stopPropagation()}>{m.email}</a> },
      { key: "message", label: "Message", render: (m) => <span className="line-clamp-1 max-w-xs">{m.message}</span> },
    ]}
    expand={(m) => Body(m.message)} empty="No messages yet."
  />
)

export const Subscribers = () => (
  <ResourceSection
    title="Subscribers" path="/newsletter"
    columns={[{ key: "email", label: "Email" }, { key: "createdAt", label: "Subscribed", render: (s) => <Muted>{fmtDate(s.createdAt)}</Muted> }]}
    empty="No subscribers yet."
  />
)

export const Projects = () => (
  <ResourceSection
    title="Projects" path="/projects" statusOptions={["pending", "in-progress", "completed"]}
    columns={[
      { key: "name", label: "Name" }, { key: "serviceType", label: "Service" },
      { key: "progress", label: "Progress", render: (p) => `${p.progress ?? 0}%` },
      { key: "phase", label: "Phase" }, { key: "nextMilestone", label: "Next milestone" },
    ]}
    fields={[
      { name: "name", label: "Project name", required: true },
      { name: "serviceType", label: "Service", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "status", label: "Status", type: "select", options: ["pending", "in-progress", "completed"] },
      { name: "progress", label: "Progress (0–100)", type: "number", min: 0, max: 100 },
      { name: "phase", label: "Current phase" },
      { name: "nextMilestone", label: "Next milestone" },
    ]}
    expand={(p) => Body(p.description)} empty="No projects yet."
  />
)

export const Services = () => (
  <ResourceSection
    title="Services" path="/services"
    columns={[
      { key: "order", label: "Order" }, { key: "name", label: "Name" }, { key: "category", label: "Category" },
      { key: "featured", label: "Featured", render: (s) => (s.featured ? "Yes" : "—") },
    ]}
    fields={[
      { name: "name", label: "Name", required: true },
      { name: "category", label: "Category" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "imageUrl", label: "Image URL" },
      { name: "imageAlt", label: "Image description (alt text)" },
      { name: "order", label: "Order (1 = large first card)", type: "number", min: 0 },
      { name: "featured", label: "Featured", type: "checkbox" },
    ]}
    expand={(s) => Body(s.description)} empty="No services yet. Run `npm run seed` or add one."
  />
)
