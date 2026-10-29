import { useEffect, useState } from "react"
import { api, errorMessage, unwrap } from "../../../lib/api"
import { CONTENT_GROUPS } from "../../../lib/contentDefaults"
import { useContent } from "../../../store/content"
import { FormMessage } from "../../../shared/components/Field"

export default function Content() {
  const { overrides, load, setOverrides } = useContent()
  const [values, setValues] = useState({})
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => { load() }, [load])
  useEffect(() => { setValues(overrides) }, [overrides])

  const dirty = CONTENT_GROUPS.flatMap((g) => g.fields.map((f) => f.key)).filter((k) => (values[k] ?? "") !== (overrides[k] ?? ""))

  const save = async () => {
    setBusy(true); setMsg(null)
    try {
      const body = Object.fromEntries(dirty.map((k) => [k, values[k] ?? ""]))
      setOverrides(unwrap(await api.put("/content", body)))
      setMsg({ type: "success", text: "Saved. The site now shows your changes." })
    } catch (e) {
      setMsg({ type: "error", text: errorMessage(e) })
    } finally { setBusy(false) }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Page Content</h1>
          <p className="text-sm text-[#5f5e5e]">Edit the text on the main pages. Leave a field empty to use the default (shown as placeholder).</p>
        </div>
        <button
          onClick={save} disabled={!dirty.length || busy}
          className="cursor-pointer bg-[#d4af37] px-5 py-2 text-sm font-semibold text-white hover:bg-[#a68926] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Saving…" : `Save changes${dirty.length ? ` (${dirty.length})` : ""}`}
        </button>
      </div>
      <div className="mb-4"><FormMessage state={msg} /></div>

      <div className="space-y-8">
        {CONTENT_GROUPS.map((g) => (
          <section key={g.title} className="border border-[#d0c5af]/40 bg-white p-6">
            <h2 className="mb-5 text-lg font-semibold">{g.title}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {g.fields.map((f) => {
                const Tag = f.multiline ? "textarea" : "input"
                return (
                  <label key={f.key} className={`relative block ${f.multiline ? "md:col-span-2" : ""}`}>
                    <span className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5f5e5e]">{f.label}</span>
                    <Tag
                      rows={f.multiline ? 3 : undefined} maxLength={2000}
                      value={values[f.key] ?? ""} placeholder={f.default}
                      onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                      className="w-full border border-[#d0c5af]/50 p-3 text-sm outline-none focus:border-[#735c00]"
                    />
                  </label>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
