import { useEffect, useState } from "react"
import { Ruler } from "lucide-react"
import { api, unwrap } from "../../../lib/api"
import ServiceCard from "./ServiceCard"
import { fallbackServices } from "./fallbackServices"

// Bento pattern repeated down the page: [8,4] then [6,6], [6,6]... in a 12-col grid.
const SPANS = ["md:col-span-8", "md:col-span-4", "md:col-span-6", "md:col-span-6"]
const spanFor = (i) => (i < 2 ? SPANS[i] : SPANS[2 + ((i - 2) % 2)])
const isWide = (i) => i === 0

// API shape -> ServiceCard props. The fallback data already uses card props.
const fromApi = (s) => ({
  key: s._id,
  image: s.imageUrl,
  imageAlt: s.imageAlt || s.name,
  category: s.category,
  title: s.name,
  description: s.description,
})

export default function ServiceCatalog() {
  const [cards, setCards] = useState(null) // null = loading

  useEffect(() => {
    let cancelled = false
    api.get("/services")
      .then((r) => {
        const list = unwrap(r)
        if (!cancelled) setCards(list.length ? list.map(fromApi) : fallbackServices)
      })
      .catch(() => !cancelled && setCards(fallbackServices))
    return () => { cancelled = true }
  }, [])

  if (!cards) {
    return (
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-16" aria-busy="true">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {SPANS.map((span, i) => (
            <div key={i} className={`${span} h-72 animate-pulse bg-[#e8e8e8]`} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {cards.map(({ key, large, ...card }, i) => (
          <div key={key ?? card.title} className={spanFor(i)}>
            <ServiceCard
              {...card}
              compact={!isWide(i)}
              icon={isWide(i) ? <Ruler size={18} /> : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
