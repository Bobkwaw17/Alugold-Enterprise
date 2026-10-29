import { Fragment, useState } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"
import Modal from "../../../shared/components/Modal"
import Field, { FormMessage, SubmitButton } from "../../../shared/components/Field"
import { useResource } from "./useResource"

export const fmtDate = (v) => (v ? new Date(v).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "—")

const STATUS_STYLE = {
  new: "bg-[#ffe088] text-[#554300]", pending: "bg-[#ffe088] text-[#554300]", unread: "bg-[#ffe088] text-[#554300]",
  contacted: "bg-[#dbe1ff] text-[#27438a]", confirmed: "bg-[#dbe1ff] text-[#27438a]", "in-progress": "bg-[#dbe1ff] text-[#27438a]", read: "bg-[#dbe1ff] text-[#27438a]",
  closed: "bg-[#e2e2e2] text-[#474646]", cancelled: "bg-[#ffdad6] text-[#93000a]", archived: "bg-[#e2e2e2] text-[#474646]", completed: "bg-[#d7f0d2] text-[#1d5c14]",
}

function StatusSelect({ value, options, onChange }) {
  return (
    <select
      value={value} onChange={(e) => onChange(e.target.value)} onClick={(e) => e.stopPropagation()}
      className={`cursor-pointer rounded-sm px-2 py-1 text-xs font-semibold outline-none ${STATUS_STYLE[value] ?? "bg-[#eee]"}`}
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function ItemForm({ title, fields, initial, onSubmit, onClose }) {
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)
  const submit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = {}
    for (const fd of fields) {
      if (fd.type === "checkbox") body[fd.name] = f.get(fd.name) === "on"
      else if (fd.type === "number") body[fd.name] = f.get(fd.name) === "" ? undefined : Number(f.get(fd.name))
      else body[fd.name] = f.get(fd.name)?.toString().trim()
    }
    setBusy(true)
    const err = await onSubmit(body)
    setBusy(false)
    if (err) setMsg({ type: "error", text: err }); else onClose()
  }
  return (
    <Modal open onClose={onClose} title={title}>
      <form onSubmit={submit} className="space-y-5">
        {fields.map((fd) =>
          fd.type === "checkbox" ? (
            <label key={fd.name} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name={fd.name} defaultChecked={!!initial?.[fd.name]} /> {fd.label}
            </label>
          ) : fd.type === "select" ? (
            <Field key={fd.name} label={fd.label} as="select" name={fd.name} defaultValue={initial?.[fd.name] ?? fd.options[0]}>
              {fd.options.map((o) => <option key={o}>{o}</option>)}
            </Field>
          ) : (
            <Field
              key={fd.name} label={fd.label} name={fd.name} required={fd.required}
              as={fd.type === "textarea" ? "textarea" : "input"} rows={fd.type === "textarea" ? 4 : undefined}
              type={fd.type === "number" ? "number" : "text"} min={fd.type === "number" ? fd.min : undefined} max={fd.max}
              defaultValue={initial?.[fd.name] ?? ""}
            />
          )
        )}
        <FormMessage state={msg} />
        <SubmitButton busy={busy}>Save</SubmitButton>
      </form>
    </Modal>
  )
}

/**
 * Generic admin table.
 * props: title, path, columns[{key,label,render?}], statusOptions?, fields? (create/edit form), canDelete,
 *        expand?(item) -> node shown when a row is clicked, empty
 */
export default function ResourceSection({ title, path, columns, statusOptions, fields, canDelete = true, expand, empty = "Nothing here yet." }) {
  const { items, error, reload, create, update, remove } = useResource(path)
  const [filter, setFilter] = useState("all")
  const [open, setOpen] = useState(null)      // expanded row id
  const [form, setForm] = useState(null)      // { item? } when create/edit modal is open
  const [actionError, setActionError] = useState(null)

  const act = async (p) => { const err = await p; setActionError(err) }
  const shown = (items ?? []).filter((i) => filter === "all" || i.status === filter)
  const colCount = columns.length + (statusOptions ? 1 : 0) + 1

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{title} {items && <span className="text-base font-normal text-[#5f5e5e]">({shown.length})</span>}</h1>
        <div className="flex items-center gap-2">
          {statusOptions && (
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-[#d0c5af]/60 bg-white px-3 py-2 text-sm">
              <option value="all">All statuses</option>
              {statusOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          )}
          <button onClick={reload} className="cursor-pointer border border-[#d0c5af]/60 bg-white px-3 py-2 text-sm">Refresh</button>
          {fields && (
            <button onClick={() => setForm({})} className="flex cursor-pointer items-center gap-1 bg-[#d4af37] px-3 py-2 text-sm font-semibold text-white hover:bg-[#a68926]">
              <Plus size={14} /> New
            </button>
          )}
        </div>
      </div>

      {(error || actionError) && <p role="alert" className="mb-4 text-sm text-[#ba1a1a]">{error || actionError}</p>}

      <div className="overflow-x-auto border border-[#d0c5af]/40 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-[#f3f3f4] text-[10px] uppercase tracking-widest text-[#5f5e5e]">
            <tr>
              {columns.map((c) => <th key={c.key} className="px-4 py-3 font-bold">{c.label}</th>)}
              {statusOptions && <th className="px-4 py-3 font-bold">Status</th>}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items === null && !error && <tr><td colSpan={colCount} className="px-4 py-8 text-center text-[#5f5e5e]">Loading…</td></tr>}
            {items && !shown.length && <tr><td colSpan={colCount} className="px-4 py-8 text-center text-[#5f5e5e]">{empty}</td></tr>}
            {shown.map((item) => (
              <Fragment key={item._id}>
                <tr
                  onClick={() => expand && setOpen(open === item._id ? null : item._id)}
                  className={`border-t border-[#d0c5af]/30 ${expand ? "cursor-pointer hover:bg-[#f9f9f9]" : ""}`}
                >
                  {columns.map((c) => <td key={c.key} className="px-4 py-3 align-top">{c.render ? c.render(item) : (item[c.key] ?? "—")}</td>)}
                  {statusOptions && (
                    <td className="px-4 py-3 align-top">
                      <StatusSelect value={item.status} options={statusOptions} onChange={(status) => act(update(item._id, { status }))} />
                    </td>
                  )}
                  <td className="whitespace-nowrap px-4 py-3 text-right align-top">
                    {fields && (
                      <button aria-label="Edit" onClick={(e) => { e.stopPropagation(); setForm({ item }) }} className="mr-2 cursor-pointer text-[#5f5e5e] hover:text-black">
                        <Pencil size={15} />
                      </button>
                    )}
                    {canDelete && (
                      <button
                        aria-label="Delete"
                        onClick={(e) => { e.stopPropagation(); if (confirm("Delete this item? This cannot be undone.")) act(remove(item._id)) }}
                        className="cursor-pointer text-[#ba1a1a] hover:opacity-70"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
                {expand && open === item._id && (
                  <tr className="bg-[#f9f9f9]"><td colSpan={colCount} className="px-4 py-4 text-sm leading-6 text-[#4d4635]">{expand(item)}</td></tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {form && (
        <ItemForm
          title={form.item ? `Edit ${title.replace(/s$/, "")}` : `New ${title.replace(/s$/, "")}`}
          fields={fields} initial={form.item}
          onSubmit={(body) => (form.item ? update(form.item._id, body) : create(body))}
          onClose={() => setForm(null)}
        />
      )}
    </div>
  )
}
