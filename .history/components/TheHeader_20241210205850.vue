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
        <div class="px-6 lg:px-12">
            <nav class="flex justify-between">
                <div class="flex w-full items-center py-6">
                    <div class="relative hidden xl:block">
                        <img class="absolute top-1/2 transform -translate-y-2/4 pl-6 mt-px" src="/sourdoughBread.jpg" alt="">
                        <input class="rounded-4xl py-3 pl-12 pr-5 text-gray-300 font-heading font-medium text-base bg-blue-50 border-2 border-blueGray-100 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 outline-none" style="width: 145px;">
                    </div>
                    <div class="hidden xl:block flex-shrink-0 w-px h-12 bg-gray-100 ml-12 mr-12" />
                    <div class="hidden xl:flex items-center">
                        <a class="inline-block mr-10 text-gray-400 hover:text-gray-500" href="#">
                            <svg width="23" height="21" viewbox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.4998 20.2059L2.70115 10.925C1.92859 10.1441 1.41864 9.13717 1.24355 8.04689C1.06847 6.95661 1.23713 5.83827 1.72563 4.8503V4.8503C2.09464 4.10439 2.63366 3.45781 3.29828 2.96383C3.9629 2.46985 4.73408 2.14261 5.5483 2.00908C6.36252 1.87555 7.19647 1.93955 7.98144 2.1958C8.7664 2.45205 9.47991 2.89322 10.0632 3.48296L11.4998 4.93554L12.9364 3.48296C13.5197 2.89322 14.2332 2.45205 15.0182 2.1958C15.8031 1.93955 16.6371 1.87555 17.4513 2.00908C18.2655 2.14261 19.0367 2.46985 19.7013 2.96383C20.3659 3.45781 20.905 4.10439 21.274 4.8503V4.8503C21.7625 5.83827 21.9311 6.95661 21.756 8.04689C21.581 9.13717 21.071 10.1441 20.2984 10.925L11.4998 20.2059Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>
                        <a class="relative inline-block text-gray-400 hover:text-gray-500" href="#">
                            <div class="absolute bottom-0 right-0 flex items-center justify-center -mb-4 -mr-4 w-6 h-6 text-sm text-white bg-blue-500 rounded-full">3</div>
                            <svg width="21" height="23" viewbox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.1159 8.72414H2.50427C1.99709 8.72414 1.58594 9.12657 1.58594 9.62299V21.308C1.58594 21.8045 1.99709 22.2069 2.50427 22.2069H18.1159C18.6231 22.2069 19.0342 21.8045 19.0342 21.308V9.62299C19.0342 9.12657 18.6231 8.72414 18.1159 8.72414Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6.34473 6.34483V4.9569C6.34473 3.85259 6.76252 2.79352 7.5062 2.01265C8.24988 1.23179 9.25852 0.793106 10.3102 0.793106C11.362 0.793106 12.3706 1.23179 13.1143 2.01265C13.858 2.79352 14.2758 3.85259 14.2758 4.9569V6.34483" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>
                        <div class="flex-shrink-0 w-px h-12 bg-gray-100 ml-9 mr-10" />
                        <a class="flex items-center text-darkBlueGray-400 hover:text-darkBlueGray-500" href="#">
                            <span class="font-medium">Sona</span>
                            <img class="ml-5" src="/sourdoughBread.jpg" alt="">
                            <svg class="ml-4" width="8" height="5" viewbox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.97291 0.193232C7.20854 -0.0644107 7.58938 -0.0644107 7.82328 0.193232C8.05804 0.450875 8.05978 0.867141 7.82328 1.12478L4.42529 4.80677C4.19053 5.06441 3.81056 5.06441 3.57406 4.80677L0.176073 1.12478C-0.0586909 0.868102 -0.0586909 0.450875 0.176073 0.193232C0.411706 -0.0644107 0.792544 -0.0644107 1.02644 0.193232L4.00098 3.21284L6.97291 0.193232Z" fill="currentColor" />
                            </svg>
                        </a>
                    </div>
                </div>
                <button class="navbar-burger self-center xl:hidden">
                    <svg width="25" height="16" viewbox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="25" height="2" fill="currentColor" /><rect y="14" width="25" height="2" fill="currentColor" /></svg>
                </button>
            </nav>
            <div class="navbar-menu hidden fixed top-0 left-0 bottom-0 w-5/6 max-w-md z-50">
                <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80" />
                <nav class="relative flex flex-col py-20 px-12 md:pl-18 md:pr-16 h-full w-full bg-darkBlueGray-700 overflow-y-auto">
                    <button class="navbar-close absolute top-5 p-6 right-5">
                        <svg width="14" height="13" viewbox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="13.495" y1="0.494975" x2="1.49498" y2="12.495" stroke="#326BFF" stroke-width="1.4" /><line x1="12.505" y1="12.495" x2="0.505026" y2="0.494976" stroke="#326BFF" stroke-width="1.4" /></svg>
                    </button>
                    <span class="mb-6 text-xs text-darkBlueGray-300 font-medium uppercase tracking-wider">Discover Uistore</span>
                    <ul class="mb-20">
                        <li class="mb-2 md:mb-0">
                            <a class="text-2xl md:text-9xl text-white hover:text-darkBlueGray-100 font-medium font-heading" href="#">Products</a>
                        </li>
                        <li class="mb-2 md:mb-0">
                            <a class="text-2xl md:text-9xl text-white hover:text-darkBlueGray-100 font-medium font-heading" href="#">New in</a>
                        </li>
                        <li class="mb-2 md:mb-0">
                            <a class="text-2xl md:text-9xl text-white hover:text-darkBlueGray-100 font-medium font-heading" href="#">Sale</a>
                        </li>
                        <li class="mb-2 md:mb-0">
                            <a class="text-2xl md:text-9xl text-white hover:text-darkBlueGray-100 font-medium font-heading" href="#">Stories</a>
                        </li>
                        <li><a class="text-2xl md:text-9xl text-white hover:text-darkBlueGray-100 font-medium font-heading" href="#">Contact</a></li>
                    </ul>
                    <ul class="mb-12 flex-1">
                        <li class="mb-5">
                            <a class="text-xl text-blue-500 hover:text-blue-400 font-heading" href="#">Facebook</a>
                        </li>
                        <li class="mb-5">
                            <a class="text-xl text-blue-500 hover:text-blue-400 font-heading" href="#">Instagram</a>
                        </li>
                        <li><a class="text-xl text-blue-500 hover:text-blue-400 font-heading" href="#">Twitter</a></li>
                    </ul>
                    <a class="block w-full py-4 px-10 text-lg text-white font-heading font-medium tracking-tighter text-center bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-xl" href="#">Sign in</a>
                </nav>
            </div>
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
