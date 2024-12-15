<script setup lang="ts">
import type { Product } from '~/types/collections';

const { find } = useStrapi();

const { data: products } = await useAsyncData('products', () => find<Product>('products', { populate: '*' }));

function getProductImageUrl(url: string) {
    return STRAPI_URL + url;
}
</script>

<template>
    <div class="bg-white py-12">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h1 class="text-primary text-3xl font-extrabold">
                    Our Menu
                </h1>
                <p class="mt-4 text-xl text-gray-600">
                    Fresh baked goods made daily
                </p>
            </div>

            <div class="mt-12">
                <div
                    v-for="product in products?.data ?? []"
                    :key="product.id"
                    class="mb-12"
                >
                    <h2 class="text-primary mb-6 text-2xl font-bold">
                        {{ product.productName }}
                    </h2>
                    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <img
                            v-if="product?.productImage"
                            :src="getProductImageUrl(product.productImage.url)"
                            :alt="product.productName"
                            class="h-48 w-full object-contain"
                        >
                        <div class="px-6">
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
