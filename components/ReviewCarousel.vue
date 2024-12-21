<script setup lang="ts">
const currentReview = ref(0);

// Example review data
const reviews = [
    {
        quote: 'Ice cream deluxe cookie from Bakerville. An absolute delight! It\'s a heavenly combination of creamy ice cream nestled between two perfectly baked cookies.',
        description: 'Our customer ranges from school-playing kids to retirees, uniting diverse individuals in the joy of savoring our delicious baked goods.',
        title: 'Mother Loaf Sourdough Bread',
        image: 'sourdough-review.png',
    },
    {
        quote: 'The best sourdough bread I\'ve ever tasted! Perfect crust and a soft, chewy center.',
        description: 'Our passion for baking brings joy to homes across the country.',
        title: 'Hearth Baked Focaccia Bread',
        image: 'focaccia-review.png',
    },
];

// Navigation handlers
function nextReview() {
    currentReview.value = (currentReview.value + 1) % reviews.length;
}

function prevReview() {
    currentReview.value = (currentReview.value - 1 + reviews.length) % reviews.length;
}
</script>

<template>
    <section class="bg-cream py-32">
        <div class="relative mx-auto max-w-7xl rounded-lg bg-cream px-4 py-8 md:px-16">
            <h1
                class="absolute inset-x-0 top-0 w-8/12 justify-self-center
            text-center text-8xl"
            >
                {{ reviews[currentReview].title }}
            </h1>
            <div
                class="absolute right-[400px] top-72 z-20 flex items-center
            rounded-full bg-white p-4"
            >
                <UIcon
                    name="material-symbols-light:format-quote-rounded"
                    class="text-5xl text-black"
                />
            </div>
            <img
                :src="`/${reviews[currentReview].image}`"
                alt="Bakerville Bakery"
                class="relative z-10 mb-8 mt-32 max-w-[400px] justify-self-center
            rounded-lg object-cover"
            >
            <!-- Review Content -->
            <div class="flex min-h-52 flex-col items-center gap-6 md:flex-row">
                <!-- Profile Image -->
                <div class="shrink-0">
                    <UAvatar
                        size="xl"
                        src="/female-avatar.png"
                        alt="Profile Image"
                        class="size-24"
                    />
                </div>

                <!-- Review Text -->
                <div class="flex-1 text-center md:text-left">
                    <p class="text-lg font-medium leading-relaxed text-gray-800 md:text-xl">
                        "{{ reviews[currentReview].quote }}"
                    </p>
                    <p class="mt-4 text-lg text-gray-500">
                        {{ reviews[currentReview].description }}
                    </p>
                </div>

                <!-- Navigation Buttons -->
                <div class="flex gap-4">
                    <!-- Left Arrow -->
                    <UButton
                        size="sm"
                        rounded
                        color="black"
                        variant="outline"
                        class="flex items-center justify-center p-[15px] md:hover:shadow-lg"
                        :ui="{ rounded: 'rounded-full' }"
                        @click="prevReview"
                    >
                        <UIcon
                            name="material-symbols-light:arrow-left-alt"
                            class="text-lg"
                        />
                    </UButton>
                    <!-- Right Arrow -->
                    <UButton
                        size="sm"
                        rounded
                        color="black"
                        variant="outline"
                        class="flex items-center justify-center p-[15px] md:hover:shadow-lg"
                        :ui="{ rounded: 'rounded-full' }"
                        @click="nextReview"
                    >
                        <UIcon
                            name="material-symbols-light:arrow-right-alt"
                            class="text-lg text-black"
                        />
                    </UButton>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Optional: Smooth transition between reviews */
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>
