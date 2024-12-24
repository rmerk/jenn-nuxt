<template>
    <section class="flex flex-col" style="min-height: calc(100vh - 4rem)">
        <div class="relative flex grow flex-col justify-center bg-transparent text-white">
            <div class="hero-image">
                <img
                    src="/sourdough-hero-image.webp"
                    alt="Stack of freshly bakes cookies with ice cream"
                    class="h-auto object-contain md:max-w-5xl"
                >
            </div>
            <div class="white-bar md:block" />

            <div class="z-10 mt-10 bg-cream p-8 text-black md:absolute md:bottom-[22%] md:right-[5%] md:mt-0 md:bg-transparent md:text-white">
                <p class="text-lg md:max-w-xs">
                    Experience the warm, irresistible aroma of fresh-baked
                    sourdough! Crafted with care, every loaf is a perfect blend
                    of crisp crust and soft, tangy goodness. Order yours today
                    and taste the difference!
                </p>
                <ULink
                    to="/shop"
                    class="mt-4 items-center text-lg text-black underline md:text-white"
                >
                    Buy yours today!
                    <UIcon
                        name="i-material-symbols-light:arrow-outward-rounded"
                        class="mx-1"
                    />
                </ULink>
            </div>

            <div class="hidden p-8 md:absolute md:bottom-[20%] md:left-[15%] md:block">
                <div class="flex items-center">
                    <img
                        src="/best-sourdough.svg"
                        alt="Sourdough logo"
                        class="size-40 rounded-full"
                    >
                </div>
            </div>
        </div>

        <div class="white-bar hidden md:block" />
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
    bottom: 0;
}

@media (min-width: 1024px) {
    .hero-image {
        bottom: 140px;
        left: 0;
        right: 0;
        margin-inline: auto;
        width: fit-content;
    }
}
</style>
