<script setup lang="ts">
import type { Product } from '~/types/collections';

const { find } = useStrapi();

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
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h1 class="text-primary text-3xl font-extrabold">
                    Our Products
                </h1>
                <p class="mt-4 text-xl text-gray-600">
                    Fresh baked goods made with love
                </p>
            </div>

            <div class="mt-12">
                <!-- Category Filters -->
                <div
                    class="mb-12 flex flex-wrap justify-center gap-y-2
                space-x-4"
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
                <div v-else class="py-12 text-center">
                    <div class="animate-pulse space-y-4">
                        <div
                            v-for="i in 6"
                            :key="i"
                            class="h-64 rounded-lg bg-gray-200"
                        />
                    </div>
                </div>
            </div>

            <!-- Custom Orders Banner -->
            <div class="bg-primary mt-16 rounded-2xl p-8 text-center">
                <h2 class="text-primary text-2xl font-bold">
                    Need a Custom Order?
                </h2>
                <p class="mx-auto mt-4 max-w-2xl text-gray-600">
                    Looking for something special? We offer custom orders for any occasion.
                    Contact us to discuss your requirements.
                </p>
                <NuxtLink
                    to="/contact"
                    class="bg-primary hover:bg-primary mt-6 inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white"
                >
                    Get in Touch
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
