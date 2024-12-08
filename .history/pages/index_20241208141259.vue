<script setup>
import { CakeIcon, FireIcon, HeartIcon } from '@heroicons/vue/24/outline';

const specialties = [
    {
        name: 'Artisan Breads',
        description: 'Handcrafted sourdough and specialty breads baked fresh daily.',
        icon: FireIcon,
    },
    {
        name: 'Custom Cakes',
        description: 'Beautiful custom cakes for any special occasion.',
        icon: CakeIcon,
    },
    {
        name: 'French Pastries',
        description: 'Authentic French pastries made with traditional techniques.',
        icon: HeartIcon,
    },
];
</script>

<template>
    <main>
        <section class="relative bg-amber-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div class="text-center">
                    <h1 class="text-4xl font-extrabold text-amber-800 sm:text-5xl md:text-6xl">
                        Fresh Baked Goodness
                    </h1>
                    <p class="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Artisanal breads, pastries, and cakes baked fresh daily with the finest ingredients.
                    </p>
                    <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                        <div class="rounded-md shadow">
                            <NuxtLink to="/menu" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 md:py-4 md:text-lg md:px-10">
                                View Menu
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-12 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="lg:text-center">
                    <h2 class="text-3xl font-extrabold text-amber-800">
                        Our Specialties
                    </h2>
                </div>
                <div class="mt-10">
                    <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        <div v-for="(specialty, index) in specialties" :key="index" class="flex flex-col items-center">
                            <div class="flex items-center justify-center h-20 w-20 rounded-md bg-amber-500 text-white">
                                <component :is="specialty.icon" class="h-10 w-10" aria-hidden="true" />
                            </div>
                            <h3 class="mt-4 text-xl font-medium text-gray-900">
                                {{ specialty.name }}
                            </h3>
                            <p class="mt-2 text-center text-gray-600">
                                {{ specialty.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
