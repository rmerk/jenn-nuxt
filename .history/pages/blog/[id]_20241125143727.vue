<template>
  <div class="bg-white py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="post">
        <h1 class="text-3xl font-extrabold text-amber-800">{{ post.title }}</h1>

        <div class="mt-6 flex items-center">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="post.authorImage" :alt="post.author">
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-900">{{ post.author }}</p>
            <div class="flex space-x-1 text-sm text-gray-500">
              <time :datetime="post.date">{{ post.date }}</time>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <img
            v-if="post.image"
            :src="post.image"
            :alt="post.title"
            class="w-full h-96 object-cover rounded-lg"
          >
        </div>

        <div class="mt-8 prose prose-amber prose-lg max-w-none">
          {{ post.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { findOne } = useStrapi()

const { data: articles } = await useAsyncData(
  'article',
  () => findOne('articles', route.params.id, {
    populate: '*'
  })
)
</script>