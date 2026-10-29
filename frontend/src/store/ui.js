import { create } from "zustand"

// Which global modal is open (rendered once in AppLayout) plus optional prefill data.
export const useUI = create((set) => ({
  modal: null, // 'quote' | 'contact' | 'login' | 'preferences' | 'project'
  prefill: {},
  open: (modal, prefill = {}) => set({ modal, prefill }),
  close: () => set({ modal: null, prefill: {} }),
}))
