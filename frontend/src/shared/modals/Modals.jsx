import { useEffect, useState } from "react"
import { api, unwrap } from "../../lib/api"
import { useSubmit } from "../../lib/useSubmit"
import { useAuth } from "../../store/auth"
import { useUI } from "../../store/ui"
import Modal from "../components/Modal"
import Field, { FormMessage, SubmitButton } from "../components/Field"

const SERVICE_TYPES = ["Cladding", "Fabrication", "Curtain Walls", "Maintenance", "Other"]
const val = (form, k) => new FormData(form).get(k)?.toString().trim()

function QuoteModal({ onClose, prefill }) {
  const { busy, state, run } = useSubmit(
    (body) => api.post("/quotes", body),
    "Thank you — our team will get back to you shortly."
  )
  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const { ok } = await run({
      fullName: val(form, "fullName"), email: val(form, "email"), phone: val(form, "phone"),
      serviceType: val(form, "serviceType"), projectDescription: val(form, "projectDescription"),
    })
    if (ok) form.reset()
  }
  return (
    <Modal open onClose={onClose} title="Request a Quote" subtitle="Tell us about your project and we'll respond with a tailored quote.">
      <form onSubmit={submit} className="space-y-5">
        <Field label="Full Name" name="fullName" required autoComplete="name" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" name="email" type="email" required autoComplete="email" />
          <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <Field label="Service" as="select" name="serviceType" defaultValue="Cladding">
          {SERVICE_TYPES.map((s) => <option key={s}>{s}</option>)}
        </Field>
        <Field label="Project Description" as="textarea" name="projectDescription" rows={4} required
          defaultValue={prefill.description ?? ""} className="resize-none" />
        <FormMessage state={state} />
        <SubmitButton busy={busy}>Send Request</SubmitButton>
      </form>
    </Modal>
  )
}

function ContactModal({ onClose }) {
  const { busy, state, run } = useSubmit((body) => api.post("/contact", body), "Message sent — we'll be in touch.")
  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const { ok } = await run({ fullName: val(form, "fullName"), email: val(form, "email"), message: val(form, "message") })
    if (ok) form.reset()
  }
  return (
    <Modal open onClose={onClose} title="Contact Us" subtitle="Questions about a project? Send us a message.">
      <form onSubmit={submit} className="space-y-5">
        <Field label="Full Name" name="fullName" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Message" as="textarea" name="message" rows={4} required className="resize-none" />
        <FormMessage state={state} />
        <SubmitButton busy={busy}>Send Message</SubmitButton>
      </form>
    </Modal>
  )
}

function LoginModal({ onClose }) {
  const login = useAuth((s) => s.login)
  const { busy, state, run } = useSubmit(login)
  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const { ok } = await run(val(form, "email"), form.password.value)
    if (ok) onClose()
  }
  return (
    <Modal open onClose={onClose} title="Client Login" subtitle="Access The Gold Standard Portal.">
      <form onSubmit={submit} className="space-y-5">
        <Field label="Email" name="email" type="email" required autoComplete="username" />
        <Field label="Password" name="password" type="password" required autoComplete="current-password" />
        <FormMessage state={state} />
        <SubmitButton busy={busy}>Sign In</SubmitButton>
      </form>
    </Modal>
  )
}

const csv = (s) => (s ?? "").split(",").map((x) => x.trim()).filter(Boolean)

function PreferencesModal({ onClose }) {
  const user = useAuth((s) => s.user)
  const [prefs, setPrefs] = useState(null)
  const [loadError, setLoadError] = useState(null)
  const { busy, state, run } = useSubmit((body) => api.put(`/users/${user._id}/preferences`, body), "Preferences saved.")

  useEffect(() => {
    api.get(`/users/${user._id}/preferences`).then((r) => setPrefs(unwrap(r))).catch(() => setLoadError("Could not load preferences."))
  }, [user._id])

  const submit = (e) => {
    e.preventDefault()
    const f = e.currentTarget
    run({
      materials: csv(f.materials.value), finishes: csv(f.finishes.value),
      notifications: { milestones: f.milestones.checked, email: f.email.checked },
    })
  }
  return (
    <Modal open onClose={onClose} title="User Preferences" subtitle="Curate your material library, finishes and notifications.">
      {loadError ? <p className="text-sm text-[#ba1a1a]">{loadError}</p> : !prefs ? <p className="text-sm">Loading…</p> : (
        <form onSubmit={submit} className="space-y-5">
          <Field label="Materials (comma separated)" name="materials" defaultValue={prefs.materials.join(", ")} />
          <Field label="Finishes (comma separated)" name="finishes" defaultValue={prefs.finishes.join(", ")} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="milestones" defaultChecked={prefs.notifications.milestones} /> Notify me on site milestones</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="email" defaultChecked={prefs.notifications.email} /> Email notifications</label>
          <FormMessage state={state} />
          <SubmitButton busy={busy}>Save Preferences</SubmitButton>
        </form>
      )}
    </Modal>
  )
}

function ProjectModal({ onClose, prefill }) {
  const { busy, state, run } = useSubmit((body) => api.post("/projects", body), "Project registered.")
  const submit = async (e) => {
    e.preventDefault()
    const f = e.currentTarget
    const { ok } = await run({ name: val(f, "name"), serviceType: val(f, "serviceType"), description: val(f, "description") })
    if (ok) { prefill.onCreated?.(); f.reset() }
  }
  return (
    <Modal open onClose={onClose} title="Register Project" subtitle="Add a new project to the portal.">
      <form onSubmit={submit} className="space-y-5">
        <Field label="Project Name" name="name" required />
        <Field label="Service" as="select" name="serviceType" defaultValue="Cladding">
          {SERVICE_TYPES.map((s) => <option key={s}>{s}</option>)}
        </Field>
        <Field label="Description" as="textarea" name="description" rows={4} required className="resize-none" />
        <FormMessage state={state} />
        <SubmitButton busy={busy}>Register Project</SubmitButton>
      </form>
    </Modal>
  )
}

const MODALS = { quote: QuoteModal, contact: ContactModal, login: LoginModal, preferences: PreferencesModal, project: ProjectModal }

// Mounted once in AppLayout. Rendering only the active modal remounts (resets) forms on each open.
export default function Modals() {
  const { modal, prefill, close } = useUI()
  const Active = modal && MODALS[modal]
  return Active ? <Active onClose={close} prefill={prefill} /> : null
}
