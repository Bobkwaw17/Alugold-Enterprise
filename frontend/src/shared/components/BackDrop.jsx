import { motion } from "framer-motion"

export default function BackDrop({ className, setIsMenu }) {


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`w-full h-screen bg-black/40 absolute left-0 bottom-0 top-17.5 -z-10 ${className}`} onClick={() => { setIsMenu(false) }}>

    </motion.div>
  )
}