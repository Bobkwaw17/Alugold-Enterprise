import { useCallback, useEffect, useState } from "react"
import { api, errorMessage, unwrap } from "../../../lib/api"

/** CRUD against an admin REST collection (GET/POST/PATCH/DELETE on `path`). */
export function useResource(path) {
  const [items, setItems] = useState(null)
  const [error, setError] = useState(null)

  const reload = useCallback(async () => {
    try { setItems(unwrap(await api.get(path))); setError(null) }
    catch (e) { setError(errorMessage(e, "Could not load data.")) }
  }, [path])

  useEffect(() => { setItems(null); reload() }, [reload])

  // Each mutation resolves to null on success or an error string, then refreshes the list.
  const run = async (fn) => {
    try { await fn(); await reload(); return null } catch (e) { return errorMessage(e) }
  }
  return {
    items, error, reload,
    create: (body) => run(() => api.post(path, body)),
    update: (id, body) => run(() => api.patch(`${path}/${id}`, body)),
    remove: (id) => run(() => api.delete(`${path}/${id}`)),
  }
}
