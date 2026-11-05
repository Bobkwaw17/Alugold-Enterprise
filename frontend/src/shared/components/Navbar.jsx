import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BackDrop from "./BackDrop";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useUI } from "../../store/ui";

export default function Navbar() {

  const [isMenu, setIsMenu] = useState(false)
  const currentRoute = useLocation().pathname;
  const openModal = useUI((s) => s.open)

  useEffect(() => setIsMenu(false), [currentRoute])
  useEffect(() => {
    if (!isMenu) return
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMenu(false)
    }
    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [isMenu])

  return (
    <nav className="fixed left-0 top-0 z-[100] h-[4.375rem] w-full border-b border-(--outline-variant)/30 bg-white">
      <div className="relative z-50 mx-auto flex h-full max-w-7xl items-center border-b border-gray-500/30 px-4 md:border-0">
        {/* Left part of the Navbar */}
        <div className="flex h-full flex-1 items-center">
          <Link to="/" aria-label="Alugold home" className="font-serif text-xl font-bold tracking-[0.12em] text-[#1a1c1c] sm:text-2xl">
            ALUGOLD
          </Link>
        </div>

        {/* Middle part fo the navbar */}
        <div className="md:flex items-center justify-center gap-6 flex-1 hidden">
          <Link to="/" className={`
            font-semibold h-6.5 hover:text-(--on-surface-variant)
            ${currentRoute === "/" ? "border-b-2 border-(--outline) text-(--on-surface-variant)" : ""}`}>
            Home</Link>
          <Link to="/service" className={`
            font-semibold h-6.5 hover:text-(--on-surface-variant)
            ${currentRoute === "/service" ? "border-b-2 border-(--outline) text-(--on-surface-variant)" : ""}`}>
            Service</Link>
          <Link to="/about" className={`
            font-semibold h-6.5 hover:text-(--on-surface-variant)
            ${currentRoute === "/about" ? "border-b-2 border-(--outline) text-(--on-surface-variant)" : ""}`}>
            About
          </Link>
        </div>

        {/* Right part of the navbar */}
        <div className="flex h-full flex-1 items-center justify-end">
          {/* Hide quotes button and show hamburger menu on smaller screens */}
          <Button className="md:flex hidden px-6 py-2 uppercase tracking-widest" type="inverse-primary" onClick={() => openModal("quote")}>Get Quote</Button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-sm text-[#1a1c1c] transition-colors hover:bg-[#f3f3f4] md:hidden"
            aria-label={isMenu ? "Close menu" : "Open menu"}
            aria-expanded={isMenu}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenu((prev) => !prev)}
          >
            {isMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Nav dropdown menu on smaller screens  */}
      <AnimatePresence>{isMenu && <BackDrop className="md:hidden" setIsMenu={setIsMenu} />}</AnimatePresence>
      <AnimatePresence>
        {isMenu && <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.16 }}
          id="mobile-navigation"
          className="absolute left-0 top-full z-50 flex w-full flex-col gap-1 border-t border-[#d0c5af]/30 bg-white p-4 font-semibold shadow-xl md:hidden">
          <Link to="/" className={`rounded-sm px-4 py-3 hover:bg-[#f3f3f4] ${currentRoute === "/" ? "bg-[#f3f3f4] text-(--on-surface-variant)" : ""}`}
            onClick={() => setIsMenu(false)}>
            Home
          </Link>
          <Link to="/service" className={`rounded-sm px-4 py-3 hover:bg-[#f3f3f4] ${currentRoute === "/service" ? "bg-[#f3f3f4] text-(--on-surface-variant)" : ""}`}
            onClick={() => setIsMenu(false)}>
            Service
          </Link>
          <Link to="/about" className={`rounded-sm px-4 py-3 hover:bg-[#f3f3f4] ${currentRoute === "/about" ? "bg-[#f3f3f4] text-(--on-surface-variant)" : ""}`}
            onClick={() => setIsMenu(false)}>
            About
          </Link>
          <Button className="mt-2 w-full px-4 py-3 uppercase tracking-widest" type="inverse-primary" onClick={() => { setIsMenu(false); openModal("quote") }}>Get Quote</Button>

        </motion.div>}
      </AnimatePresence>
    </nav>
  )
}