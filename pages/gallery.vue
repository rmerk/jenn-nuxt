<script setup>
const { find } = useStrapi();

// Fetch gallery images from Strapi
const { data: images } = await useAsyncData('gallery-images', () => find('gallery-images', {
    populate: '*',
    sort: ['createdAt:desc'],
}));

// State management
const selectedCategory = ref('All');
const selectedImage = ref(null);

// Get unique categories from images
const categories = computed(() => {
    const uniqueCategories = new Set(images.value?.map(image => image.category) || []);
    return ['All', ...Array.from(uniqueCategories)];
});

// Filter images by selected category
const filteredImages = computed(() => {
    if (!images.value)
        return [];
    if (selectedCategory.value === 'All')
        return images.value;
    return images.value.filter(image => image.category === selectedCategory.value);
});

// Lightbox controls
function openLightbox(image) {
    selectedImage.value = image;
}
</script>

<template>
    <div class="bg-white py-12">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h1 class="text-primary text-3xl font-extrabold">
                    Our Gallery
                </h1>
                <p class="mt-4 text-xl text-gray-600">
                    A collection of our finest creations
                </p>
            </div>

            <!-- Filter Categories -->
            <div class="mt-8 flex justify-center space-x-4">
                <button
                    v-for="category in categories"
                    :key="category"
                    class="rounded-md px-4 py-2 text-sm font-medium"
                    :class="[
                        selectedCategory === category
                            ? 'bg-primary text-white'
                            : 'text-primary bg-primary hover:bg-primary',
                    ]"
                    @click="selectedCategory = category"
                >
                    {{ category }}
                </button>
            </div>

            <!-- Image Grid -->
            <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="image in filteredImages"
                    :key="image.id"
                    class="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                    @click="openLightbox(image)"
                >
                    <img
                        :src="image.url"
                        :alt="image.title"
                        class="size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    >
                    <div class="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-30">
                        <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <h3 class="text-lg font-semibold text-white">
                                {{ image.title }}
                            </h3>
                            <p class="text-sm text-white">
                                {{ image.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Lightbox -->
            <div
                v-if="selectedImage"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
                @click="selectedImage = null"
            >
                <div class="relative mx-4 max-h-[90vh] max-w-4xl">
                    <img
                        :src="selectedImage.url"
                        :alt="selectedImage.title"
                        class="max-h-[90vh] w-auto"
                    >
                    <div class="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 p-4 text-white">
                        <h3 class="text-xl font-semibold">
                            {{ selectedImage.title }}
                        </h3>
                        <p class="mt-2">
                            {{ selectedImage.description }}
                        </p>
                    </div>
                    <button
                        class="hover:text-primary absolute right-4 top-4 text-white"
                        @click.stop="selectedImage = null"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="size-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
