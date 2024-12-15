<script setup>
import { useCartStore } from '~/stores/cart';

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const quantity = ref(0);
const cartStore = useCartStore();

function updateQuantity(delta) {
    const newQuantity = quantity.value + delta;
    if (newQuantity >= 0) {
        quantity.value = newQuantity;
    }
}

const mediaUrl = computed(() => {
    return STRAPI_URL + props.product.productImage?.url;
});

function addToCart() {
    if (quantity.value > 0) {
        cartStore.addItem({
            ...props.product,
            quantity: quantity.value,
        });
        quantity.value = 0;
    }
}
</script>

<template>
    <UCard>
        <template #header>
            <img
                :src="mediaUrl"
                :alt="product.name"
                class="h-48 w-full object-cover"
            >
        </template>

        <div class="space-y-4">
            <div class="flex items-start justify-between">
                <h3 class="text-lg font-semibold text-gray-900">
                    {{ product.name }}
                </h3>
                <UBadge color="primary" size="lg">
                    ${{ Number(product.price).toFixed(2) }}
                </UBadge>
            </div>

            <p class="text-gray-600">
                {{ product.description }}
            </p>

            <div class="flex flex-wrap items-center gap-2">
                <UBadge
                    v-for="tag in product.dietary_tags"
                    :key="tag.id"
                    color="primary"
                    variant="subtle"
                    size="sm"
                >
                    {{ tag.name }}
                </UBadge>
            </div>

            <div class="flex items-center justify-between gap-4">
                <UButtonGroup>
                    <UButton
                        icon="i-heroicons-minus"
                        color="primary"
                        variant="ghost"
                        :disabled="quantity <= 0"
                        @click="updateQuantity(-1)"
                    />
                    <UInput
                        v-model="quantity"
                        type="number"
                        class="w-16 text-center"
                        min="0"
                    />
                    <UButton
                        icon="i-heroicons-plus"
                        color="primary"
                        variant="ghost"
                        @click="updateQuantity(1)"
                    />
                </UButtonGroup>

                <UButton
                    color="primary"
                    :disabled="quantity === 0"
                    @click="addToCart"
                >
                    Add to Cart
                </UButton>
            </div>
        </div>
    </UCard>
</template>
