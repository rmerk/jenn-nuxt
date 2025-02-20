<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import ShoppingCart from '~/components/ShoppingCart.vue';

const route = useRoute();

const toast = useToast();

const authStore = useAuthStore();
const router = useRouter();

const isUserMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);

const navigationLinks = [
    { to: '/', label: 'Home', icon: 'heroicons-outline:home' },
    { to: '/shop', label: 'Shop', icon: 'heroicons-outline:shopping-cart' },
    { to: '/gallery', label: 'Gallery', icon: 'heroicons-outline:photo' },
    { to: '/blog', label: 'Blog', icon: 'heroicons-outline:newspaper' },
    { to: '/contact', label: 'Contact', icon: 'heroicons-outline:phone-outgoing' },
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
    <header class="relative h-[80px]">
        <nav class="h-inherit mx-auto max-w-7xl">
            <div class="h-inherit flex items-center justify-between px-4 sm:px-6 lg:px-8">
                <!-- Logo -->
                <div class="shrink-0">
                    <NuxtLink to="/" class="text-2xl font-bold text-white">
                        Sweet Delights
                    </NuxtLink>
                </div>

                <!-- Navigation Links -->
                <div class="hidden md:flex md:space-x-8">
                    <NuxtLink
                        v-for="link in navigationLinks"
                        :key="link.to"
                        :to="link.to"
                        class="inline-flex items-center px-1 pt-1 text-lg
                         text-white hover:text-customPrimary-300"
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
                                color="white"
                                variant="ghost"
                                class="flex rounded-full"
                                @click="isUserMenuOpen = !isUserMenuOpen"
                            >
                                <span class="sr-only">
                                    Open user menu
                                </span>
                                <div class="flex size-8 items-center justify-center rounded-full bg-gray-200">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="size-5 text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </UButton>

                            <!-- User Dropdown Menu -->
                            <div
                                v-if="isUserMenuOpen"
                                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg"
                                @click="isUserMenuOpen = false"
                            >
                                <NuxtLink
                                    to="/account"
                                    class="block px-4 py-2 text-lg text-white"
                                >
                                    Your Account
                                </NuxtLink>

                                <NuxtLink
                                    v-if="authStore.isAdmin"
                                    to="/admin"
                                    class="block px-4 py-2 text-lg text-white"
                                >
                                    Admin Dashboard
                                </NuxtLink>

                                <UButton
                                    color="gray"
                                    variant="ghost"
                                    class="w-full px-4 py-2 text-left text-lg"
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
                            class="text-lg text-white"
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
                        <span class="sr-only">
                            Open main menu
                        </span>
                        <svg
                            class="size-6"
                            :class="[isMobileMenuOpen ? 'hidden' : 'block']"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                        <svg
                            class="size-6"
                            :class="[isMobileMenuOpen ? 'block' : 'hidden']"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </UButton>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div class="md:hidden" :class="[isMobileMenuOpen ? 'block' : 'hidden']">
                <div class="space-y-1 bg-olive-600 px-6 py-4">
                    <NuxtLink
                        v-for="link in navigationLinks"
                        :key="link.to"
                        :to="link.to"
                        class="block py-2 text-lg text-white"
                        @click="isMobileMenuOpen = false"
                    >
                        <div class="flex items-center gap-3">
                            <UIcon :name="link.icon" />
                            {{ link.label }}
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </nav>
        <UDivider
            v-if="route.path === '/'"
            type="solid"
            :ui="{ border: { base: 'border-olive-600' } }"
            class="absolute bottom-[-15px]"
        >
            <UIcon
                name="material-symbols-light:asterisk"
                class="text-olive"
            />
        </UDivider>
    </header>
</template>

<style scoped>
.h-inherit {
    height: inherit;
}
</style>
