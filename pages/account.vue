<script setup lang="ts">
import type { Order, Product } from '@/types/collections';
import type { Strapi5ResponseMany } from '@nuxtjs/strapi';
import { useAuthStore } from '@/stores/auth';
import { UserCircleIcon } from '@heroicons/vue/24/solid';

const toast = useToast();

definePageMeta({
    middleware: 'auth',
    requiresAuth: true,
});

const authStore = useAuthStore();
const router = useRouter();

const { find } = useStrapi();
const { data: orders } = await useAsyncData<Strapi5ResponseMany<Order>>('orders', () => find<Order>('orders', {
    filters: { user: authStore.user?.id },
    populate: ['*'],
}));

const { data: products } = await useAsyncData<Strapi5ResponseMany<Product>>('products', () => find<Product>('products', { populate: ['*'] }));

function getOrderProducts(order: Order) {
    return order?.products?.map((orderItem) => {
        const product = products.value?.data?.find(p => p.id === orderItem.id);
        return {
            ...product,
            quantity: orderItem.id ? order.quantities[orderItem.id] : 0,
        };
    });
}

async function handleLogout() {
    try {
        await authStore.logout();
        toast.add({
            color: 'green',
            description: 'You have been logged out',
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
    <div class="min-h-screen bg-gray-50">
        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-4xl">
                <!-- Profile Section -->
                <div class="rounded-lg bg-white shadow">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="flex items-center space-x-5">
                            <div class="shrink-0">
                                <div class="relative">
                                    <span class="inline-block size-16 overflow-hidden rounded-full bg-gray-100">
                                        <UserCircleIcon class="size-full text-gray-300" />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900">
                                    {{ authStore.user?.username }}
                                </h1>
                                <p class="text-sm font-medium text-gray-500">
                                    {{ authStore.user?.email }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Orders Section -->
                <div class="mt-8">
                    <h2 class="text-lg font-medium text-gray-900">
                        Order History
                    </h2>
                    <div class="mt-4 divide-y divide-gray-200 rounded-lg bg-white shadow">
                        <div v-if="orders?.data?.length === 0" class="p-6 text-center text-gray-500">
                            No orders found
                        </div>
                        <div
                            v-for="order in orders?.data || []"
                            v-else
                            :key="order.id"
                            class="p-6"
                        >
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-primary text-sm font-medium">
                                        Order #{{ order.id }}
                                    </p>
                                    <p class="mt-1 text-sm text-gray-500">
                                        {{ order.createdAt }}
                                    </p>
                                </div>
                                <p class="text-sm font-medium text-gray-900">
                                    ${{ order?.orderTotal?.toFixed(2) }}
                                </p>
                            </div>
                            <div class="mt-4">
                                <div class="text-sm text-gray-500">
                                    <div
                                        v-for="product in
                                            getOrderProducts(order)"
                                        :key="product.slug"
                                        class="flex justify-between"
                                    >
                                        <span>
                                            {{ product.productName }} × {{ product.quantity }}
                                        </span>
                                        <span>
                                            ${{ ((product?.price ?? 0) * (product.quantity ?? 0)).toFixed(2) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4">
                                <span
                                    class="rounded-full px-2 py-1 text-xs font-medium"
                                    :class="[
                                        {
                                            'bg-green-100 text-green-800': order.orderStatus === 'Complete',
                                            'bg-yellow-100 text-yellow-800': order.orderStatus === 'Processing',
                                            'bg-gray-100 text-gray-800': order.orderStatus === 'Pending',
                                        },
                                    ]"
                                >
                                    {{ order.orderStatus }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Logout Button -->
                <div class="mt-8">
                    <button
                        class="bg-primary hover:bg-primary focus:ring-primary flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                        @click="handleLogout"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
