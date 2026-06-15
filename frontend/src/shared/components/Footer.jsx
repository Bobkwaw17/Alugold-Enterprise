import { Globe, Share2Icon } from "lucide-react";


export default function Footer() {

  return (
    <footer className="flex w-screen min-h-10 bg-(--inverse-surface) text-(--surface) flex-col">
      <div className="max-w-7xl w-full px-6 py-12 mx-auto grid grid-cols-1 lg:grid-cols-[50%_15%_15%_15%] md:grid-cols-[53%_21%_21%] gap-4">

        <div className="flex flex-col gap-4 ">
          <h3 className="text-2xl font-semibold">ALUGOLD</h3>
          <p className="lg:max-w-150">
            Redefining the skyline with precission engineering and architectural solutions for high-net-worth developers
          </p>
          <div className="flex w-full gap-2 h-10">
            <div className="h-full aspect-square rounded-xl items-center flex justify-center border border-(--outline)">
              <Globe size={18} />
            </div>
            <div className="h-full aspect-square rounded-xl items-center flex justify-center border border-(--outline)">
              <Share2Icon size={18} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 ">
          <h4 className="font-semibold text-(--on-surface-variant)">Company</h4>
          <ul className="flex flex-col gap-1">
            <li>About Us</li>
            <li>Services</li>
            <li>Projects</li>
            <li>Contactt Us</li>
          </ul>
        </div>

        <div className="flex flex-col gap-1.5 ">
          <h4 className="font-semibold ">Legal</h4>
          <ul className="flex flex-col gap-1">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Project Tracking</li>
          </ul>
        </div>

        <div className="flex flex-col gap-1.5 ">
          <h4 className="font-semibold ">Newsletter</h4>
          <div className="flex flex-col gap-1">
            <p>Your Email</p>
            <input type="text" className="bg-white" />
            <p>Get the latest architectural insight and project updates.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-(--outline) min-h-15 flex items-center p-4 justify-center text-sm">
        c {new Date().getFullYear()} ALUGOLD ENTERPRICE. Architectural Excellence Gauranteed.
      </div>
    </footer>
  )
}