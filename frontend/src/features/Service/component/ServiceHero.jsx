import { useText } from "../../../store/content"

export default function ServiceHero() {
	const t = useText()
	return (
		<section className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-16 lg:py-24">
			<span className="mb-4 block text-xs font-bold uppercase tracking-[0.24em] text-[#735c00]">
				{t("service_eyebrow")}
			</span>
			<h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-[#1a1c1c] md:text-5xl">
				{t("service_heroTitle")}
			</h1>
			<p className="mx-auto max-w-2xl text-lg leading-7 text-[#5f5e5e]">
				{t("service_heroBody")}
			</p>
		</section>
	)
}
