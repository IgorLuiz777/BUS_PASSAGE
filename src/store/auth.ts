import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (userData: User) => void
  login: (userData: User, authToken: string) => void
  logout: () => void
  getCurrentUser: () => User | null
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (userData: User) => set({ user: userData }),

      login: (userData: User, authToken: string) =>
        set({
          user: userData,
          token: authToken,
          isAuthenticated: true
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false
        }),

      getCurrentUser: () => get().user
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user
      })
    }
  )
)
