<script setup>
import { CurrencyDollarIcon, ShoppingBagIcon, UserGroupIcon } from '@heroicons/vue/24/outline';

definePageMeta({
    middleware: 'auth',
    requiresAuth: true,
    requiresAdmin: true,
});

const { find } = useStrapi();
const toast = useToast();

// Fetch orders with user information
const { data: recentOrders } = await useAsyncData('admin-orders', () => find('orders', {
    populate: ['user'],
    sort: ['createdAt:desc'],
    pagination: {
        page: 1,
        pageSize: 10,
    },
}));

// Calculate stats
const stats = computed(() => [
    {
        name: 'Total Orders',
        value: recentOrders.value?.length || 0,
        icon: ShoppingBagIcon,
    },
    {
        name: 'Total Revenue',
        value: `$${recentOrders.value?.reduce((sum, order) => sum + order.total, 0).toFixed(2) || '0.00'}`,
        icon: CurrencyDollarIcon,
    },
    {
        name: 'Total Customers',
        value: new Set(recentOrders.value?.map(order => order.user?.id)).size || 0,
        icon: UserGroupIcon,
    },
]);

async function updateOrderStatus(order) {
    try {
        const response = await $fetch(`/api/orders/${order.id}`, {
            method: 'PUT',
            body: { status: order.status === 'pending' ? 'processing' : 'completed' },
        });

        if (response) {
            toast.success('Order status updated successfully');
            // Refresh orders
            refreshNuxtData('admin-orders');
        }
    }
    catch {
        toast.error('Failed to update order status');
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <!-- Admin Header -->
            <div class="md:flex md:items-center md:justify-between">
                <div class="min-w-0 flex-1">
                    <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
                        Admin Dashboard
                    </h2>
                </div>
            </div>

            <!-- Stats Overview -->
            <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="stat in stats"
                    :key="stat.name"
                    class="overflow-hidden rounded-lg bg-white shadow"
                >
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="shrink-0">
                                <component
                                    :is="stat.icon"
                                    class="size-6 text-gray-400"
                                    aria-hidden="true"
                                />
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="truncate text-sm font-medium text-gray-500">
                                        {{ stat.name }}
                                    </dt>
                                    <dd class="flex items-baseline">
                                        <div class="text-2xl font-semibold text-gray-900">
                                            {{ stat.value }}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Orders -->
            <div class="mt-8">
                <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                            Recent Orders
                        </h3>
                    </div>
                </div>

                <div class="mt-4 flex flex-col">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-300">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                                Order ID
                                            </th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Customer
                                            </th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Date
                                            </th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Total
                                            </th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Status
                                            </th>
                                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span class="sr-only">
                                                    Actions
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white">
                                        <tr v-for="order in recentOrders" :key="order.id">
                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                                #{{ order.id }}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {{ order.user?.username }}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {{ new Date(order.createdAt).toLocaleDateString() }}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                ${{ order.total.toFixed(2) }}
                                            </td>
                                            <td
                                                class="whitespace-nowrap px-3 py-4 text-sm
                      text-gray-500"
                                            >
                                                <span
                                                    class="rounded-full px-2 py-1 text-xs font-medium"
                                                    :class="[
                                                        {
                                                            'bg-green-100 text-green-800': order.status === 'completed',
                                                            'bg-yellow-100 text-yellow-800': order.status === 'processing',
                                                            'bg-gray-100 text-gray-800': order.status === 'pending',
                                                        },
                                                    ]"
                                                >
                                                    {{ order.status }}
                                                </span>
                                            </td>
                                            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <button
                                                    class="text-primary hover:text-primary"
                                                    @click="updateOrderStatus(order)"
                                                >
                                                    Update status
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
