import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api, errorMessage, unwrap } from "../../../lib/api"

const CARDS = [
  { key: "newQuotes", label: "New quote requests", to: "/admin/quotes" },
  { key: "pendingBookings", label: "Pending bookings", to: "/admin/bookings" },
  { key: "unreadMessages", label: "Unread messages", to: "/admin/messages" },
  { key: "activeProjects", label: "Active projects", to: "/admin/projects" },
  { key: "subscribers", label: "Subscribers", to: "/admin/subscribers" },
  { key: "services", label: "Services", to: "/admin/services" },
]

export default function Overview() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    api.get("/admin/stats").then((r) => setStats(unwrap(r))).catch((e) => setError(errorMessage(e)))
  }, [])

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Overview</h1>
      {error && <p role="alert" className="text-sm text-[#ba1a1a]">{error}</p>}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {CARDS.map((c) => (
          <Link key={c.key} to={c.to} className="border border-[#d0c5af]/40 bg-white p-5 transition-shadow hover:shadow-md">
            <div className="text-3xl font-bold text-[#735c00]">{stats ? stats[c.key] : "–"}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-[#5f5e5e]">{c.label}</div>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold">Upcoming bookings</h2>
      <div className="border border-[#d0c5af]/40 bg-white">
        {!stats?.upcoming?.length ? (
          <p className="p-5 text-sm text-[#5f5e5e]">{stats ? "No upcoming bookings." : "Loading…"}</p>
        ) : (
          <ul>
            {stats.upcoming.map((b) => (
              <li key={b._id} className="flex flex-wrap justify-between gap-2 border-b border-[#d0c5af]/30 px-5 py-3 text-sm last:border-0">
                <span className="font-semibold">{b.date} · {b.timeSlot}</span>
                <span>{b.fullName} — {b.service}</span>
                <span className="text-[#5f5e5e]">{b.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
