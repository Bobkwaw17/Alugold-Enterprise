import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useContent } from "../../store/content";
import Navbar from "../components//Navbar"
import Footer from "./Footer";
import Load from "./Load";
import Modals from "../modals/Modals";

// App Layout handles layout groupings for pages with shared compoennts
export default function AppLayout() {
  const load = useContent((s) => s.load)
  useEffect(() => { load() }, [load])

  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <main className="flex flex-col max-w-7xl mx-auto mt-17.5">
        <Load><Outlet /></Load>
      </main>
      <Footer />
      <Modals />
    </div>
  )
}