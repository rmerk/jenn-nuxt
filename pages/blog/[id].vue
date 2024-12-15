<script setup lang="ts">
import type { Article } from '~/types/collections';

const route = useRoute();
const { findOne } = useStrapi();

const { data: article } = await useAsyncData(
    'articles',
    () => findOne<Article>('articles', route.params.id as string, { populate: { author: { populate: 'avatar' } } }),
);
</script>

<template>
    <div class="bg-white py-12">
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div v-if="article">
                <h1 class="text-primary text-3xl font-extrabold">
                    {{ article.data.title }}
                </h1>

                <div class="mt-6 flex items-center">
                    <div class="shrink-0">
                        <img
                            class="size-10 rounded-full"
                            :src="getStrapiURL(article.data.author?.avatar?.url)"
                            :alt="article.data.author?.name"
                        >
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">
                            {{ article.data.author?.name }}
                        </p>
                        <div class="flex space-x-1 text-sm text-gray-500">
                            <time v-if="article.data.publishedAt" :datetime="new Date(article.data.publishedAt).toISOString()">
                                {{ article.data.publishedAt }}
                            </time>
                        </div>
                    </div>
                </div>

                <div class="mt-8">
                    <img
                        v-if="article.data.cover?.url"
                        :src="getStrapiURL(article.data.cover.url)"
                        :alt="article.data.cover.caption"
                        class="h-96 w-full rounded-lg object-cover"
                    >
                </div>

                <div class="prose prose-primary prose-lg mt-8 max-w-none">
                    {{ article.data.description }}
                </div>
            </div>
        </div>
    </div>
</template>
