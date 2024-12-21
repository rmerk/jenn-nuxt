import type { Product } from '~/types/collections';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface CartItem extends Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: {
        url: string;
    };
    dietary_tags?: { id: number; name: string }[];
}

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>([]);

    const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));
    const total = computed(() => items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0));

    function addItem(item: CartItem) {
        const existingItem = items.value.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        }
        else {
            items.value.push(item);
        }
    }

    function removeItem(item: CartItem) {
        const index = items.value.findIndex(i => i.id === item.id);
        if (index > -1) {
            items.value.splice(index, 1);
        }
    }

    function clearCart() {
        items.value = [];
    }

    return {
        items,
        itemCount,
        total,
        addItem,
        removeItem,
        clearCart,
    };
});
