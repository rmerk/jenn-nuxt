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
                :src="`${runtimeConfig.strapi.url}/${product.productImage?.url}` || 'https://placehold.co/800x400?text=No+Image'"
                :alt="product.name"
                class="w-full h-48 object-cover"
            >
        </template>

        <div class="space-y-4">
            <div class="flex justify-between items-start">
                <h3 class="text-lg font-semibold text-gray-900">
                    {{ product.name }}
                </h3>
                <UBadge color="amber" size="lg">
                    ${{ Number(product.price).toFixed(2) }}
                </UBadge>
            </div>

            <p class="text-gray-600">
                {{ product.description }}
            </p>

            <div class="flex items-center gap-2 flex-wrap">
                <UBadge
                    v-for="tag in product.dietary_tags"
                    :key="tag.id"
                    color="amber"
                    variant="subtle"
                    size="sm"
                >
                    {{ tag.name }}
                </UBadge>
            </div>

            <div class="flex items-center gap-4">
                <UButtonGroup>
                    <UButton
                        icon="i-heroicons-minus"
                        color="amber"
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
                        color="amber"
                        variant="ghost"
                        @click="updateQuantity(1)"
                    />
                </UButtonGroup>

                <UButton
                    color="amber"
                    :disabled="quantity === 0"
                    block
                    @click="addToCart"
                >
                    Add to Cart
                </UButton>
            </div>
        </div>
    </UCard>
</template>
