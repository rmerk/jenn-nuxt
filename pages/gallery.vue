<script setup lang="ts">
import type { Gallery, Media } from '~/types/collections';

const { find } = useStrapi();

// Fetch gallery images from Strapi
const { data } = await useAsyncData(
    'gallery',
    () => find<Gallery>('galleries', { populate: '*' }),
);

const gallery = ref(data?.value?.data);

if (!gallery.value) {
    gallery.value = [];
}

// State management
const selectedCategory = ref<string | number>('All');
// const selectedImage = ref(null);

// Get unique categories from images
const categories = computed(() => {
    const uniqueCategories = new Set(gallery.value?.flatMap(image => image.category || []));
    return [{ id: 'All', name: 'All' }, ...Array.from(uniqueCategories)];
});

// Filter images by selected category
const filteredImages = computed(() => {
    if (!gallery.value?.length)
        return [];

    const filteredImages = gallery.value[0]?.category?.name === selectedCategory.value
        ? gallery.value.filter(uploads => uploads.category === selectedCategory.value)[0].images
        : [];

    const currentImagesWithUpdatedUrls = selectedCategory.value === 'All' ? gallery.value[0].images : filteredImages;
    return currentImagesWithUpdatedUrls?.map(image => ({
        ...image,
        url: STRAPI_URL + image.url,
    }));
});

// Lightbox
const visibleRef = ref(false);
const indexRef = ref(0);

function showImg(index = 0) {
    indexRef.value = index;
    visibleRef.value = true;
}
const onHide = () => (visibleRef.value = false);
</script>

<template>
    <div class="bg-cream py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h1>
                    Our Gallery
                </h1>
                <p class="mt-4 text-xl text-gray-600">
                    A collection of our finest creations
                </p>
            </div>

            <!-- Filter Categories -->
            <div v-if="categories?.length > 0" class="mt-8 flex justify-center space-x-4">
                <UButton
                    v-for="category in categories"
                    :key="category?.id as number"
                    class="text-lg"
                    @click="selectedCategory = category.name ?? 'All'"
                >
                    <span class="capitalize">
                        {{ category.name }}
                    </span>
                </UButton>
            </div>

            <!-- Image Grid -->
            <div v-if="filteredImages" class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="(image, index) in filteredImages as Media[]"
                    :key="image.id"
                    class="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                    @click="showImg(index)"
                >
                    <img
                        :src="image.url"
                        :alt="image.alternativeText"
                        class="size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    >

                    <div class="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-30">
                        <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <h3 class="text-lg font-semibold text-white">
                                {{ image.alternativeText }}
                            </h3>
                            <p class="text-sm text-white">
                                {{ image.caption }}
                            </p>
                        </div>
                    </div>
                </div>

                <VueEasyLightbox
                    :visible="visibleRef"
                    :imgs="filteredImages.map(image => image.url)"
                    :index="indexRef"
                    @hide="onHide"
                />
            </div>
        </div>
    </div>
</template>
