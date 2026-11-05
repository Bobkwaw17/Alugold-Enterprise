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
    <div className="min-h-screen w-full overflow-x-clip">
      <Navbar />
      <main className="mx-auto mt-[4.375rem] flex w-full max-w-7xl flex-col">
        <Load><Outlet /></Load>
      </main>
      <Footer />
      <Modals />
    </div>
  )
}