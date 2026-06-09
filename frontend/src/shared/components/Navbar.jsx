import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BackDrop from "./BackDrop";
import { useState } from "react";

export default function Navbar() {

  const [isMenu, setIsMenu] = useState(false)

  return (
    <nav className="w-screen h-17.5 bg-white gap-3 fixed top-0 left-0 z-99 md:border-b border-gray-500/30">
      <div className="h-full max-w-7xl px-4 flex items-center mx-auto z-100 border-b border-gray-500/30 md:border-0">
        {/* Left part of the Navbar */}
        <div className="flex flex-1 ">
          <h1 className="text-2xl font-bold">ALUGOLD</h1>
        </div>

        {/* Middle part fo the navbar */}
        <div className="md:flex items-center justify-center gap-4 flex-1 hidden">
          <Link to="/">Home</Link>
          <Link to="/service">Service</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Right part of the navbar */}
        <div className="flex flex-1 justify-end">
          {/* Hide quotes button and show hamburger menu on smaller screens */}
          <p className="md:flex hidden">Get Quote</p>
          <button className="flex md:hidden cursor-pointer" onClick={() => { setIsMenu(prev => !prev) }}>
            <Menu />
          </button>
        </div>
      </div>

      {/* Nav dropdown menu on smaller screens  */}
      {isMenu && <BackDrop className={`lg:hidden`} setIsMenu={setIsMenu} />}
      <AnimatePresence>
        {isMenu && <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: -0.5 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
          className={`
            absolute top-17.5 h-75 w-full bg-white -z-1 lg:hidden flex flex-col items-center p-8 justify-between text-(--on-surface-variant)
          `}>

        </motion.div>}
      </AnimatePresence>
    </nav>
  )
}