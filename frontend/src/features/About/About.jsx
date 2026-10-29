import AboutHero from "./component/AboutHero"
import Details from "./component/Details"
import Portal from "./component/Portal"
import ConsultCta from "./component/ConsultCta"

export default function About() {
  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c]">
      <AboutHero />
      <Details />
      <Portal />
      <ConsultCta />
    </div>
  )
}
