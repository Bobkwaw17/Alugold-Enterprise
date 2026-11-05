import { Ruler } from "lucide-react"
import Media from "../../../shared/components/Media"
import Button from "../../../shared/components/Button"
import { images } from "../../../shared/images"
import { useUI } from "../../../store/ui"
import { useText } from "../../../store/content"

export default function HomeHero() {
  const openModal = useUI((s) => s.open)
  const t = useText()
  return (
    <section className="relative isolate flex min-h-[480px] items-center justify-center overflow-hidden px-5 py-20 text-center sm:min-h-[560px] sm:px-8 sm:py-24 lg:min-h-[620px]">
      <div className="absolute inset-0 -z-10">
        <Media src={images.hero} alt="Modern high-rise towers seen from below" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/65" />
      </div>
      <div className="w-full max-w-4xl">
        <span className="mb-5 inline-block text-[10px] font-bold uppercase tracking-[0.32em] text-[#ffe088] sm:text-xs">
          Architectural excellence, built to last
        </span>
        <h1 className="mb-5 font-serif text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
          {t("home_heroTitle")}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">{t("home_heroSubtitle")}</p>
        <form
          onSubmit={(e) => { e.preventDefault(); openModal("quote", { description: e.currentTarget.build.value }) }}
          className="mx-auto flex max-w-2xl flex-col gap-2 border border-white/30 bg-white/95 p-2 shadow-2xl backdrop-blur sm:flex-row"
        >
          <label className="flex min-h-12 flex-1 items-center gap-3 bg-[#f3f3f4] px-4 py-3">
            <Ruler size={18} className="text-[#735c00]" />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#5f5e5e]"
              name="build"
              aria-label="What do you want to build?"
              placeholder="What do you want to build?"
            />
          </label>
          <Button type="inverse-primary" className="min-h-12 px-6 py-3 text-sm" submit>
            Request Service
          </Button>
        </form>
      </div>
    </section>
  )
}
