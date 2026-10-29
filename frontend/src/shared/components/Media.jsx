// Renders an <img> when src exists, otherwise a dark architectural gradient placeholder.
export default function Media({ src, alt, className = "", tone = "dark" }) {
  if (src) {
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />
  }
  const tones = {
    dark: "from-[#1a1c1c] via-[#3a3d3f] to-[#6b6f73]",
    gold: "from-[#554300] via-[#a68926] to-[#e9c349]",
    light: "from-[#c8c6c5] via-[#e2e2e2] to-[#f3f3f4]",
    blue: "from-[#254188] via-[#4b78b5] to-[#b4c5ff]",
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`h-full w-full bg-gradient-to-br ${tones[tone] ?? tones.dark} ${className}`}
    />
  )
}
