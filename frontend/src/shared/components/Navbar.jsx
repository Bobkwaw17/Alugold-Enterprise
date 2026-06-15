import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BackDrop from "./BackDrop";
import { useState } from "react";

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
          <Link to="/" className={`font-semibold text-(--on-surface-variant) h-6.5 ${currentRoute === "/" ? "border-b-2 border-outline" : ""}`}>Home</Link>
          <Link to="/service" className={`font-semibold text-(--on-surface-variant) h-6.5 ${currentRoute === "/service" ? "border-b-2 border-outline" : ""}`}>Service</Link>
          <Link to="/about" className={`font-semibold text-(--on-surface-variant) h-6.5 ${currentRoute === "/about" ? "border-b-2 border-outline" : ""}`}>About</Link>
        </div>

        {/* Right part of the navbar */}
        <div className="flex flex-1 justify-end bg-white h-full items-center">
          {/* Hide quotes button and show hamburger menu on smaller screens */}
          <button className="md:flex hidden py-2 px-6 cursor-pointer bg-(--primary) text-(--on-primary) font-semibold">Get Quote</button>
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
            absolute top-17.5 h-60 w-full bg-white -z-1 md:hidden flex flex-col p-4 items-center justify-between text-(--on-surface-variant) font-semibold
          `}>
          <Link to="/" className={`${currentRoute === "/" ? "border-b-2 border-outline" : ""}`} onClick={() => { setIsMenu(false) }}>Home</Link>
          <Link to="/service" className={`${currentRoute === "/service" ? "border-b-2 border-outline" : ""}`} onClick={() => { setIsMenu(false) }}> Service</Link>
          <Link to="/about" className={`${currentRoute === "/about" ? "border-b-2 border-outline" : ""}`} onClick={() => { setIsMenu(false) }}>About</Link>
          <button className="bg-(--primary) text-(--on-primary) p-2 w-full cursor-pointer">Get Quote</button>

        </motion.div>}
      </AnimatePresence>
    </nav>
  )
}