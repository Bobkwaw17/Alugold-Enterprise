import { useEffect, useState } from "react";
import { api, unwrap } from "../../../lib/api";
import { useSubmit } from "../../../lib/useSubmit";
import { FormMessage } from "../../../shared/components/Field";
import { Layers, Settings2, Grid2x2, Phone, Mail } from "lucide-react";
import BookingCalendar from "./calendar";

// ─── Sub-components ───────────────────────────────────────────────────────────

function ServicePill({ icon, label, checked, onChange }) {
  return (
    <label className="group relative cursor-pointer">
      <input
        className="peer sr-only"
        name="service"
        type="radio"
        checked={checked}
        onChange={onChange}
        readOnly={!onChange}
      />
      <div className="border border-[#d0c5af]/50 p-6 transition-all peer-checked:border-[#d4af37] peer-checked:bg-[#f3f3f4]">
        <div className="mb-2 text-[#5f5e5e] transition-colors group-hover:text-[#735c00]">
          {icon}
        </div>
        <div className="text-sm font-semibold tracking-wide text-[#1a1c1c]">{label}</div>
      </div>
      <div className="absolute right-2 top-2 opacity-0 transition-opacity peer-checked:opacity-100">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#735c00]">
          ✓
        </span>
      </div>
    </label>
  );
}

function TimeSlot({ slot, checked, onChange, available = true }) {
  return (
    <label className={`block ${available ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}>
      <input
        className="peer sr-only"
        name="time"
        type="radio"
        checked={checked}
        disabled={!available}
        onChange={onChange}
        readOnly={!onChange}
      />
      <div className="flex items-center justify-between border border-[#d0c5af]/30 px-6 py-4 transition-all peer-checked:bg-[#0f0f0f] peer-checked:text-white">
        <span className="text-sm font-semibold">{slot}</span>
        <span className="text-xs uppercase tracking-[0.2em] opacity-50">{available ? "Available" : "Booked"}</span>
      </div>
    </label>
  );
}

function FloatingInput({ label, name, type = "text", placeholder }) {
  return (
    <div className="relative">
      <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5f5e5e]">
        {label}
      </label>
      <input
        className="w-full border border-[#d0c5af]/50 p-4 outline-none transition-all focus:border-[#735c00]"
        name={name}
        required
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}

function SidebarPanel() {
  return (
    <div className="space-y-6 lg:col-span-4">
      {/* Contact card */}
      <div className="bg-[#0f0f0f] p-8 text-white">
        <h3 className="mb-6 text-2xl font-semibold">Need Immediate Assistance?</h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Phone size={20} className="mt-0.5 shrink-0 text-[#d4af37]" />
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#d0c5af]">Hotline</div>
              <div className="text-lg">+44 (0) 20 7946 0123</div>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail size={20} className="mt-0.5 shrink-0 text-[#d4af37]" />
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#d0c5af]">Email</div>
              <div className="text-lg">consult@alugold.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Commitment card */}
      <div className="border border-[#d0c5af]/30 bg-[#eeeeee] p-8">
        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.24em] text-[#5f5e5e]">
          Our Commitment
        </span>
        <p className="text-sm italic leading-6 text-[#5f5e5e]">
          &quot;We provide a white-glove service from initial structural drafting to final facade
          polishing. Every booking is handled by a senior project manager.&quot;
        </p>
        <div className="mt-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#d0c5af]" />
          <div>
            <div className="text-sm font-semibold text-[#1a1c1c]">Marcus Vane</div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#5f5e5e]">
              Director of Operations
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: "cladding",      label: "Cladding",       icon: <Layers size={20} /> },
  { id: "fabrication",   label: "Fabrication",     icon: <Settings2 size={20} /> },
  { id: "curtain-walls", label: "Curtain Walls",   icon: <Grid2x2 size={20} /> },
];

const TIME_SLOTS = [
  "09:00 AM – 10:30 AM",
  "11:00 AM – 12:30 PM",
  "02:00 PM – 03:30 PM",
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function BookingSection() {
  const [service,   setService]   = useState("cladding");
  const [date,      setDate]      = useState(null);
  const [timeSlot,  setTimeSlot]  = useState(TIME_SLOTS[0]);

  const [availability, setAvailability] = useState({}) // slot -> boolean

  // Local YYYY-MM-DD (toISOString would shift the day for users ahead of UTC)
  const dateStr = date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    : null

  const { busy, state, run, setState } = useSubmit(
    (body) => api.post("/bookings", body),
    "Booking confirmed — we'll email you the details."
  )

  useEffect(() => {
    if (!dateStr) { setAvailability({}); return }
    let cancelled = false
    api.get("/bookings/slots", { params: { date: dateStr } })
      .then((r) => {
        if (cancelled) return
        const map = Object.fromEntries(unwrap(r).slots.map((s) => [s.slot, s.available]))
        setAvailability(map)
        setTimeSlot((cur) => (map[cur] === false ? TIME_SLOTS.find((s) => map[s] !== false) ?? cur : cur))
      })
      .catch(() => !cancelled && setAvailability({}))
    return () => { cancelled = true }
  }, [dateStr])

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (!dateStr) return setState({ type: "error", text: "Please choose a preferred date." })
    const formData = new FormData(form)
    const { ok } = await run({
      service: SERVICES.find((s) => s.id === service).label,
      date: dateStr,
      timeSlot,
      fullName: formData.get("fullName")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      projectDescription: formData.get("projectDescription")?.toString().trim(),
    })
    if (ok) {
      form.reset()
      setDate(null)
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">

        {/* ── Form panel ──────────────────────────────────────────────────── */}
        <div className="border border-[#d0c5af]/30 bg-white p-8 lg:col-span-8 lg:p-10">
          <div className="mb-10">
            <h2 className="mb-2 text-3xl font-semibold text-[#1a1c1c]">
              Schedule a Consultation
            </h2>
            <p className="text-[#5f5e5e]">
              Secure a session with our lead engineers to discuss your project requirements.
            </p>
          </div>

          <form className="space-y-10" onSubmit={handleSubmit}>

            {/* Step 1 – Service */}
            <div>
              <span className="mb-6 block text-xs font-bold uppercase tracking-[0.24em] text-[#735c00]">
                01. Select Service Type
              </span>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {SERVICES.map(({ id, label, icon }) => (
                  <ServicePill
                    key={id}
                    icon={icon}
                    label={label}
                    checked={service === id}
                    onChange={() => setService(id)}
                  />
                ))}
              </div>
            </div>

            {/* Step 2 + 3 – Date & Time */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              <div>
                <span className="mb-6 block text-xs font-bold uppercase tracking-[0.24em] text-[#735c00]">
                  02. Preferred Date
                </span>
                <BookingCalendar value={date} onChange={setDate} />
              </div>

              <div>
                <span className="mb-6 block text-xs font-bold uppercase tracking-[0.24em] text-[#735c00]">
                  03. Time Slot
                </span>
                <div className="space-y-3">
                  {TIME_SLOTS.map((slot) => (
                    <TimeSlot
                      key={slot}
                      slot={slot}
                      checked={timeSlot === slot}
                      available={availability[slot] !== false}
                      onChange={() => setTimeSlot(slot)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4 – Project brief */}
            <div>
              <span className="mb-6 block text-xs font-bold uppercase tracking-[0.24em] text-[#735c00]">
                04. Project Brief
              </span>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                <div className="space-y-6">
                  <FloatingInput label="Full Name" name="fullName"      placeholder="John Doe"              type="text" />
                  <FloatingInput label="Email Address" name="email"  placeholder="corporate@entity.com"  type="email" />
                </div>
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5f5e5e]">
                    Project Description
                  </label>
                  <textarea
                    name="projectDescription"
                    className="min-h-[160px] w-full resize-none border border-[#d0c5af]/50 p-4 outline-none transition-all focus:border-[#735c00]"
                    placeholder="Briefly describe your architectural requirements..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col items-end gap-3 border-t border-[#d0c5af]/30 pt-6">
              <FormMessage state={state} />
              <button
                type="submit"
                disabled={busy}
                className="cursor-pointer bg-[#d4af37] px-12 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#a68926] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "Booking…" : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>

        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <SidebarPanel />
      </div>
    </section>
  );
}

