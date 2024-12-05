<template>
  <div class="bg-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-amber-800">Our Gallery</h1>
        <p class="mt-4 text-xl text-gray-600">A collection of our finest creations</p>
      </div>

      <!-- Filter Categories -->
      <div class="mt-8 flex justify-center space-x-4">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium',
            selectedCategory === category
              ? 'bg-amber-600 text-white'
              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Image Grid -->
      <div class="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="image in filteredImages"
          :key="image.id"
          class="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
          @click="openLightbox(image)"
        >
          <img
            :src="image.url"
            :alt="image.title"
            class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300">
            <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 class="text-lg font-semibold text-white">{{ image.title }}</h3>
              <p class="text-sm text-white">{{ image.description }}</p>
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
        <div class="relative max-w-4xl max-h-[90vh] mx-4">
          <img
            :src="selectedImage.url"
            :alt="selectedImage.title"
            class="max-h-[90vh] w-auto"
          >
          <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
            <h3 class="text-xl font-semibold">{{ selectedImage.title }}</h3>
            <p class="mt-2">{{ selectedImage.description }}</p>
          </div>
          <button
            class="absolute top-4 right-4 text-white hover:text-amber-500"
            @click.stop="selectedImage = null"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { find } = useStrapi()

// Fetch gallery images from Strapi
const { data: images } = await useAsyncData('gallery-images',
  () => find('gallery-images', {
    populate: '*',
    sort: ['createdAt:desc']
  })
)

// State management
const selectedCategory = ref('All')
const selectedImage = ref(null)

// Get unique categories from images
const categories = computed(() => {
  const uniqueCategories = new Set(images.value?.map(image => image.category) || [])
  return ['All', ...Array.from(uniqueCategories)]
})

// Filter images by selected category
const filteredImages = computed(() => {
  if (!images.value) return []
  if (selectedCategory.value === 'All') return images.value
  return images.value.filter(image => image.category === selectedCategory.value)
})

// Lightbox controls
const openLightbox = (image) => {
  selectedImage.value = image
}
</script>