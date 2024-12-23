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
    <div class="flex min-h-screen flex-col justify-center bg-cream py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
            </h1>
        </div>

        <div class="mt-20 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-cream-100 px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" @submit.prevent="handleSubmit">
                    <div>
                        <div class="mt-1">
                            <UFormGroup
                                name="Email"
                                label="Email"
                                required
                            >
                                <UInput
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                />
                            </UFormGroup>
                        </div>
                    </div>

                    <div>
                        <UFormGroup
                            name="Password"
                            label="Password"
                            required
                        >
                            <UInput
                                v-model="form.password"
                                type="password"
                            />
                        </UFormGroup>
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
                            class="text-lg"
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
