<template>
  <div class="bg-white py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="space-y-8">
        <h1 class="text-3xl font-extrabold text-amber-800">Checkout</h1>

        <!-- Order Summary -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div class="space-y-4">
            <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between">
              <div>
                <span class="font-medium">{{ item.name }}</span>
                <span class="text-gray-600 ml-2">× {{ item.quantity }}</span>
              </div>
              <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
            <div class="border-t pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>${{ cartStore.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Payment Form -->
        <div class="bg-white rounded-lg p-6 border">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>
          <div ref="cardContainer"></div>
          <button
            @click="handlePayment"
            class="mt-6 w-full bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 disabled:opacity-50"
            :disabled="!isSquareInitialized || isProcessing"
          >
            {{ isProcessing ? 'Processing...' : 'Pay Now' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const toast = useToast()
const router = useRouter()

const cardContainer = ref(null)
const isSquareInitialized = ref(false)
const isProcessing = ref(false)
let card = null

onMounted(async () => {
  if (!cartStore.items.length) {
    router.push('/pricing')
    return
  }

  await initializePaymentForm();
})

const initializePaymentForm = async () => {
  if (!Square) {
    throw new Error("Square.js failed to load properly");
  }
  const payments = Square.payments(process.env.SQUARE_APP_ID, SQUARE_LOCATION_ID);
  try {
    card = await payments.card();
    await card.attach("#card-container");
  } catch (e) {
    console.error("Initializing Card failed", e);
    return;
  }
};

const tokenize = async (paymentMethod) => {
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === "OK") {
    return tokenResult.token;
  } else {
    let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
    }
    throw new Error(errorMessage);
  }
};

const handlePaymentMethodSubmission = async () => {
  paymentStatus.value = "";
  const token = await tokenize(card);
  const { data, error } = await useFetch("/api/pay", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      locationId,
      sourceId: token,
    },
  });
  if (!error.value) {
    paymentStatus.value = "Payment completed";
  } else {
    paymentStatus.value = "Payment failed";
  }
};

const handlePaymentMethodSubmission = async () => {
  if (!card) return

  try {
    isProcessing.value = true
    const result = await card.tokenize()
    if (result.status === 'OK') {
      // Send payment token to your server to complete the payment
      const response = await $fetch('/api/process-payment', {
        method: 'POST',
        body: {
          sourceId: result.token,
          amount: cartStore.total,
          items: cartStore.items
        }
      })

      if (response.success) {
        toast.success('Payment successful!')
        cartStore.clearCart()
        router.push('/order-confirmation')
      } else {
        throw new Error('Payment failed')
      }
    }
  } catch (error) {
    toast.error('Payment failed. Please try again.')
    console.error('Payment error:', error)
  } finally {
    isProcessing.value = false
  }
}
</script>