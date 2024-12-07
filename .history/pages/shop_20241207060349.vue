<script setup lang="ts">
import type { Product } from '~/types/collections';

const { find } = useStrapi();
const runtimeConfig = useRuntimeConfig();

// Fetch products from Strapi
const { data: products } = await useAsyncData(
    'products',
    () => find<Product>('products', {
        sort: 'productName:asc',
        populate: '*',
    }),
);
</script>

<template>
    <div class="bg-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h1 class="text-3xl font-extrabold text-amber-800">
                    Our Products
                </h1>
                <p class="mt-4 text-xl text-gray-600">
                    Fresh baked goods made with love
                </p>
            </div>

            <div class="mt-12">
                <!-- Category Filters -->
                <div
                    class="flex justify-center space-x-4 mb-12 flex-wrap
                gap-y-2"
                />

                <!-- Products Grid -->
                <div v-if="products" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <ProductCard
                        v-for="product in products?.data"
                        :key="product.id"
                        :product="product"
                    />
                </div>

                <!-- Loading State -->
                <div v-else class="text-center py-12">
                    <div class="animate-pulse space-y-4">
                        <div v-for="i in 6" :key="i" class="bg-gray-200 h-64 rounded-lg" />
                    </div>
                </div>
            </div>

            <!-- Custom Orders Banner -->
            <div class="mt-16 bg-amber-50 rounded-2xl p-8 text-center">
                <h2 class="text-2xl font-bold text-amber-800">
                    Need a Custom Order?
                </h2>
                <p class="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Looking for something special? We offer custom orders for any occasion.
                    Contact us to discuss your requirements.
                </p>
                <NuxtLink
                    to="/contact"
                    class="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
                >
                    Get in Touch
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
