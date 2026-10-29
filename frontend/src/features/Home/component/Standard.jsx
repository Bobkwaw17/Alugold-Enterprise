import Media from "../../../shared/components/Media"
import { images } from "../../../shared/images"

const stats = [
  { value: "15+", label: "Years Excellence" },
  { value: "500+", label: "Projects Completed" },
]

export default function Standard() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 lg:px-16">
      <div className="relative">
        <div className="absolute -left-4 -top-4 -z-0 h-24 w-24 bg-[#e5e2e1]" />
        <div className="relative aspect-[4/3] overflow-hidden shadow-xl">
          <Media src={images.blueprint} alt="Architectural drawings with a pencil and drafting tools" tone="light" />
        </div>
      </div>

      <div>
        <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#735c00]">
          The Alugold Standard
        </span>
        <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">Decades of Engineering Mastery</h2>
        <p className="mb-4 text-sm leading-6 text-[#5f5e5e]">
          ALUGOLD ENTERPRISE stands at the intersection of architectural vision and structural
          reality. We specialize in high-end aluminum and glass solutions that define the modern skyline.
        </p>
        <p className="mb-8 text-sm leading-6 text-[#5f5e5e]">
          Our approach combines rigorous engineering standards with an aesthetic eye, ensuring that
          every project—from simple window fabrications to complex curtain wall systems—meets the
          highest global benchmarks for quality and durability.
        </p>
        <div className="flex gap-12">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-[#5f5e5e]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
