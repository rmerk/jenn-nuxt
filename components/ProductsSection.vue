<script setup lang="ts">
const categories = [
    { name: 'Bread', icon: 'i-heroicons-cake' },
    { name: 'Baguettes', icon: 'i-heroicons-cake' },
    { name: 'Breads', icon: 'i-heroicons-cake' },
    { name: 'Croissants', icon: 'i-heroicons-cake' },
    { name: 'Pastries', icon: 'i-heroicons-cake' },
];

const products = [
    {
        name: 'Hearth with love and honey',
        description: 'Wheat flour, water, salt, butter, milk, natural yeast, pressed yeast',
        price: 15.99,
        image: 'sour-dough-product-1.png',
    },
    {
        name: 'Hearth and buckwheat',
        description: 'Wheat flour, water, rye butter, milk, natural yeast',
        price: 12.99,
        image: 'sour-dough-product-2.png',
    },
    {
        name: 'Boulangerie',
        description: 'Wheat flour, water, butter, milk, natural yeast, pressed yeast',
        price: 14.99,
        image: 'sour-dough-product-3.png',
    },
];
</script>

<template>
    <section class="bg-cream py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 class="text-center text-gray-900">
                Featured products
            </h1>

            <!-- <div class="mt-12 flex justify-center space-x-12">
                <div
                    v-for="category in categories"
                    :key="category.name"
                    class="text-center"
                >
                    <div class="mx-auto size-16">
                        <UIcon :name="category.icon" class="text-primary size-full" />
                    </div>
                    <p class="mt-2 text-sm font-medium text-gray-600">
                        {{ category.name }}
                    </p>
                </div>
            </div> -->

            <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="product in products"
                    :key="product.name"
                    class="rounded-lg bg-white p-6"
                >
                    <img
                        :src="product.image"
                        :alt="product.name"
                        class="h-48 w-full rounded-lg object-cover"
                    >
                    <h3 class="mt-4 text-lg font-semibold">
                        {{ product.name }}
                    </h3>
                    <p class="mt-2 text-gray-600">
                        {{ product.description }}
                    </p>
                    <p class="text-primary mt-4 font-semibold">
                        ${{ product.price.toFixed(2) }}
                    </p>
                </div>
            </div>

            <div class="mt-12 flex items-center justify-center">
                <UButton
                    to="/shop"
                    color="primary"
                    class="text-lg"
                >
                    See more
                </UButton>
            </div>
        </div>
    </section>
</template>
