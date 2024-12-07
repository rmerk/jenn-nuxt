import process from 'pro cess';

export default defineNuxtConfig({
    modules: ['@nuxtjs/strapi', '@pinia/nuxt', '@nuxt/ui', '@nuxt/eslint'],

    $production: {
        strapi: {
            url: 'https://sweet-delights-bakery.herokuapp.com',
            prefix: '/api',
            version: 'v5',
            cookie: {},
            cookieName: 'strapi_jwt',
            devtools: false,
        },
    },

    $development: {
        strapi: {
            url: 'http://localhost:1337',
            prefix: '/api',
            version: 'v5',
            cookie: {
                path: '/',
                maxAge: 14 * 24 * 60 * 60,
                secure: process.env.NODE_ENV === 'production',
                sameSite: true,
            },
            cookieName: 'strapi_jwt',
            devtools: true,
        },
    },

    nitro: {
        esbuild: {
            options: {
                target: 'esnext',
            },
        },
    },

    eslint: {
        config: {
            standalone: false,
        },
    },

    app: {
        head: {
            title: 'Sweet Delights Bakery',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Artisanal bakery offering fresh bread, pastries, and cakes' },
            ],
        },
    },

    colorMode: {
        preference: 'light',
    },

    runtimeConfig: {
        strapi: { // nuxt/strapi options available server-side
            url: 'http://localhost:1337',
        },
        public: {
            SQUARE_APP_ID: '',
            SQUARE_LOCATION_ID: '',
            SQUARE_ACCESS_TOKEN: '',
        },
    },

    compatibilityDate: '2024-11-21',

    typescript: {
        typeCheck: true,
    },

    pinia: {
        storesDirs: ['./stores/**/*.ts'],
    },

    tailwindcss: {
        config: {
            content: [
                // './components/**/*.vue',
                // './pages/**/*.vue',
                './app.vue',
            ],
        },
    },
});
