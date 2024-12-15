<template>
    <section class="flex flex-col" style="min-height: calc(100vh - 4rem)">
        <div class="relative flex grow flex-col justify-center bg-transparent text-white">
            <div class="absolute bottom-[22%] right-[5%] z-10 p-8">
                <p class="max-w-xs text-lg">
                    Experience the warm, irresistible aroma of fresh-baked
                    sourdough! Crafted with care, every loaf is a perfect blend
                    of crisp crust and soft, tangy goodness. Order yours today
                    and taste the difference!
                </p>
                <ULink
                    to="/shop"
                    class="mt-4 items-center text-lg text-white underline"
                >
                    Buy yours today! <UIcon
                        name="i-material-symbols-light:arrow-outward-rounded"
                        class="mx-1"
                    />
                </ULink>
            </div>
            <div class="absolute bottom-[20%] left-[15%] p-8">
                <div class="flex items-center">
                    <img
                        src="/best-sourdough.svg"
                        alt="Sourdough logo"
                        class="size-40 rounded-full"
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
