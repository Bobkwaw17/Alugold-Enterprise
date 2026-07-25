import { Outlet } from "react-router-dom";
import Navbar from "../components//Navbar"
import Footer from "./Footer";
import Load from "./Load";

// App Layout handles layout groupings for pages with shared compoennts
export default function AppLayout() {

  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <main className="flex flex-col max-w-7xl mx-auto mt-17.5">
        <Load><Outlet /></Load>
      </main>
      <Footer />
    </div>
  )
}