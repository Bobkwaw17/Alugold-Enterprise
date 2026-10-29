import { useUI } from "../../../store/ui"
import { useText } from "../../../store/content"

export default function PartnerCta() {
  const openModal = useUI((s) => s.open)
  const t = useText()
  return (
    <section className="bg-[#735c00] px-5 py-20 text-center text-white">
      <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">{t("home_ctaTitle")}</h2>
      <p className="mx-auto mb-8 max-w-xl text-sm text-white/80">
        {t("home_ctaBody")}
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
