<template>
    <section class="flex flex-col" style="min-height: calc(100vh - 4rem)">
        <div class="relative flex grow flex-col justify-center bg-green-900 text-white">
            <div class="absolute right-0 top-0 p-8">
                <p class="max-w-xs text-sm">
                    A delightful treat that combines the comforting charm of freshly baked cookies with the rich, luxurious and mouthwatering fillings.
                </p>
                <a href="#" class="mt-2 inline-block text-sm underline">
                    Get more details <i class="fas fa-arrow-right" />
                </a>
            </div>
            <div class="absolute bottom-0 left-0 p-8">
                <div class="flex items-center">
                    <div class="rounded-full border border-white p-2">
                        <span class="text-xs">
                            BEST SELLER
                        </span>
                    </div>
                </div>
            </div>
            <div class="hero-image">
                <img
                    src="/sourdough-hero-image.webp"
                    alt="Stack of freshly bakes cookies with ice cream"
                    class="h-auto max-w-4xl object-contain"
                >
            </div>
        </div>
        <div class="white-bar" />
    </section>
</template>

<style scoped>
.white-bar {
    height: 25vh;
    background-color: #f6f2ee;
    width: 100%;
}

.hero-image {
    position: absolute;
    bottom: -140px;
    left: 0;
    right: 0;
    margin-inline: auto;
    width: fit-content;
}
</style>
