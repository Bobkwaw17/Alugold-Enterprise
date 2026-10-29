

export default function Button({ className, type, onClick, submit = false, children }) {

  // This is a reusable button componet className props for general styling like padding flex if needed ect
  // onClick to handle actions
  // type for styled button with colros and text colors
  // children props is passed when element is wrapped around by the Button componet

  return (
    <button type={submit ? "submit" : "button"} className={`
      cursor-pointer font-semibold transition-all duration-150
      ${type === "primary" ? "bg-(--primary) text-(--on-primary)" : type === "inverse-primary" ? "  bg-(--inverse-primary) text-(--on-primary-container) hover:bg-[#a68926] hover:text-(--on-primary)" : ""} 
      ${className}`}
      onClick={onClick}>
      {children}
    </button>
  )
}