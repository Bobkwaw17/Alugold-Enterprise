export default function ServiceCard({
	image,
	imageAlt,
	category,
	title,
	description,
	compact = false,
	icon,
}) {
	return (
		<article className="group overflow-hidden border border-[#d0c5af]/40 bg-white transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
			<div className={compact ? 'aspect-square overflow-hidden' : 'aspect-[16/9] overflow-hidden'}>
				{image ? (
					<img
						className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						src={image}
						alt={imageAlt}
					/>
				) : (
					<div role="img" aria-label={imageAlt} className="h-full w-full bg-gradient-to-br from-[#1a1c1c] via-[#3a3d3f] to-[#6b6f73]" />
				)}
			</div>
			<div className={compact ? 'p-6' : 'p-6 md:p-8'}>
				<div className="mb-2 flex items-start justify-between gap-4">
					<span className="block text-xs font-bold uppercase tracking-[0.24em] text-[#5f5e5e]">
						{category}
					</span>
					{icon ? <span className="text-[#735c00]">{icon}</span> : null}
				</div>
				<h3 className={compact ? 'mb-2 text-xl font-semibold text-[#1a1c1c]' : 'mb-3 text-2xl font-semibold text-[#1a1c1c]'}>
					{title}
				</h3>
				<p className="text-sm leading-6 text-[#5f5e5e] md:text-base">{description}</p>
			</div>
		</article>
	)
}