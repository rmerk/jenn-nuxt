<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Profile Section -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center space-x-5">
              <div class="flex-shrink-0">
                <div class="relative">
                  <span class="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                    <UserCircleIcon class="h-full w-full text-gray-300" />
                  </span>
                </div>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900">
                  {{ authStore.user?.username }}
                </h1>
                <p class="text-sm font-medium text-gray-500">
                  {{ authStore.user?.email }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Orders Section -->
        <div class="mt-8">
          <h2 class="text-lg font-medium text-gray-900">Order History</h2>
          <div class="mt-4 bg-white shadow rounded-lg divide-y divide-gray-200">
            <div v-if="orders.length === 0" class="p-6 text-center text-gray-500">
              No orders found
            </div>
            <div v-else v-for="order in orders" :key="order.id" class="p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-amber-600">
                    Order #{{ order.id }}
                  </p>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ new Date(order.createdAt).toLocaleDateString() }}
                  </p>
                </div>
                <p class="text-sm font-medium text-gray-900">
                  ${{ order.total.toFixed(2) }}
                </p>
              </div>
              <div class="mt-4">
                <div class="text-sm text-gray-500">
                  <div v-for="item in order.items" :key="item.id" class="flex justify-between">
                    <span>{{ item.name }} × {{ item.quantity }}</span>
                    <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <span :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  {
                    'bg-green-100 text-green-800': order.status === 'completed',
                    'bg-yellow-100 text-yellow-800': order.status === 'processing',
                    'bg-gray-100 text-gray-800': order.status === 'pending'
                  }
                ]">
                  {{ order.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Logout Button -->
        <div class="mt-8">
          <button
            @click="handleLogout"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { UserCircleIcon } from '@heroicons/vue/24/solid'


const toast = useToast();

definePageMeta({
  middleware: 'auth',
  requiresAuth: true
})

const authStore = useAuthStore()
const router = useRouter()

const { find } = useStrapi()
const { data: orders } = await useAsyncData('orders',
  () => find('orders', {
    filters: {
      user: authStore.user?.id
    },
    populate: ['items']
  })
)

const handleLogout = async () => {
  try {
    await authStore.logout()
    toast.add({
      color: 'green',
      description: 'You have been logged out'
    })
    router.push('/')
  } catch (error) {
    const err = error as Error
    toast.add({
      color: 'red',
      description: err.message
    })
  }
}
</script>