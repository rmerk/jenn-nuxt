<script setup lang="ts">
import type { Product } from '~/types/collections';

const { find } = useStrapi();

const { data: products } = await useAsyncData('products', () => find<Product>('products', {
    populate: '*',
}));

function getProductImageUrl(url: string) {
    return STRAPI_URL + url;
}
</script>

<template>
    <div class="bg-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h1 class="text-3xl font-extrabold text-amber-800">
                    Our Menu
                </h1>
                <p class="mt-4 text-xl text-gray-600">
                    Fresh baked goods made daily
                </p>
            </div>

            <div class="mt-12">
                <div v-for="product in products?.data ?? []" :key="product.id" class="mb-12">
                    <h2 class="text-2xl font-bold text-amber-700 mb-6">
                        {{ product.productName }}
                    </h2>
                    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <img v-if="product?.productImage" :src="getProductImageUrl(product.productImage.url)" :alt="product.productName" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <div class="flex justify-between items-start">
                                <h3 class="text-lg font-semibold text-gray-900">
                                    {{ product.name }}
                                </h3>
                                <span class="text-amber-600 font-medium">${{ product.price }}</span>
                            </div>
                            <p class="mt-2 text-gray-600">
                                {{ product.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
