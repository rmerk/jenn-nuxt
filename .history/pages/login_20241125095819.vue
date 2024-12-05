<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <NuxtLink to="/forgot-password" class="font-medium text-amber-600 hover:text-amber-500">
                Forgot your password?
              </NuxtLink>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="authStore.loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {{ authStore.loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>

          <div v-if="authStore.error" class="mt-4 text-red-600 text-sm text-center">
            {{ authStore.error }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const form = ref({
  email: '',
  password: '',
})

const handleSubmit = async () => {
  try {
    await authStore.login(form.email, form.password)
    toast.success('Successfully logged in!')
    router.push('/account')
  } catch (error) {
    toast.error('Invalid credentials')
  }
}
</script>