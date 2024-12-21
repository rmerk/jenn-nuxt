<script setup lang="ts">
const form = ref({
    name: '',
    email: '',
    message: '',
});

async function submitForm() {
    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: form.value,
        });
        // Reset form and show success message
        form.value = {
            name: '',
            email: '',
            message: '',
        };
    }
    catch (error) {
        console.error('Error submitting form:', error);
    }
}
</script>

<template>
    <div class="bg-cream py-20">
        <div class="mx-auto w-11/12 px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-3xl">
                <h1 class="text-center text-black">
                    Contact Us
                </h1>

                <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-900">
                            Visit Our Bakery
                        </h2>
                        <div class="mt-4">
                            <p class="text-gray-600">
                                123 Bakery Street
                            </p>
                            <p class="text-gray-600">
                                Sweet Town, ST 12345
                            </p>
                            <p class="mt-4 text-gray-600">
                                Phone: (555) 123-4567
                            </p>
                            <p class="text-gray-600">
                                Email: hello@sweetdelights.com
                            </p>
                        </div>

                        <h2 class="mt-8 text-xl font-semibold text-gray-900">
                            Hours
                        </h2>
                        <div class="mt-4">
                            <p class="text-gray-600">
                                Monday - Friday: 7am - 7pm
                            </p>
                            <p class="text-gray-600">
                                Saturday - Sunday: 8am - 5pm
                            </p>
                        </div>
                    </div>

                    <div class="rounded bg-cream-100 p-5">
                        <UForm
                            class="space-y-6"
                            :state="form"
                            @submit="submitForm"
                        >
                            <UFormGroup
                                label="Name"
                                name="name"
                                size="xl"
                            >
                                <UInput
                                    id="name"
                                    v-model="form.name"
                                    type="text"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                />
                            </UFormGroup>

                            <UFormGroup
                                label="Email"
                                name="email"
                                size="xl"
                            >
                                <UInput
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                />
                            </UFormGroup>

                            <UFormGroup
                                label="Message"
                                name="message"
                                size="xl"
                            >
                                <UTextarea
                                    id="message"
                                    v-model="form.message"
                                    :rows="4"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                />
                            </UFormGroup>

                            <UButton
                                type="submit"
                                class="flex w-full justify-center text-lg"
                            >
                                Send Message
                            </UButton>
                        </UForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
