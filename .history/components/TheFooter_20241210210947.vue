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
    <footer class="bg-customPrimary-950">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div class="xl:grid xl:grid-cols-2 xl:gap-8">
                <!-- Left Section -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
                    <div>
                        <p class="font-semibold text-primary">
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
                        <p class="font-semibold text-amber-800">
                            Hours
                        </p>
                        <div class="mt-4 space-y-1">
                            <p class="text-gray-600">
                                Mon-Fri: 7am - 7pm
                            </p>
                            <p class="text-gray-600">
                                Sat-Sun: 8am - 5pm
                            </p>
                        </div>
                    </div>
                    <div>
                        <p class="font-semibold text-amber-800">
                            Contact
                        </p>
                        <div class="mt-4 space-y-1">
                            <p class="text-gray-600">
                                Phone: (555) 123-4567
                            </p>
                            <p class="text-gray-600">
                                Email: hello@sweetdelights.com
                            </p>
                        </div>
                    </div>
                    <div>
                        <p class="font-semibold text-amber-800">
                            Account
                        </p>
                        <div class="mt-4 space-y-2">
                            <template v-if="authStore.isAuthenticated">
                                <div>
                                    <NuxtLink to="/account" class="text-gray-600 hover:text-amber-600">
                                        Your Account
                                    </NuxtLink>
                                </div>
                                <div v-if="authStore.isAdmin">
                                    <NuxtLink to="/admin" class="text-gray-600 hover:text-amber-600">
                                        Admin Dashboard
                                    </NuxtLink>
                                </div>
                                <div>
                                    <UButton
                                        color="gray"
                                        variant="ghost"
                                        class="text-gray-600 hover:text-amber-600"
                                        @click="handleLogout"
                                    >
                                        Sign out
                                    </UButton>
                                </div>
                            </template>
                            <template v-else>
                                <div>
                                    <NuxtLink to="/login" class="text-gray-600 hover:text-amber-600">
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
                        <p class="text-sm text-gray-600">
                            &copy; {{ new Date().getFullYear() }} Sweet Delights Bakery. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
