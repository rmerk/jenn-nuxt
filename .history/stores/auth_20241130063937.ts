import { defineStore } from 'pinia'

interface User {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.provider === 'admin',
  },

  actions: {
    async login(identifier: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const { login } = useStrapiAuth()
        const response = await login({ identifier, password })
        this.user = response.user
      } catch (error: any) {
        this.error = error.message || 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      const { logout } = useStrapiAuth()
      await logout()
      this.user = null
    },

    async fetchUser() {
      this.loading = true
      try {
        const { fetchUser } = useStrapiAuth()
        const response = await fetchUser()
        this.user = response
      } catch (error) {
        this.user = null
      } finally {
        this.loading = false
      }
    },
  },
})