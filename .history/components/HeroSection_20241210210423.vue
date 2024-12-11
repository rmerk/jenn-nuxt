<template>
    <section class="relative bg-white py-10 md:py-32">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="text-center md:text-left">
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
            <div class="flex justify-center">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Fresh baked bread"
                    class="w-full max-w-lg rounded-full object-cover shadow-xl"
                >
            </div>
        </div>
    </section>
</template>
