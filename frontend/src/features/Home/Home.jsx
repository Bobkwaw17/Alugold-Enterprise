import HomeHero from "./component/HomeHero"
import Standard from "./component/Standard"
import CoreExpertise from "./component/CoreExpertise"
import PartnerCta from "./component/PartnerCta"

export default function Home() {
  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c]">
      <HomeHero />
      <Standard />
      <CoreExpertise />
      <PartnerCta />
    </div>
  )
}
