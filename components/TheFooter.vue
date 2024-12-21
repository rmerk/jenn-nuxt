<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const toast = useToast();
const authStore = useAuthStore();
const router = useRouter();

async function handleLogout() {
    try {
        await authStore.logout();
        toast.add({
            color: 'green',
            description: 'You have been signed out.',
        });
        router.push('/');
    }
    catch (error) {
        const err = error as Error;
        toast.add({
            color: 'red',
            description: err.message,
        });
    }
}
</script>

<template>
    <footer class="bg-cream">
        <!-- Border accent -->
        <div class="flex items-center">
            <div class="flex-1 border-t border-gray-400" />
            <UIcon
                name="material-symbols-light:asterisk"
                class="mx-2 text-gray-500"
                size="18"
            />
            <div class="flex-1 border-t border-gray-400" />
        </div>

        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div class="xl:grid xl:grid-cols-2 xl:gap-8">
                <!-- Left Section -->
                <div class="grid w-full grid-cols-1 md:grid-cols-2">
                    <div>
                        <h6 class="text-primary">
                            Contact
                        </h6>
                        <div class="mt-4 space-y-1">
                            <p class="text-black">
                                <a href="tel:+16122127826">
                                    Phone: (612) 212-7826
                                </a>
                            </p>
                            <p class="text-black">
                                Email: hello@sweetdelights.com
                            </p>
                        </div>
                    </div>
                    <div>
                        <h6 class="text-primary">
                            Account
                        </h6>
                        <div class="mt-4 space-y-2">
                            <template v-if="authStore.isAuthenticated">
                                <div>
                                    <NuxtLink to="/account" class="hover:text-primary-600 text-black">
                                        Your Account
                                    </NuxtLink>
                                </div>
                                <div v-if="authStore.isAdmin">
                                    <NuxtLink
                                        to="/admin"
                                        class="text-black"
                                    >
                                        Admin Dashboard
                                    </NuxtLink>
                                </div>
                                <div>
                                    <UButton
                                        color="primary"
                                        variant="ghost"
                                        class="text-lg text-black"
                                        @click="handleLogout"
                                    >
                                        Sign out
                                    </UButton>
                                </div>
                            </template>
                            <template v-else>
                                <div>
                                    <NuxtLink
                                        to="/login"
                                        class="text-lg text-black"
                                    >
                                        Sign in
                                    </NuxtLink>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <!-- Right Section -->
                <div class="mt-8 flex items-end justify-end xl:mt-0">
                    <div class="flex items-center justify-end">
                        <p class="text-sm text-black">
                            &copy; {{ new Date().getFullYear() }} Sweet Delights Bakery. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
