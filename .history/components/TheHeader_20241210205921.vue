<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import ShoppingCart from '~/components/ShoppingCart.vue';

const toast = useToast();

const authStore = useAuthStore();
const router = useRouter();

const isUserMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);

const navigationLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/shop', label: 'Shop' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
];

async function handleLogout() {
    try {
        await authStore.logout();
        isUserMenuOpen.value = false;
        toast.add({
            description: 'You have been signed out.',
            color: 'green',
        });
        router.push('/');
    }
    catch (error) {
        const err = error as Error;
        toast.add({
            description: err.message,
            color: 'red',
        });
    }
}

onMounted(() => {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            isUserMenuOpen.value = false;
            isMobileMenuOpen.value = false;
        }
    });
});
</script>

<template>
    <header class="bg-white border-b border-gray-200">
        <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <NuxtLink to="/" class="text-2xl font-bold text-primary">
                        Sweet Delights
                    </NuxtLink>
                </div>

                <!-- Navigation Links -->
                <div class="hidden md:flex md:space-x-8">
                    <NuxtLink
                        v-for="link in navigationLinks"
                        :key="link.to"
                        :to="link.to"
                        class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-amber-600 hover:border-amber-500"
                    >
                        {{ link.label }}
                    </NuxtLink>
                </div>

                <!-- Right Section -->
                <div class="flex items-center gap-4">
                    <ShoppingCart />
                    <template v-if="authStore.isAuthenticated">
                        <div class="relative ml-3">
                            <UButton
                                color="primary"
                                variant="ghost"
                                class="flex rounded-full"
                                @click="isUserMenuOpen = !isUserMenuOpen"
                            >
                                <span class="sr-only">Open user menu</span>
                                <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </UButton>

                            <!-- User Dropdown Menu -->
                            <div
                                v-if="isUserMenuOpen"
                                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                                @click="isUserMenuOpen = false"
                            >
                                <NuxtLink
                                    to="/account"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Your Account
                                </NuxtLink>
                                <NuxtLink
                                    v-if="authStore.isAdmin"
                                    to="/admin"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Admin Dashboard
                                </NuxtLink>
                                <UButton
                                    color="gray"
                                    variant="ghost"
                                    class="w-full text-left px-4 py-2 text-sm"
                                    @click="handleLogout"
                                >
                                    Sign out
                                </UButton>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <NuxtLink
                            to="/login"
                            class="text-sm font-medium text-gray-700 hover:text-amber-600"
                        >
                            Sign in
                        </NuxtLink>
                    </template>
                </div>

                <!-- Mobile menu button -->
                <div class="flex items-center md:hidden">
                    <UButton
                        color="gray"
                        variant="ghost"
                        class="inline-flex items-center justify-center rounded-md p-2"
                        @click="isMobileMenuOpen = !isMobileMenuOpen"
                    >
                        <span class="sr-only">Open main menu</span>
                        <svg
                            class="h-6 w-6" :class="[isMobileMenuOpen ? 'hidden' : 'block']"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg
                            class="h-6 w-6" :class="[isMobileMenuOpen ? 'block' : 'hidden']"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </UButton>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div class="md:hidden" :class="[isMobileMenuOpen ? 'block' : 'hidden']">
                <div class="space-y-1 pb-3 pt-2">
                    <NuxtLink
                        v-for="link in navigationLinks"
                        :key="link.to"
                        :to="link.to"
                        class="block py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-600"
                        @click="isMobileMenuOpen = false"
                    >
                        {{ link.label }}
                    </NuxtLink>
                </div>
            </div>
        </nav>
    </header>

    <section>
        <div class="py-1 text-center text-sm border-b border-gray-100">
            <p class="font-medium text-darkBlueGray-300 leading-10">
                <span>Hello, you are new here.</span>
                <span class="text-darkBlueGray-900">Get 20% off card!</span>
            </p>
        </div>
        <div class="pb-10">
            <div class="relative bg-blueGray-100 rounded-b-10xl overflow-hidden">
                <img class="hidden lg:block absolute top-0 right-0 w-1/2 h-full py-20" src="/sourdoughBread.jpg" alt="">
                <div class="container px-4 mx-auto">
                    <div class="relative flex flex-wrap -mx-4 py-24 xl:pt-36 xl:pb-20">
                        <div class="w-full lg:w-auto max-w-max px-4">
                            <span class="block mb-9 font-medium tracking-widest uppercase text-xs text-gray-300">New week</span>
                            <h1 class="max-w-xl mb-16 font-heading font-medium text-9xl md:text-10xl xl:text-11xl leading-tight">
                                A thousand products for you
                            </h1>
                            <a class="inline-block py-4 px-10 mb-16 xl:mb-28 leading-8 font-heading font-medium tracking-tighter text-xl text-white text-center bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-xl" href="#">Shop now</a>
                            <img class="lg:hidden" src="/sourdoughBread.jpg" alt="">
                            <div class="relative max-w-max mx-auto md:mx-0">
                                <div class="relative flex flex-wrap justify-between bg-white rounded-5xl overflow-hidden z-10">
                                    <div class="w-full md:w-2/3 p-7 md:px-16 md:py-0 my-auto">
                                        <span class="block mb-2 font-medium tracking-widest uppercase text-xs text-gray-300">New week</span>
                                        <h3 class="mb-3 font-heading text-3xl md:text-5xl leading-tighter">
                                            New headphones
                                        </h3>
                                        <div class="flex items-center gap-3">
                                            <a class="inline-block font-heading text-lg text-purple-500 hover:text-purple-600 leading-tighter" href="#">Discover</a>
                                        </div>
                                    </div>
                                    <div class="w-full md:w-1/4">
                                        <img class="w-full h-28 md:h-auto object-cover" src="/sourdoughBread.jpg" alt="">
                                    </div>
                                </div>
                                <div class="absolute bottom-0 left-0 -mb-3 w-full px-5">
                                    <div class="w-full h-20 bg-white bg-opacity-50 rounded-5xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
