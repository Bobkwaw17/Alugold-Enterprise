import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="w-screen h-15 bg-white shadow-xs gap-3">
      <div className="h-full max-w-7xl px-4 flex items-center mx-auto ">
        {/* Left part of the Navbar */}
        <div className="flex flex-1">
          <p>ALUGOLD</p>
        </div>

        {/* Middle part fo the navbar */}
        <div className="flex items-center justify-center gap-4 flex-1">
          <Link to="/">Home</Link>
          <Link to="/service">Service</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Right part of the navbar */}
        <div className="flex flex-1 justify-end">
          <p>Get Quote</p>
        </div>
      </div>
    </nav>
  )
}