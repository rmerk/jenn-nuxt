<template>
    <section class="relative bg-white">
        <UiPageContainer class="py-24">
            <div class="max-w-3xl mx-auto text-center">
                <h1 class="text-4xl font-serif font-bold text-gray-900 sm:text-5xl md:text-6xl">
                    We bake tasty bread
                </h1>
                <p class="mt-4 text-lg text-gray-600">
                    Fresh bread crafted using natural ingredients with free delivering at your home
                </p>
                <div class="mt-8">
                    <UButton
                        size="xl"
                        color="amber"
                        variant="solid"
                        to="/menu"
                        class="w-full sm:w-auto"
                    >
                        Order bread
                    </UButton>
                </div>
            </div>
            <div class="mt-16 flex justify-center">
                <img
                    src="/sourdoughBread.jpg"
                    alt="Fresh baked bread"
                    class="w-full max-w-lg rounded-full object-cover shadow-xl"
                >
            </div>
        </UiPageContainer>
    </section>
</template>
