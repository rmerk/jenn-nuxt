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
    <footer class="border-t-2 border-solid border-b-olive-600 bg-olive-800">
        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div class="xl:grid xl:grid-cols-2 xl:gap-8">
                <!-- Left Section -->
                <div class="grid w-full grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <p class="text-primary-200 font-semibold">
                            Visit Us
                        </p>
                        <div class="mt-4 space-y-1">
                            <p class="text-white">
                                123 Bakery Street
                            </p>
                            <p class="text-white">
                                Sweet Town, ST 12345
                            </p>
                        </div>
                    </div>
                    <div>
                        <p class="text-primary-200 font-semibold">
                            Hours
                        </p>
                        <div class="mt-4 space-y-1">
                            <p class="text-white">
                                Mon-Fri: 7am - 7pm
                            </p>
                            <p class="text-white">
                                Sat-Sun: 8am - 5pm
                            </p>
                        </div>
                    </div>
                    <div>
                        <p class="text-primary-200 font-semibold">
                            Contact
                        </p>
                        <div class="mt-4 space-y-1">
                            <p class="text-white">
                                Phone: (555) 123-4567
                            </p>
                            <p class="text-white">
                                Email: hello@sweetdelights.com
                            </p>
                        </div>
                    </div>
                    <div>
                        <p class="text-primary-200 font-semibold">
                            Account
                        </p>
                        <div class="mt-4 space-y-2">
                            <template v-if="authStore.isAuthenticated">
                                <div>
                                    <NuxtLink to="/account" class="hover:text-primary-600 text-white">
                                        Your Account
                                    </NuxtLink>
                                </div>
                                <div v-if="authStore.isAdmin">
                                    <NuxtLink
                                        to="/admin"
                                        class="hover:text-primary-600 text-white"
                                    >
                                        Admin Dashboard
                                    </NuxtLink>
                                </div>
                                <div>
                                    <UButton
                                        color="primary"
                                        variant="ghost"
                                        class="hover:text-primary-600 text-white"
                                        @click="handleLogout"
                                    >
                                        Sign out
                                    </UButton>
                                </div>
                            </template>
                            <template v-else>
                                <div>
                                    <NuxtLink to="/login" class="hover:text-primary-600 text-white">
                                        Sign in
                                    </NuxtLink>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <!-- Right Section -->
                <div class="mt-8 xl:mt-0">
                    <div class="flex items-center justify-end">
                        <p class="text-sm text-white">
                            &copy; {{ new Date().getFullYear() }} Sweet Delights Bakery. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
