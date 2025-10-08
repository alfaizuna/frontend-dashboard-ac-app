import { create } from 'zustand'
import { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: (callback?: () => void) => void
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
  
  logout: (callback?: () => void) => {
    // Bersihkan semua data dari localStorage
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    
    // Bersihkan semua cache lainnya yang mungkin ada
    localStorage.clear()
    
    // Reset auth state
    set({
      user: null,
      isAuthenticated: false,
    })
    
    // Jalankan callback jika ada (untuk redirect)
    if (callback) {
      callback()
    }
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