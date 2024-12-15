<script setup>
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
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'Hearth and buckwheat',
        description: 'Wheat flour, water, rye butter, milk, natural yeast',
        price: 12.99,
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'Boulangerie',
        description: 'Wheat flour, water, butter, milk, natural yeast, pressed yeast',
        price: 14.99,
        image: 'https://via.placeholder.com/150',
    },
];
</script>

<template>
    <section class="bg-gray-50 py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 class="text-center font-serif text-3xl font-bold text-gray-900">
                Our products
            </h2>

            <div class="mt-12 flex justify-center space-x-12">
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
            </div>

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

            <div class="mt-12 text-center">
                <UButton
                    to="/menu"
                    color="primary"
                    variant="outline"
                >
                    See more
                </UButton>
            </div>
        </div>
    </section>
</template>
