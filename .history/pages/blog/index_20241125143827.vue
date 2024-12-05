<template>
  <div class="bg-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-amber-800">Our Blog</h1>
        <p class="mt-4 text-xl text-gray-600">Latest recipes, baking tips, and bakery news</p>
      </div>

      <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="post in posts" :key="post.id" class="flex flex-col overflow-hidden rounded-lg shadow-lg">
          <div class="flex-shrink-0">
            <img class="h-48 w-full object-cover" :src="post.image" :alt="post.title">
          </div>
          <div class="flex flex-1 flex-col justify-between bg-white p-6">
            <div class="flex-1">
              <p class="text-sm font-medium text-amber-600">
                {{ post.category }}
              </p>
              <NuxtLink :to="'/blog/' + post.id" class="mt-2 block">
                <p class="text-xl font-semibold text-gray-900">{{ post.title }}</p>
                <p class="mt-3 text-base text-gray-500">{{ post.excerpt }}</p>
              </NuxtLink>
            </div>
            <div class="mt-6 flex items-center">
              <div class="flex-shrink-0">
                <span class="sr-only">{{ post.author }}</span>
                <img class="h-10 w-10 rounded-full" :src="post.authorImage" :alt="post.author">
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{{ post.author }}</p>
                <div class="flex space-x-1 text-sm text-gray-500">
                  <time :datetime="post.date">{{ post.date }}</time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { find } = useStrapi()

const { data: posts } = await useAsyncData('articles',
  () => find('articles', {
    populate: '*',
    sort: ['publishedAt:desc']
  })
)
</script>