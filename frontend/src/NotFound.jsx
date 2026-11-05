
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-5 py-20 text-center">
      <div className="max-w-lg">
        <span className="mb-3 block text-xs font-bold uppercase tracking-[0.24em] text-[#735c00]">404 · Page not found</span>
        <h1 className="mb-4 font-serif text-4xl font-bold sm:text-5xl">This page isn’t here.</h1>
        <p className="mb-8 text-sm leading-6 text-[#5f5e5e]">The link may be out of date, or the page may have moved.</p>
        <Link to="/" className="inline-flex min-h-11 items-center justify-center bg-[#735c00] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#554300]">
          Return home
        </Link>
      </div>
    </div>
  );
}
