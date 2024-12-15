<script setup>
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const toast = useToast();
const router = useRouter();

const cardContainer = ref(null);
const isSquareInitialized = ref(false);
const isProcessing = ref(false);
let card = null;

onMounted(async () => {
    if (!cartStore.items.length) {
        router.push('/shop');
        return;
    }

    await initializePaymentForm();
});

async function initializePaymentForm() {
    if (!Square) {
        throw new Error('Square.js failed to load properly');
    }
    const payments = Square.payments(process.env.SQUARE_APP_ID, SQUARE_LOCATION_ID);
    try {
        card = await payments.card();
        await card.attach('#card-container');
    }
    catch (e) {
        console.error('Initializing Card failed', e);
    }
}

async function tokenize(paymentMethod) {
    const tokenResult = await paymentMethod.tokenize();
    if (tokenResult.status === 'OK') {
        return tokenResult.token;
    }
    else {
        let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
        if (tokenResult.errors) {
            errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
        }
        throw new Error(errorMessage);
    }
}

async function handlePaymentMethodSubmission() {
    const token = await tokenize(card);
    const { data, error } = await useFetch('/api/pay', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: {
            locationId,
            sourceId: token,
        },
    });
    if (!error.value) {
        console.log('Payment successful', data);
        toast.add({
            color: 'green',
            description: 'Payment successful!',
        });
        cartStore.clearCart();
        router.push('/order-confirmation');
    }
    else {
        toast.add({
            color: 'red',
            description: 'Payment failed. Please try again.',
        });
    }
}
</script>

<template>
    <div class="bg-white py-12">
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div class="space-y-8">
                <h1 class="text-primary text-3xl font-extrabold">
                    Checkout
                </h1>

                <!-- Order Summary -->
                <div class="rounded-lg bg-gray-50 p-6">
                    <h2 class="mb-4 text-xl font-semibold text-gray-900">
                        Order Summary
                    </h2>
                    <div class="space-y-4">
                        <div
                            v-for="item in cartStore.items"
                            :key="item.id"
                            class="flex justify-between"
                        >
                            <div>
                                <span class="font-medium">
                                    {{ item.name }}
                                </span>
                                <span class="ml-2 text-gray-600">
                                    × {{ item.quantity }}
                                </span>
                            </div>
                            <span>
                                ${{ (item.price * item.quantity).toFixed(2) }}
                            </span>
                        </div>
                        <div class="flex justify-between border-t pt-4 font-semibold">
                            <span>
                                Total
                            </span>
                            <span>
                                ${{ cartStore.total.toFixed(2) }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Payment Form -->
                <div class="rounded-lg border bg-white p-6">
                    <h2 class="mb-4 text-xl font-semibold text-gray-900">
                        Payment Details
                    </h2>
                    <div ref="cardContainer" />
                    <button
                        class="bg-primary hover:bg-primary mt-6 w-full rounded-md px-4 py-2 text-white disabled:opacity-50"
                        :disabled="!isSquareInitialized || isProcessing"
                        @click="handlePaymentMethodSubmission"
                    >
                        {{ isProcessing ? 'Processing...' : 'Pay Now' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
