import { useCallback, useEffect, useState } from "react"
import { api, unwrap } from "../../../lib/api"
import { useAuth } from "../../../store/auth"
import { useUI } from "../../../store/ui"
import {
  LayoutDashboard, Route, SlidersHorizontal, Headset,
  ArrowRight, ExternalLink, Images, UserCog, Palette,
} from "lucide-react"

const nav = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Project Tracking", icon: Route },
  { label: "User Preferences", icon: SlidersHorizontal },
  { label: "Personalized Support", icon: Headset },
]

// Shown until a real project is loaded (logged-out visitors / admins with no projects yet)
const DEMO = {
  name: "The Meridian Penthouse - Phase 3: Glazing",
  status: "in-progress",
  progress: 66,
  phase: "Structural Pit-out",
  nextMilestone: "Acoustic Testing",
}
const STATUS_LABEL = { pending: "Pending", "in-progress": "In Progress", completed: "Completed" }

export default function Portal() {
  const [active, setActive] = useState("Dashboard")
  const { user, token, logout } = useAuth()
  const openModal = useUI((s) => s.open)
  const modal = useUI((s) => s.modal)
  const [project, setProject] = useState(DEMO)

  const loadProject = useCallback(async () => {
    if (!token || user?.role !== "admin") return setProject(DEMO)
    try {
      const list = unwrap(await api.get("/projects"))
      const current = list.find((p) => p.status !== "completed") ?? list[0]
      setProject(current ?? DEMO)
    } catch {
      setProject(DEMO)
    }
  }, [token, user?.role])

  // Reload when auth changes or the project modal closes (a project may have been added)
  useEffect(() => { loadProject() }, [loadProject, modal])

  const requireLogin = (name, prefill) => (user ? openModal(name, prefill) : openModal("login"))
  const progress = project.progress ?? 0

  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#735c00]">
            Client Exclusive
          </span>
          <h2 className="text-3xl font-bold">The Gold Standard Portal</h2>
          <p className="text-sm text-[#5f5e5e]">Managing your architectural journey with professional precision.</p>
        </div>
        <div className="flex gap-2">
          {user ? (
            <button onClick={logout} className="cursor-pointer bg-[#2f3131] px-4 py-2 text-xs font-semibold text-white">Log Out</button>
          ) : (
            <button onClick={() => openModal("login")} className="cursor-pointer bg-[#2f3131] px-4 py-2 text-xs font-semibold text-white">Client Login</button>
          )}
          <button onClick={() => requireLogin("project")} className="cursor-pointer border border-[#d0c5af] bg-white px-4 py-2 text-xs font-semibold">Register Project</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <aside className="border border-[#d0c5af]/40 bg-white p-4 md:col-span-3">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center bg-[#d4af37] text-[#554300]"><UserCog size={18} /></div>
            <div>
              <div className="text-sm font-semibold">{user?.name ?? "Arthur Sterling"}</div>
              <div className="text-[10px] text-[#5f5e5e]">{user ? (user.role === "admin" ? "Administrator" : "Premium Partner") : "Premium Partner"}</div>
            </div>
          </div>
          <ul className="flex flex-col gap-1">
            {nav.map(({ label, icon: Icon }) => (
              <li key={label}>
                <button
                  onClick={() => {
                    setActive(label)
                    if (label === "User Preferences") requireLogin("preferences")
                    if (label === "Personalized Support") openModal("contact")
                  }}
                  className={`flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-left text-xs font-semibold transition-colors
                    ${active === label ? "bg-[#e8e8e8]" : "hover:bg-[#f3f3f4]"}`}
                >
                  <Icon size={14} className="text-[#5f5e5e]" /> {label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="border border-[#d0c5af]/40 bg-white p-6 md:col-span-9">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Active Project Tracking</h3>
            <span className="bg-[#ffe088] px-2 py-0.5 text-[10px] font-bold uppercase text-[#554300]">{STATUS_LABEL[project.status] ?? project.status}</span>
          </div>
          <div className="mb-1 text-sm font-semibold">{project.name}</div>
          <div className="mb-1 h-1.5 w-full bg-[#e2e2e2]">
            <div className="h-full bg-[#735c00]" style={{ width: `${progress}%` }} />
          </div>
          <div className="mb-6 flex justify-between text-[10px] text-[#5f5e5e]">
            <span>{project.phase ?? project.serviceType ?? ""}</span>
            <span>{progress}% Completed</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Next Milestone" value={project.nextMilestone ?? "To be scheduled"} sub={project === DEMO ? "Oct 14, 2024" : "Upcoming"} />
            <Stat label="Documents" value="Compliance Certs" sub="View" icon={<ExternalLink size={10} />} />
            <Stat label="Site Updates" value="12 New Photos" sub="Gallery" icon={<Images size={10} />} />
          </div>
        </div>

        <PortalCard onClick={() => openModal("contact")} className="md:col-span-5 md:col-start-4" icon={<Palette size={16} />}
          title="Personalized Service Portal"
          text="Direct access to your dedicated architectural consultant and custom design iterations." />
        <PortalCard onClick={() => requireLogin("preferences")} className="md:col-span-4" icon={<SlidersHorizontal size={16} />}
          title="User Preferences"
          text="Curate your material library, saved finishes, and notification triggers for site milestones." />
      </div>
    </section>
  )
}

function Stat({ label, value, sub, icon }) {
  return (
    <div className="border border-[#d0c5af]/40 p-3">
      <div className="mb-1 text-[9px] font-bold uppercase tracking-widest text-[#5f5e5e]">{label}</div>
      <div className="text-xs font-semibold">{value}</div>
      <div className="flex items-center gap-1 text-[10px] text-[#735c00]">{sub}{icon}</div>
    </div>
  )
}

function PortalCard({ icon, title, text, onClick, className = "" }) {
  return (
    <button onClick={onClick} className={`group cursor-pointer border border-[#d0c5af]/40 bg-white p-5 text-left transition-shadow hover:shadow-md ${className}`}>
      <div className="mb-3 flex items-start justify-between text-[#735c00]">
        {icon}
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </div>
      <h4 className="mb-1 text-sm font-semibold">{title}</h4>
      <p className="text-xs leading-5 text-[#5f5e5e]">{text}</p>
    </button>
  )
}
