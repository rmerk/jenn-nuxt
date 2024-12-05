<template>
  <header class="bg-white border-b border-gray-200">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="text-2xl font-bold text-amber-600">
            Sweet Delights
          </NuxtLink>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex md:space-x-8">
          <NuxtLink
            v-for="link in navigationLinks"
            :key="link.to"
            :to="link.to"
            class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-amber-600 hover:border-amber-500"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-4">
          <ShoppingCart />
          <template v-if="authStore.isAuthenticated">
            <div class="relative ml-3">
              <UButton
                @click="isUserMenuOpen = !isUserMenuOpen"
                color="gray"
                variant="ghost"
                class="flex rounded-full"
              >
                <span class="sr-only">Open user menu</span>
                <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
              </UButton>

              <!-- User Dropdown Menu -->
              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                @click.away="isUserMenuOpen = false"
              >
                <NuxtLink
                  to="/account"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Account
                </NuxtLink>
                <NuxtLink
                  v-if="authStore.isAdmin"
                  to="/admin"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Admin Dashboard
                </NuxtLink>
                <UButton
                  @click="handleLogout"
                  color="gray"
                  variant="ghost"
                  class="w-full text-left px-4 py-2 text-sm"
                >
                  Sign out
                </UButton>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink
              to="/login"
              class="text-sm font-medium text-gray-700 hover:text-amber-600"
            >
              Sign in
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <UButton
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            color="gray"
            variant="ghost"
            class="inline-flex items-center justify-center rounded-md p-2"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              :class="['h-6 w-6', isMobileMenuOpen ? 'hidden' : 'block']"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              :class="['h-6 w-6', isMobileMenuOpen ? 'block' : 'hidden']"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </UButton>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div :class="['md:hidden', isMobileMenuOpen ? 'block' : 'hidden']">
        <div class="space-y-1 pb-3 pt-2">
          <NuxtLink
            v-for="link in navigationLinks"
            :key="link.to"
            :to="link.to"
            class="block py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import ShoppingCart from '~/components/ShoppingCart.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const isUserMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)

const navigationLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/pricing', label: 'Shop' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' }
]

const handleLogout = async () => {
  try {
    await authStore.logout()
    isUserMenuOpen.value = false
    $toast.success('Successfully logged out')
    router.push('/')
  } catch (error) {
    $toast.error('Error logging out')
  }
}

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      isUserMenuOpen.value = false
      isMobileMenuOpen.value = false
    }
  })
})
</script>