import { useState } from "react";
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

function TimeSlot({ slot, checked, onChange }) {
  return (
    <label className="block cursor-pointer">
      <input
        className="peer sr-only"
        name="time"
        type="radio"
        checked={checked}
        onChange={onChange}
        readOnly={!onChange}
      />
      <div className="flex items-center justify-between border border-[#d0c5af]/30 px-6 py-4 transition-all peer-checked:bg-[#0f0f0f] peer-checked:text-white">
        <span className="text-sm font-semibold">{slot}</span>
        <span className="text-xs uppercase tracking-[0.2em] opacity-50">Available</span>
      </div>
    </label>
  );
}

function FloatingInput({ label, type = "text", placeholder }) {
  return (
    <div className="relative">
      <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5f5e5e]">
        {label}
      </label>
      <input
        className="w-full border border-[#d0c5af]/50 p-4 outline-none transition-all focus:border-[#735c00]"
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
  { id: "cladding", label: "Cladding", icon: <Layers size={20} /> },
  { id: "fabrication", label: "Fabrication", icon: <Settings2 size={20} /> },
  { id: "curtain-walls", label: "Curtain Walls", icon: <Grid2x2 size={20} /> },
];

const TIME_SLOTS = [
  "09:00 AM – 10:30 AM",
  "11:00 AM – 12:30 PM",
  "02:00 PM – 03:30 PM",
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function BookingSection() {
  const [service, setService] = useState("cladding");
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      service,
      date: date?.toISOString().slice(0, 10) ?? null,
      timeSlot,
      name: formData.get("name"),
      email: formData.get("email"),
      description: formData.get("description"),
    };
    console.log("Booking payload:", payload);
    // TODO: POST to /api/bookings
  }

  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 lg:px-16">
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
                  <FloatingInput label="Full Name" placeholder="John Doe" type="text" />
                  <FloatingInput label="Email Address" placeholder="corporate@entity.com" type="email" />
                </div>
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5f5e5e]">
                    Project Description
                  </label>
                  <textarea
                    name="description"
                    className="min-h-40  w-full resize-none border border-[#d0c5af]/50 p-4 outline-none transition-all focus:border-[#735c00]"
                    placeholder="Briefly describe your architectural requirements..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end border-t border-[#d0c5af]/30 pt-6">
              <button
                type="submit"
                className="bg-[#d4af37] px-12 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#a68926]"
              >
                Confirm Booking
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

