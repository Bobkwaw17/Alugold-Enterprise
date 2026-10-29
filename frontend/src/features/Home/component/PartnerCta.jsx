import { useUI } from "../../../store/ui"

export default function PartnerCta() {
  const openModal = useUI((s) => s.open)
  return (
    <section className="bg-[#735c00] px-5 py-20 text-center text-white">
      <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Need a reliable construction partner?</h2>
      <p className="mx-auto mb-8 max-w-xl text-sm text-white/80">
        From conceptual design to final handover, we deliver excellence at every stage. Let&apos;s
        discuss your next landmark project.
      </p>
      <button
        onClick={() => openModal("contact")}
        className="cursor-pointer bg-[#1a1c1c] px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
      >
        Contact Us
      </button>
    </section>
  )
}
