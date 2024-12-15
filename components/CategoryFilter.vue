<script setup>
defineProps({
    categories: {
        type: Array,
        required: true,
    },
    modelValue: {
        type: String,
        required: true,
    },
});

defineEmits(['update:modelValue']);
</script>

<template>
    <UButtonGroup>
        <UButton
            v-for="category in categories"
            :key="category"
            :variant="modelValue === category ? 'solid' : 'ghost'"
            color="primary"
            @click="$emit('update:modelValue', category)"
        >
            {{ category }}
        </UButton>
    </UButtonGroup>
</template>
