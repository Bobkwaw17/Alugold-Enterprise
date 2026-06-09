

export default function BackDrop({ className, setIsMenu }) {


  return (
    <div className={`w-full h-screen bg-black/40 absolute left-0 bottom-0 top-17.5 -z-10 ${className}`} onClick={() => { setIsMenu(false) }}>

    </div>
  )
}