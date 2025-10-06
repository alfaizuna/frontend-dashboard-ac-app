import { create } from 'zustand'
import { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  
  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
    })
  },
  
  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    
    set({
      user: null,
      isAuthenticated: false,
    })
  },
  
  initializeAuth: () => {
    const userStr = localStorage.getItem('user')
    const token = localStorage.getItem('access_token')
    
    if (userStr && token) {
      try {
        const user = JSON.parse(userStr)
        set({
          user,
          isAuthenticated: true,
        })
      } catch (error) {
        // Invalid user data, clear storage
        get().logout()
      }
    }
  },
}))