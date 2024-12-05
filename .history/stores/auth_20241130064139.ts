import { defineStore } from 'pinia'
import type { StrapiUser } from '@nuxtjs/strapi'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as StrapiUser | null,
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
        this.user = response.user as StrapiUser
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
        this.user = response.value
      } catch (error) {
        this.user = null
      } finally {
        this.loading = false
      }
    },
  },
})