import { useState } from "react"
import { NavLink, Navigate, Route, Routes } from "react-router-dom"
import {
  LayoutDashboard, CalendarCheck, FileText, Mail, Users, FolderKanban, Layers, PenLine, LogOut, ExternalLink, Menu, X,
} from "lucide-react"
import { useAuth } from "../../store/auth"
import { useSubmit } from "../../lib/useSubmit"
import Field, { FormMessage, SubmitButton } from "../../shared/components/Field"
import Overview from "./sections/Overview"
import Content from "./sections/Content"
import { Bookings, Quotes, Messages, Subscribers, Projects, Services } from "./sections/sections"

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/admin/quotes", label: "Quote Requests", icon: FileText },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/subscribers", label: "Subscribers", icon: Users },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/services", label: "Services", icon: Layers },
  { to: "/admin/content", label: "Page Content", icon: PenLine },
]

function AdminLogin() {
  const login = useAuth((s) => s.login)
  const { busy, state, run } = useSubmit(login)
  return (
    <div className="grid min-h-screen place-items-center bg-[#f9f9f9] p-4">
      <form
        onSubmit={(e) => { e.preventDefault(); const f = e.currentTarget; run(f.email.value.trim(), f.password.value) }}
        className="w-full max-w-sm space-y-5 border border-[#d0c5af]/40 bg-white p-8 shadow-sm"
      >
        <div>
          <div className="text-xl font-bold">ALUGOLD</div>
          <div className="text-xs uppercase tracking-widest text-[#735c00]">Admin sign in</div>
        </div>
        <Field label="Email" name="email" type="email" required autoComplete="username" />
        <Field label="Password" name="password" type="password" required autoComplete="current-password" />
        <FormMessage state={state} />
        <SubmitButton busy={busy}>Sign In</SubmitButton>
      </form>
    </div>
  )
}

export default function Admin() {
  const { user, logout } = useAuth()
  const [menu, setMenu] = useState(false)

  if (!user) return <AdminLogin />
  if (user.role !== "admin") {
    return (
      <div className="grid min-h-screen place-items-center p-4 text-center">
        <div>
          <p className="mb-4">This account does not have admin access.</p>
          <button onClick={logout} className="cursor-pointer bg-[#2f3131] px-4 py-2 text-sm text-white">Sign out</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] md:flex">
      <header className="flex items-center justify-between bg-[#2f3131] px-4 py-3 text-white md:hidden">
        <span className="font-bold">ALUGOLD Admin</span>
        <button type="button" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="admin-navigation" onClick={() => setMenu((m) => !m)} className="grid h-11 w-11 place-items-center cursor-pointer">
          {menu ? <X /> : <Menu />}
        </button>
      </header>

      <aside id="admin-navigation" className={`${menu ? "block" : "hidden"} w-full shrink-0 bg-[#2f3131] text-white md:sticky md:top-0 md:block md:h-screen md:w-60`}>
        <div className="hidden px-6 py-6 md:block">
          <div className="text-xl font-bold">ALUGOLD</div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-[#e9c349]">Admin</div>
        </div>
        <nav className="flex flex-col gap-1 px-3 pb-4">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={label} to={to} end={end} onClick={() => setMenu(false)}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2 text-sm ${isActive ? "bg-white/10 text-[#e9c349]" : "text-white/70 hover:bg-white/5"}`}
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 px-6 py-4 text-sm md:absolute md:bottom-0 md:w-60">
          <div className="mb-2 truncate text-white/70">{user.name}</div>
          <a href="/" className="mb-2 flex items-center gap-2 text-white/70 hover:text-white"><ExternalLink size={14} /> View site</a>
          <button onClick={logout} className="flex cursor-pointer items-center gap-2 text-white/70 hover:text-white"><LogOut size={14} /> Sign out</button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-5 md:p-10">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="quotes" element={<Quotes />} />
          <Route path="messages" element={<Messages />} />
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="projects" element={<Projects />} />
          <Route path="services" element={<Services />} />
          <Route path="content" element={<Content />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}
