import Media from "../../../shared/components/Media"
import { images } from "../../../shared/images"
import { useText } from "../../../store/content"

const expertise = [
  { category: "Structural", title: "Exterior Cladding Systems", image: images.facade, tone: "dark",
    description: "Advanced protective and aesthetic layers for modern commercial exteriors." },
  { category: "Installation", title: "Sliding Door Installation", image: images.slidingDoor, tone: "light",
    description: "Seamless indoor-outdoor transitions with high-performance track systems." },
  { category: "Fabrication", title: "Window Fabrication", image: images.window, tone: "dark",
    description: "Custom-engineered window units designed for thermal efficiency and style." },
  { category: "Architectural", title: "Curtain Wall Systems", image: images.curtainWall, tone: "blue",
    description: "Self-supporting glass envelopes for dramatic, light-filled architecture." },
  { category: "Specialized", title: "Aluminoid Cladding", image: images.goldPanel, tone: "gold",
    description: "Premium aluminum composite panels for high-end finish and durability." },
  { category: "Support", title: "Maintenance Services", image: images.technician, tone: "blue",
    description: "Expert care and refurbishment to preserve the longevity of your assets." },
]

export default function CoreExpertise() {
  const t = useText()
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-16">
        <div className="mb-12 text-center">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#735c00]">
            Precision Solutions
          </span>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">{t("home_expertiseTitle")}</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((e) => (
            <article key={e.title} className="group bg-[#f3f3f4]">
              <div className="aspect-[4/3] overflow-hidden">
                <Media
                  src={e.image}
                  alt={e.title}
                  tone={e.tone}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#735c00]">
                  {e.category}
                </span>
                <h3 className="mb-2 font-semibold">{e.title}</h3>
                <p className="mb-4 text-xs leading-5 text-[#5f5e5e]">{e.description}</p>
                <div className="h-0.5 w-6 bg-[#735c00]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
