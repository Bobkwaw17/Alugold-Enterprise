import Media from "../../../shared/components/Media"
import { images } from "../../../shared/images"
import { useText } from "../../../store/content"

export default function Standard() {
  const t = useText()
  const stats = [
    { value: t("home_stat1Value"), label: t("home_stat1Label") },
    { value: t("home_stat2Value"), label: t("home_stat2Label") },
  ]
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
          {t("home_standardEyebrow")}
        </span>
        <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">{t("home_standardTitle")}</h2>
        <p className="mb-4 text-sm leading-6 text-[#5f5e5e]">{t("home_standardBody1")}</p>
        <p className="mb-8 text-sm leading-6 text-[#5f5e5e]">{t("home_standardBody2")}</p>
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
