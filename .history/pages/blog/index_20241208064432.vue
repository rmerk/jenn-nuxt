<script setup lang="ts">
import type { Article } from '~/types/collections';

const { find } = useStrapi();
const { data: articles } = useAsyncData(
    'articles',
    () => find<Article>('articles', {
        sort: 'publishedAt:desc',
        populate: '*',
    }),
);
</script>

<template>
    <div class="bg-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h1 class="text-3xl font-extrabold text-amber-800">
                    Our Blog
                </h1>
                <p class="mt-4 text-xl text-gray-600">
                    Latest recipes, baking tips, and
                    bakery news
                </p>
            </div>
            <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="article in articles?.data"
                    :key="article.id"
                    class="flex flex-col overflow-hidden rounded-lg shadow-lg"
                >
                    <div class="flex-shrink-0">
                        <img
                            class="h-48 w-full object-cover"
                            :src="article?.cover?.url"
                            :alt="article.title"
                        >
                    </div>
                    <div class="flex flex-1 flex-col justify-between bg-white p-6">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-amber-600">
                                {{
                                    article?.category?.name
                                }}
                            </p>
                            <NuxtLink
                                :to="`/blog/${article.id}`"
                                class="mt-2 block"
                            >
                                <p class="text-xl font-semibold text-gray-900">
                                    {{ article.title
                                    }}
                                </p>
                                <p class="mt-3 text-base text-gray-500">
                                    {{ article.description }}
                                </p>
                            </NuxtLink>
                        </div>
                        <div class="mt-6 flex items-center">
                            <div class="flex-shrink-0">
                                <span class="sr-only">{{ article.author }}</span>
                                <img
                                    class="h-10 w-10 rounded-full"
                                    :src="article?.cover?.formats.thumbnail.url"
                                    :alt="article?.cover?.alternativeText"
                                >
                            </div>
                            <div class="ml-3">
                                <p class="text-sm font-medium text-gray-900">
                                    {{ article.author.name }}
                                </p>
                                <div class="flex space-x-1 text-sm text-gray-500">
                                    <time :datetime="article.createdAt?.toLocaleString()">{{ article.createdAt }}</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
