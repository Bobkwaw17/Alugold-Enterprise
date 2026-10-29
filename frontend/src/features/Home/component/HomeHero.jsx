import { Ruler } from "lucide-react"
import Media from "../../../shared/components/Media"
import Button from "../../../shared/components/Button"
import { images } from "../../../shared/images"
import { useUI } from "../../../store/ui"

export default function HomeHero() {
  const openModal = useUI((s) => s.open)
  return (
    <section className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden px-5 py-24 text-center">
      <div className="absolute inset-0 -z-10">
        <Media src={images.hero} alt="Modern high-rise towers seen from below" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="w-full max-w-3xl">
        <h1 className="mb-3 font-serif text-3xl font-bold leading-tight text-white md:text-5xl">
          Modern Construction &amp; Consultation Services
        </h1>
        <p className="mb-8 text-white/80">Reliable solutions for contemporary building needs</p>
        <form
          onSubmit={(e) => { e.preventDefault(); openModal("quote", { description: e.currentTarget.build.value }) }}
          className="mx-auto flex max-w-2xl flex-col gap-2 bg-white p-2 sm:flex-row"
        >
          <label className="flex flex-1 items-center gap-3 bg-[#f3f3f4] px-4 py-3">
            <Ruler size={18} className="text-[#735c00]" />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#5f5e5e]"
              name="build"
              placeholder="What do you want to build?"
            />
          </label>
          <Button type="inverse-primary" className="px-6 py-3 text-sm" submit>
            Request Service
          </Button>
        </form>
      </div>
    </section>
  )
}
