import { useUI } from "../../../store/ui"

export default function ConsultCta() {
  const openModal = useUI((s) => s.open)
  return (
    <section className="bg-[#2f3131] px-5 py-20 text-center text-white">
      <h2 className="mb-3 text-2xl font-bold">Require Immediate Consultation?</h2>
      <p className="mx-auto mb-8 max-w-lg text-sm text-white/70">
        Our senior project directors are available for private consultations regarding large-scale
        architectural implementations.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => openModal("quote")} className="cursor-pointer bg-[#735c00] px-6 py-3 text-xs font-semibold transition-opacity hover:opacity-80">
          Priority Line
        </button>
        <button onClick={() => openModal("contact")} className="cursor-pointer border border-white/40 px-6 py-3 text-xs font-semibold transition-colors hover:bg-white/10">
          Message Portal
        </button>
      </div>
    </section>
  )
}
