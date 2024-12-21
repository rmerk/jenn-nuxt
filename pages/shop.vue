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
    <div class="bg-cream py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h1>
                    Our Products
                </h1>

                <p class="mt-4 text-xl text-gray-600">
                    Fresh baked goods made with love
                </p>
            </div>

            <div class="my-20 md:mb-40 md:mt-20">
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
            <div class="mt-16 rounded-2xl bg-olive-800 p-8 text-center">
                <h2 class="text-2xl font-bold text-white">
                    Need a custom order?
                </h2>

                <p class="mx-auto mt-4 max-w-2xl text-white">
                    From everyday favorites to special occasions, we craft custom-baked breads just for you. Contact us to create the perfect loaf for your needs!
                </p>

                <NuxtLink
                    to="/contact"
                    class="mt-6 inline-flex items-center rounded-md border border-transparent px-6 py-3 text-lg font-medium text-white underline"
                >
                    Get in Touch <UIcon name="i-material-symbols-light:arrow-outward-rounded" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
