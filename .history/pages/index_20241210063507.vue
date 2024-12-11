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
    <main class="py-10 md:py-20">
        <HeroSection />
        <ProductsSection />
    </main>
</template>
