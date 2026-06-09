import ServiceHero from './component/ServiceHero'
import ServiceCatalog from './component/ServiceCatalog'
import BookingSection from './component/BookingSection'

export default function Service() {
	return (
		<main className="bg-[#f9f9f9] text-[#1a1c1c]">
			<ServiceHero />
			<ServiceCatalog />
			<BookingSection />
		</main>
	)
}