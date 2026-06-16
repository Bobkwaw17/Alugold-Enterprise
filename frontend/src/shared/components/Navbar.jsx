import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BackDrop from "./BackDrop";
import { useState } from "react";
import Button from "./Button";

export default function Navbar() {

  const [isMenu, setIsMenu] = useState(false)
  const currentRoute = useLocation().pathname;

  console.log(currentRoute)

  return (
    <nav className="w-screen h-17.5 bg-white gap-3 fixed top-0 left-0 z-99 md:border-b border-(--outline-variant)/30">
      <div className="h-full max-w-7xl px-4 flex items-center mx-auto z-100 border-b border-gray-500/30 md:border-0">
        {/* Left part of the Navbar */}
        <div className="flex flex-1 bg-white h-full items-center ">
          <h1 className="text-2xl font-bold">ALUGOLD</h1>
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
        <div className="flex flex-1 justify-end bg-white h-full items-center">
          {/* Hide quotes button and show hamburger menu on smaller screens */}
          <Button className="md:flex hidden px-6 py-2" type="inverse-primary">Get Quote</Button>
          <button className="flex md:hidden cursor-pointer" onClick={() => { setIsMenu(prev => !prev) }}>
            <Menu />
          </button>
        </div>
      </div>

      {/* Nav dropdown menu on smaller screens  */}
      <AnimatePresence>{isMenu && <BackDrop className={`md:hidden`} setIsMenu={setIsMenu} />}</AnimatePresence>
      <AnimatePresence>
        {isMenu && <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: -0.5 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
          className={`
            absolute top-17.5 h-60 w-full bg-white -z-1 md:hidden flex flex-col p-4 items-center justify-between font-semibold
          `}>
          <Link to="/" className={`
            hover:text-(--on-surface-variant)
            ${currentRoute === "/" ? "border-b-2 border-(--outline) text-(--on-surface-variant)" : ""}`}
            onClick={() => { setIsMenu(false) }}>
            Home
          </Link>
          <Link to="/service" className={`
            hover:text-(--on-surface-variant)
            ${currentRoute === "/service" ? "border-b-2 border-(--outline) text-(--on-surface-variant)" : ""}`}
            onClick={() => { setIsMenu(false) }}>
            Service
          </Link>
          <Link to="/about" className={`
            hover:text-(--on-surface-variant)
            ${currentRoute === "/about" ? "border-b-2 border-(--outline) text-(--on-surface-variant)" : ""}`}
            onClick={() => { setIsMenu(false) }}>
            About
          </Link>
          <Button className="p-2 w-full" type={"inverse-primary"}>Get Quote</Button>

        </motion.div>}
      </AnimatePresence>
    </nav>
  )
}