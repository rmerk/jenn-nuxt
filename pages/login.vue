<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const form = ref({
    email: '',
    password: '',
});

async function handleSubmit() {
    try {
        await authStore.login(form.value.email, form.value.password);
        toast.add({
            description: 'Successfully logged in!',
            color: 'green',
        });
        router.push('/account');
    }
    catch {
        toast.add({
            description: 'Invalid credentials',
            color: 'red',
        });
    }
}
</script>

<template>
    <div class="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
            </h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" @submit.prevent="handleSubmit">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div class="mt-1">
                            <input
                                id="email"
                                v-model="form.email"
                                type="email"
                                required
                                class="focus:border-primary focus:ring-primary block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:outline-none"
                            >
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div class="mt-1">
                            <input
                                id="password"
                                v-model="form.password"
                                type="password"
                                required
                                class="focus:border-primary focus:ring-primary block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:outline-none"
                            >
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="text-sm">
                            <NuxtLink to="/forgot-password" class="text-primary font-medium">
                                Forgot your password?
                            </NuxtLink>
                        </div>
                    </div>

                    <div>
                        <UButton
                            block
                            type="submit"
                            :disabled="authStore.loading"
                            color="primary"
                        >
                            {{ authStore.loading ? 'Signing in...' : 'Sign in' }}
                        </UButton>
                    </div>

                    <div v-if="authStore.error" class="mt-4 text-center text-sm text-red-600">
                        {{ authStore.error }}
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
