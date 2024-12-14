<template>
    <section class="flex flex-col" style="min-height: calc(100vh - 4rem)">
        <div class="relative flex grow flex-col justify-center bg-green-900 text-white">
            <div class="absolute bottom-[30%] right-[5%] p-8">
                <p class="max-w-xs text-sm">
                    A delightful treat that combines the comforting charm of freshly baked cookies with the rich, luxurious and mouthwatering fillings.
                </p>
                <a href="#" class="mt-2 inline-block text-sm underline">
                    Get more details <i class="fas fa-arrow-right" />
                </a>
            </div>
            <div class="absolute bottom-[10%] left-[15%] p-8">
                <div class="flex items-center">
                    <img
                        src="/female-avatar.png"
                        alt="Sourdough logo"
                        class="size-32 rounded-full"
                    >
                </div>
            </div>
            <div class="hero-image">
                <img
                    src="/sourdough-hero-image.webp"
                    alt="Stack of freshly bakes cookies with ice cream"
                    class="h-auto max-w-5xl object-contain"
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
