import { useState } from "react"
import { errorMessage } from "./api"

/** Wraps an async submit: tracks busy + a {type,text} message. */
export function useSubmit(fn, successText) {
  const [busy, setBusy] = useState(false)
  const [state, setState] = useState(null)
  const run = async (...args) => {
    setBusy(true); setState(null)
    try {
      const result = await fn(...args)
      setState({ type: "success", text: typeof successText === "function" ? successText(result) : successText })
      return { ok: true, result }
    } catch (e) {
      setState({ type: "error", text: errorMessage(e) })
      return { ok: false }
    } finally {
      setBusy(false)
    }
  }
  return { busy, state, run, setState }
}
