<script setup>
const { find } = useStrapi();

const { data: categories } = await useAsyncData('categories', () => find('categories', {
    populate: {
        items: {
            populate: '*',
        },
    },
}));
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
                <div v-for="category in categories" :key="category.id" class="mb-12">
                    <h2 class="text-2xl font-bold text-amber-700 mb-6">
                        {{ category.name }}
                    </h2>
                    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div v-for="item in category.items" :key="item.id" class="bg-white rounded-lg shadow-md overflow-hidden">
                            <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-48 object-cover">
                            <div class="p-6">
                                <div class="flex justify-between items-start">
                                    <h3 class="text-lg font-semibold text-gray-900">
                                        {{ item.name }}
                                    </h3>
                                    <span class="text-amber-600 font-medium">${{ item.price.toFixed(2) }}</span>
                                </div>
                                <p class="mt-2 text-gray-600">
                                    {{ item.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
