import Media from "../../../shared/components/Media"
import { images } from "../../../shared/images"
import { useText } from "../../../store/content"

export default function AboutHero() {
  const t = useText()
  return (
    <section className="bg-[#eeeeee]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 lg:px-16">
        <div>
          <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#735c00]">
            {t("about_eyebrow")}
          </span>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {t("about_heroTitle")}
          </h1>
          <p className="mb-8 max-w-md text-sm leading-6 text-[#5f5e5e]">
            {t("about_heroBody")}
          </p>
          <div className="flex gap-8">
            {[[t("about_stat1Value"), t("about_stat1Label")], [t("about_stat2Value"), t("about_stat2Label")]].map(([v, l]) => (
              <div key={l} className="border-l-2 border-[#d4af37] pl-3">
                <div className="text-xl font-bold">{v}</div>
                <div className="text-[10px] uppercase tracking-wider text-[#5f5e5e]">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative pb-8">
          <div className="aspect-[4/3] overflow-hidden shadow-2xl">
            <Media src={images.officeTeam} alt="Engineers reviewing plans in a sunlit studio" />
          </div>
          <div className="absolute -bottom-0 left-4 bg-[#2f3131] px-5 py-3 text-white shadow-lg">
            <div className="text-sm font-semibold">Quality Standards</div>
            <div className="text-xs text-white/70">ISO 9001 Certified Installation</div>
          </div>
        </div>
      </div>
    </section>
  )
}
