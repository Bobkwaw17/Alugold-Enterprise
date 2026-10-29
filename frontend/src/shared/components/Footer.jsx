import { Globe, SendHorizonal, Share2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../../lib/api";
import { useSubmit } from "../../lib/useSubmit";
import { useUI } from "../../store/ui";


export default function Footer() {
  const openModal = useUI((s) => s.open)
  const [email, setEmail] = useState("")
  const { busy, state, run } = useSubmit(
    (e) => api.post("/newsletter/subscribe", { email: e }),
    "Thanks for subscribing!"
  )
  const subscribe = async (e) => {
    e.preventDefault()
    const { ok } = await run(email)
    if (ok) setEmail("")
  }

  return (
    <footer className="flex w-screen min-h-10 bg-(--inverse-surface) text-(--on-tertiary) flex-col">
      <div className="max-w-7xl w-full px-6 py-12 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_15%_15%_25%] md:grid-cols-[1fr_20%_20%] gap-4">

        <div className="flex flex-col gap-6 ">
          <h3 className="text-2xl font-semibold text-white">ALUGOLD</h3>
          <p className="lg:max-w-150 text-(--inverse-on-surface) opacity-70">
            Redefining the skyline with precission engineering and architectural solutions for high-net-worth developers
          </p>
          <div className="flex w-full gap-2 h-10">
            <button className="h-full aspect-square rounded-xl items-center flex justify-center border border-(--outline)/30 cursor-pointer hover:bg-white/10 transition-all duration-150">
              <Globe size={18} />
            </button>
            <button className="h-full aspect-square rounded-xl items-center flex justify-center border border-(--outline)/30 cursor-pointer hover:bg-white/10 transition-all duration-150">
              <Share2Icon size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 ">
          <h4 className="font-semibold text-(--primary)">Company</h4>
          <ul className="flex flex-col gap-1">
            <li><Link className="hover:opacity-90 transition-all duration-150  opacity-70" to="/about">About Us</Link></li>
            <li><Link className="hover:opacity-90 transition-all duration-150  opacity-70" to="/service">Services</Link></li>
            <li><Link className="hover:opacity-90 transition-all duration-150  opacity-70" to="#projects">Projects</Link></li>
            <li><button className="cursor-pointer hover:opacity-90 transition-all duration-150 opacity-70" onClick={() => openModal("contact")}>Contact Us</button></li>
          </ul>
        </div>

        <div className="flex flex-col gap-1.5 ">
          <h4 className="font-semibold text-(--primary) ">Legal</h4>
          <ul className="flex flex-col gap-1">
            <li><Link className="hover:opacity-90 transition-all duration-150  opacity-70" to="#">Privacy Policy</Link></li>
            <li><Link className="hover:opacity-90 transition-all duration-150  opacity-70" to="#">Terms of Service</Link></li>
            <li><Link className="hover:opacity-90 transition-all duration-150  opacity-70" to="#">Project Tracking</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 ">
          <h4 className="font-semibold text-(--primary) ">Newsletter</h4>
          <div className="flex flex-col gap-4">
            <form onSubmit={subscribe} className="flex gap-2 items-center ">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" className="p-2 bg-(--surface-container) text-(--on-surface) w-full border border-(--outline)/20 outline-0 focus-within:ring-2 ring-(--primary)" />
              <button disabled={busy} aria-label="Subscribe" className="p-3.5 flex items-center justify-center bg-(--primary) text-(--on-primary) cursor-pointer hover:opacity-70 disabled:opacity-50 transition-all duration-150">
                <SendHorizonal size={15} />
              </button>
            </form>
            {state && <p role="status" className={state.type === "error" ? "text-red-300 text-sm" : "text-(--primary-fixed) text-sm"}>{state.text}</p>}
            <p className="opacity-70">Get the latest architectural insight and project updates.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-(--outline)/50 min-h-15 flex items-center p-4 justify-center text-sm gap-2 tracking-widest" >
        <span className="opacity-70">© {new Date().getFullYear()} ALUGOLD ENTERPRICE · Architectural Excellence Gauranteed.</span>
      </div>
    </footer>
  )
}