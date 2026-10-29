import { create } from "zustand"
import { api, unwrap } from "../lib/api"
import { DEFAULTS } from "../lib/contentDefaults"

export const useContent = create((set) => ({
  overrides: {},
  async load() {
    try { set({ overrides: unwrap(await api.get("/content")) }) } catch { /* keep defaults */ }
  },
  setOverrides: (overrides) => set({ overrides }),
}))

/** const t = useText(); t("home_heroTitle") -> admin override or built-in default */
export function useText() {
  const overrides = useContent((s) => s.overrides)
  return (key) => overrides[key] || DEFAULTS[key] || ""
}
