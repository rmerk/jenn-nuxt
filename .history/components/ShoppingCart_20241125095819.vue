<template>
  <div class="relative">
    <UButton
      @click="isOpen = !isOpen"
      color="gray"
      variant="ghost"
      icon="i-heroicons-shopping-cart"
    >
      <UBadge
        v-if="cartStore.itemCount > 0"
        :value="cartStore.itemCount"
        color="amber"
        class="absolute -top-1 -right-1"
      />
    </UButton>

    <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-lg' }">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">Shopping Cart</h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div v-if="cartStore.items.length === 0" class="text-center py-8">
          <UIcon name="i-heroicons-shopping-cart" class="mx-auto h-12 w-12 text-gray-400" />
          <p class="mt-2">Your cart is empty</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-4">
            <img 
              :src="item.image?.url || 'https://placehold.co/100x100?text=No+Image'"
              :alt="item.name"
              class="h-16 w-16 object-cover rounded"
            >
            <div class="flex-1">
              <h3 class="font-medium">{{ item.name }}</h3>
              <div class="flex items-center justify-between mt-1">
                <p size="sm" color="gray">
                  ${{ Number(item.price).toFixed(2) }} × {{ item.quantity }}
                </p>
                <p class="font-medium text-amber-600">
                  ${{ (Number(item.price) * item.quantity).toFixed(2) }}
                </p>
              </div>
            </div>
            <UButton
              @click="cartStore.removeItem(item)"
              color="red"
              variant="ghost"
              icon="i-heroicons-trash"
              size="xs"
            />
          </div>
        </div>

        <template #footer>
          <div class="space-y-4">
            <div class="flex justify-between">
              <p class="font-medium">Subtotal</p>
              <p class="font-medium">${{ cartStore.total.toFixed(2) }}</p>
            </div>
            <UButton
              @click="checkout"
              color="amber"
              variant="solid"
              block
              label="Checkout"
              :disabled="cartStore.items.length === 0"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()
const isOpen = ref(false)

const checkout = () => {
  isOpen.value = false
  router.push('/checkout')
}
</script>