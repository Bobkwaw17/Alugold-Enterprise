import { Ruler, BadgeCheck, Leaf } from "lucide-react"
import Media from "../../../shared/components/Media"
import { images } from "../../../shared/images"
import { useText } from "../../../store/content"

export default function Details() {
  const t = useText()
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-16">
      <div className="mb-12 text-center">
        <h2 className="mb-2 text-2xl font-bold">{t("about_detailsTitle")}</h2>
        <p className="text-sm text-[#5f5e5e]">{t("about_detailsSubtitle")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <article className="border border-[#d0c5af]/40 bg-white p-8 md:col-span-8">
          <Ruler className="mb-4 text-[#735c00]" size={20} />
          <h3 className="mb-2 font-semibold">Master-Grade Installation</h3>
          <p className="mb-6 text-sm leading-6 text-[#5f5e5e]">
            Our installation protocols exceed industry standards, utilizing specialized
            laser-alignment technology and premium-grade sealants to ensure thermal efficiency and
            structural longevity.
          </p>
          <div className="h-40 overflow-hidden">
            <Media src={images.fixture} alt="Close-up of an aluminum fixture" />
          </div>
        </article>

        <article className="flex flex-col justify-between bg-[#2f3131] p-8 text-white md:col-span-4">
          <div>
            <BadgeCheck className="mb-4 text-[#e9c349]" size={20} />
            <h3 className="mb-2 font-semibold">Elite Materials</h3>
            <p className="text-sm leading-6 text-white/70">
              Sourcing only high-tensile architectural aluminum and acoustic-treated glass for
              ultimate performance.
            </p>
          </div>
          <div className="mt-8 border-t border-white/20 pt-4 text-xs font-semibold leading-6">
            <div>100% Recyclable</div>
            <div>UV Resistant Coatings</div>
          </div>
        </article>

        <article className="bg-[#f3f3f4] p-8 md:col-span-4">
          <Leaf className="mb-4 text-[#735c00]" size={20} />
          <h3 className="mb-2 font-semibold">Sustainable Legacy</h3>
          <p className="text-sm leading-6 text-[#5f5e5e]">
            Our systems are engineered to minimize carbon footprints while maximizing natural
            lighting efficiency in high-density urban environments.
          </p>
        </article>

        <article className="grid items-center gap-6 border border-[#d0c5af]/40 bg-white p-8 sm:grid-cols-2 md:col-span-8">
          <div>
            <h3 className="mb-2 font-semibold">Bespoke Fabrication</h3>
            <p className="text-sm leading-6 text-[#5f5e5e]">
              Every project is unique. Our in-house fabrication facility ensures that custom
              dimensions and finishes are achieved with zero tolerance for error.
            </p>
          </div>
          <div className="aspect-[16/9] overflow-hidden">
            <Media src={images.craftsman} alt="Fabrication workshop" />
          </div>
        </article>
      </div>
    </section>
  )
}
