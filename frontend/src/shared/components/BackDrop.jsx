import { motion } from "framer-motion"

export default function BackDrop({ className, setIsMenu }) {


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-hidden="true"
      className={`fixed inset-x-0 bottom-0 top-[4.375rem] z-40 bg-black/40 ${className}`}
      onClick={() => setIsMenu(false)}
    >
    </motion.div>
  )
}