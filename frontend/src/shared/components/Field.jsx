// Labeled input/textarea/select used by every form. Pass `as` for textarea/select.
export default function Field({ label, as: Tag = "input", className = "", children, ...props }) {
  return (
    <label className="relative block">
      <span className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5f5e5e]">
        {label}
      </span>
      <Tag
        className={`w-full border border-[#d0c5af]/50 bg-white p-3 text-sm outline-none transition-all focus:border-[#735c00] ${className}`}
        {...props}
      >
        {children}
      </Tag>
    </label>
  )
}

export function FormMessage({ state }) {
  if (!state?.text) return null
  return (
    <p role="status" className={`text-sm ${state.type === "error" ? "text-[#ba1a1a]" : "text-[#735c00]"}`}>
      {state.text}
    </p>
  )
}

export function SubmitButton({ busy, children }) {
  return (
    <button
      type="submit" disabled={busy}
      className="w-full cursor-pointer bg-[#d4af37] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#a68926] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {busy ? "Please wait…" : children}
    </button>
  )
}
