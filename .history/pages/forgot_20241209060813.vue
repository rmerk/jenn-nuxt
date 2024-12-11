<script setup>
const email = ref('');
const loading = ref(false);
const showSuccessModal = ref(false);
const router = useRouter();
const toast = useToast();

const { forgotPassword } = useStrapiAuth();
const router = useRouter();

async function handleSubmit() {
    loading.value = true;
    try {
        showSuccessModal.value = true;
    }
    catch {
        toast.add('An error occurred. Please try again.');
    }
    finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Reset your password
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" @submit.prevent="handleSubmit">
                    <div>
                        <UFormGroup label="Email address" name="email">
                            <UInput
                                v-model="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                            />
                        </UFormGroup>
                    </div>

                    <div>
                        <UButton
                            type="submit"
                            color="amber"
                            variant="solid"
                            :loading="loading"
                            block
                        >
                            {{ loading ? 'Sending...' : 'Send reset link' }}
                        </UButton>
                    </div>

                    <div class="text-sm text-center">
                        <ULink
                            to="/login"
                            class="font-medium text-amber-600 hover:text-amber-500"
                        >
                            Back to login
                        </ULink>
                    </div>
                </form>
            </div>
        </div>

        <UModal v-model="showSuccessModal">
            <UCard>
                <template #header>
                    <h3 class="text-lg font-medium text-gray-900">
                        Check your email
                    </h3>
                </template>
                <p class="text-gray-600">
                    If an account exists for {{ email }}, you will receive a password reset link shortly.
                </p>
                <template #footer>
                    <UButton
                        color="amber"
                        variant="solid"
                        block
                        @click="router.push('/login')"
                    >
                        Return to login
                    </UButton>
                </template>
            </UCard>
        </UModal>
    </div>
</template>
