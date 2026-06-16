import { Globe, SendHorizonal, Share2Icon } from "lucide-react";
import Button from "./Button";


export default function Footer() {

  return (
    <footer className="flex w-screen min-h-10 bg-(--inverse-surface) text-(--on-tertiary) flex-col">
      <div className="max-w-7xl w-full px-6 py-12 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_15%_15%_25%] md:grid-cols-[1fr_20%_20%] gap-4">

        <div className="flex flex-col gap-6 ">
          <h3 className="text-2xl font-semibold text-white">ALUGOLD</h3>
          <p className="lg:max-w-150 text-(--inverse-on-surface)">
            Redefining the skyline with precission engineering and architectural solutions for high-net-worth developers
          </p>
          <div className="flex w-full gap-2 h-10">
            <div className="h-full aspect-square rounded-xl items-center flex justify-center border border-(--outline)/30">
              <Globe size={18} />
            </div>
            <div className="h-full aspect-square rounded-xl items-center flex justify-center border border-(--outline)/30">
              <Share2Icon size={18} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 ">
          <h4 className="font-semibold text-(--primary)">Company</h4>
          <ul className="flex flex-col gap-1">
            <li>About Us</li>
            <li>Services</li>
            <li>Projects</li>
            <li>Contactt Us</li>
          </ul>
        </div>

        <div className="flex flex-col gap-1.5 ">
          <h4 className="font-semibold text-(--primary) ">Legal</h4>
          <ul className="flex flex-col gap-1">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Project Tracking</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 ">
          <h4 className="font-semibold text-(--primary) ">Newsletter</h4>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center ">
              <input type="text" placeholder="Your Email" className="p-2 bg-(--surface-container) text-(--on-surface) border border-(--outline)/20" />
              <Button className={`p-3.5 flex items-center justify-center`} type="primary">
                <SendHorizonal size={15} />
              </Button>
            </div>
            <p className="">Get the latest architectural insight and project updates.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-(--outline)/50 min-h-15 flex items-center p-4 justify-center text-sm">
        c {new Date().getFullYear()} ALUGOLD ENTERPRICE. Architectural Excellence Gauranteed.
      </div>
    </footer>
  )
}