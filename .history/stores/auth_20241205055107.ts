import type { StrapiUser } from '@nuxtjs/strapi';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<StrapiUser | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const isAuthenticated = computed(() => !!user.value);
    const isAdmin = computed(() => user.value?.provider === 'admin');

    async function login(identifier: string, password: string) {
        loading.value = true;
        error.value = null;
        try {
            const { login } = useStrapiAuth();
            const response = await login({ identifier, password });
            user.value = response.user.value;
        }
        catch (err: any) {
            error.value = err.message || 'Login failed';
            throw err;
        }
        finally {
            loading.value = false;
        }
    }

    async function logout() {
        const { logout } = useStrapiAuth();
        await logout();
        user.value = null;
    }

    async function fetchUser() {
        loading.value = true;
        try {
            const { fetchUser } = useStrapiAuth();
            const response = await fetchUser();
            user.value = response.value;
        }
        catch {
            user.value = null;
        }
        finally {
            loading.value = false;
        }
    }

    return {
        user,
        loading,
        error,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        fetchUser,
    };
});
