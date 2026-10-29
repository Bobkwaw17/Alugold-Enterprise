import { useEffect } from "react"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export default function Modal({ open, onClose, title, subtitle, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = "" }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center overflow-y-auto bg-black/50 p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-label={title}
            className="relative w-full max-w-lg bg-white p-8 shadow-2xl"
            initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}
          >
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 cursor-pointer text-[#5f5e5e] hover:text-black">
              <X size={18} />
            </button>
            <h2 className="mb-1 text-2xl font-semibold">{title}</h2>
            {subtitle && <p className="mb-6 text-sm text-[#5f5e5e]">{subtitle}</p>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
