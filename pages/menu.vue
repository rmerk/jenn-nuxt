<script setup lang="ts">
import type { Product } from '~/types/collections';

const { find } = useStrapi();

const { data: products } = await useAsyncData('products', () => find<Product>('products', { populate: '*' }));

function getProductImageUrl(url: string) {
    return STRAPI_URL + url;
}
</script>

<template>
    <div class="bg-cream py-12">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h1>
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
                    <h4 class="mb-6">
                        {{ product.productName }}
                    </h4>
                    <div class="flex gap-6 md:flex-row">
                        <img
                            v-if="product?.productImage"
                            :src="getProductImageUrl(product.productImage.url)"
                            :alt="product.productName"
                            class="h-52 w-full object-contain md:w-auto"
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
