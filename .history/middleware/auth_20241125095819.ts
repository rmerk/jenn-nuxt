export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return navigateTo('/login')
  }
  
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return navigateTo('/')
  }
})