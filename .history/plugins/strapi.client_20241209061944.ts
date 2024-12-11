import type { Strapi5Error } from '@nuxtjs/strapi';

export default defineNuxtPlugin((nuxt) => {
    const toast = useToast();
    nuxt.hook('strapi:error' as any, (e: Strapi5Error) => {
        toast.add({ title: e.error.name, description: e.error.message });
    });
});
