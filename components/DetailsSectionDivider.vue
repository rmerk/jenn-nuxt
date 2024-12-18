<script setup lang="ts">
const items = [
    'AT YOUR DOORSTEP',
    '100% BAKED ITEMS THAT ENSURE ULTIMATE FRESHNESS',
    'FLAVOURS THAT TRANSPORT YOU TO A REALM BEYOND IMAGINATION',
    'FRESH ITEMS FROM OUR OVEN',
];
</script>

<template>
    <div class="overflow-hidden border-y border-gray-400 bg-cream py-1">
        <div class="flex items-center justify-center whitespace-nowrap">
            <span
                v-for="(item, index) in items"
                :key="index"
                class="flex items-center text-base text-gray-700"
            >
                <span>
                    {{ item }}
                </span>
                <ClientOnly fallback-tag="span" fallback="Loading details...">
                    <UDivider
                        v-if="index !== items.length - 1"
                        icon="material-symbols-light:asterisk"
                        class="px-4"
                        :ui="{ icon: { base: 'text-gray-600' } }"
                    />
                </ClientOnly>
            </span>
        </div>
    </div>
</template>
