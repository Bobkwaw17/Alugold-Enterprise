import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { api, errorMessage, unwrap } from "../../../lib/api"
import { useAuth } from "../../../store/auth"
import { useUI } from "../../../store/ui"
import {
  LayoutDashboard, Route, SlidersHorizontal, Headset, ArrowRight, UserCog, Palette,
} from "lucide-react"

const nav = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Project Tracking", icon: Route },
  { label: "User Preferences", icon: SlidersHorizontal },
  { label: "Personalized Support", icon: Headset },
]

const STATUS_LABEL = { pending: "Pending", "in-progress": "In Progress", completed: "Completed" }

export default function Portal() {
  const [active, setActive] = useState("Dashboard")
  const { user, token, logout } = useAuth()
  const openModal = useUI((s) => s.open)
  const modal = useUI((s) => s.modal)
  const { hash } = useLocation()
  const [project, setProject] = useState(null)
  const [projectError, setProjectError] = useState("")
  const [projectLoading, setProjectLoading] = useState(true)

  useEffect(() => {
    if (hash !== "#portal") return
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("portal")?.scrollIntoView({ behavior: "smooth" })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [hash])

  useEffect(() => {
    let cancelled = false
    if (!token || user?.role !== "admin") {
      setProject(null)
      setProjectError("")
      setProjectLoading(false)
      return () => { cancelled = true }
    }
    setProjectLoading(true)
    api.get("/projects")
      .then((response) => {
        if (cancelled) return
        const list = unwrap(response)
        const current = list.find((p) => p.status !== "completed") ?? list[0]
        setProject(current ?? null)
        setProjectError("")
      })
      .catch((error) => {
        if (cancelled) return
        setProject(null)
        setProjectError(errorMessage(error, "Could not load project details."))
      })
      .finally(() => {
        if (!cancelled) setProjectLoading(false)
      })
    return () => { cancelled = true }
  }, [token, user?.role, modal])

  const requireLogin = (name, prefill) => (user ? openModal(name, prefill) : openModal("login"))
  const startProject = () => user?.role === "admin" ? openModal("project") : openModal("quote")
  const progress = Math.min(100, Math.max(0, Number(project?.progress) || 0))

  return (
    <section id="portal" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-20 lg:px-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#735c00]">
            Client Exclusive
          </span>
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">The Gold Standard Portal</h2>
          <p className="mt-1 max-w-xl text-sm leading-6 text-[#5f5e5e]">Project information and support for every step of your architectural journey.</p>
        </div>
        <div className="flex w-full flex-wrap gap-2 sm:w-auto">
          {user ? (
            <button onClick={logout} className="min-h-11 cursor-pointer bg-[#2f3131] px-4 py-2 text-xs font-semibold text-white">Log Out</button>
          ) : (
            <button onClick={() => openModal("login")} className="min-h-11 cursor-pointer bg-[#2f3131] px-4 py-2 text-xs font-semibold text-white">Client Login</button>
          )}
          <button onClick={startProject} className="min-h-11 cursor-pointer border border-[#d0c5af] bg-white px-4 py-2 text-xs font-semibold transition-colors hover:bg-[#f3f3f4]">
            {user?.role === "admin" ? "Create Project" : "Start a Project"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <aside className="border border-[#d0c5af]/40 bg-white p-4 md:col-span-3">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center bg-[#d4af37] text-[#554300]"><UserCog size={18} /></div>
            <div>
              <div className="text-sm font-semibold">{user?.name ?? "Welcome"}</div>
              <div className="text-[10px] text-[#5f5e5e]">{user ? (user.role === "admin" ? "Administrator" : "Premium Partner") : "Guest"}</div>
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

        <div className="border border-[#d0c5af]/40 bg-white p-5 sm:p-6 md:col-span-9">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold">Project Tracking</h3>
            {project && <span className="bg-[#ffe088] px-2 py-1 text-[10px] font-bold uppercase text-[#554300]">{STATUS_LABEL[project.status] ?? project.status}</span>}
          </div>
          {projectLoading ? (
            <p role="status" className="text-sm text-[#5f5e5e]">Loading project details…</p>
          ) : projectError ? (
            <p role="alert" className="text-sm text-[#ba1a1a]">{projectError}</p>
          ) : project ? (
            <>
              <div className="mb-2 break-words text-sm font-semibold">{project.name}</div>
              <div className="mb-2 h-1.5 w-full bg-[#e2e2e2]" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Project completion">
                <div className="h-full bg-[#735c00]" style={{ width: `${progress}%` }} />
              </div>
              <div className="mb-6 flex flex-wrap justify-between gap-2 text-[10px] text-[#5f5e5e]">
                <span>{project.phase ?? project.serviceType ?? ""}</span>
                <span>{progress}% Completed</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Stat label="Next Milestone" value={project.nextMilestone ?? "To be scheduled"} sub="Upcoming" />
                <Stat label="Project Status" value={STATUS_LABEL[project.status] ?? project.status} sub="Current update" />
              </div>
            </>
          ) : (
            <div className="border border-dashed border-[#d0c5af] bg-[#f9f9f9] p-5 sm:p-6">
              <p className="mb-1 text-sm font-semibold">
                {user?.role === "admin" ? "No projects to track yet." : "Project updates are managed by our team."}
              </p>
              <p className="text-sm leading-6 text-[#5f5e5e]">
                {user?.role === "admin" ? "Create a project to begin tracking its progress." : "Contact our team for an update or to discuss your next project."}
              </p>
            </div>
          )}
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

function Stat({ label, value, sub }) {
  return (
    <div className="border border-[#d0c5af]/40 p-3">
      <div className="mb-1 text-[9px] font-bold uppercase tracking-widest text-[#5f5e5e]">{label}</div>
      <div className="text-xs font-semibold">{value}</div>
      <div className="text-[10px] text-[#735c00]">{sub}</div>
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
