import { create } from "zustand"
import { persist } from "zustand/middleware"
import { api, unwrap } from "../lib/api"

export const useAuth = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      async login(email, password) {
        const { token, user } = unwrap(await api.post("/auth/login", { email, password }))
        set({ token, user })
        return user
      },
      logout() {
        if (get().token) api.post("/auth/logout").catch(() => {})
        set({ token: null, user: null })
      },
    }),
    { name: "alugold-auth", partialize: (s) => ({ token: s.token, user: s.user }) }
  )
)
