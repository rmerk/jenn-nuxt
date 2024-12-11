import process from 'node:process';

export default defineNuxtConfig({
    modules: ['@nuxtjs/strapi', '@pinia/nuxt', '@nuxt/ui', '@nuxt/eslint', '@nuxtjs/google-fonts'],

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
        public: {
            SQUARE_APP_ID: '',
            SQUARE_LOCATION_ID: '',
            SQUARE_ACCESS_TOKEN: '',
        },
    },

    imports: {
        dirs: ['server/**/*'],
    },

    compatibilityDate: '2024-11-21',

    typescript: {
        tsConfig: {
            compilerOptions: {
                baseUrl: '.',
            },
        },
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

    googleFonts: {
        families: {
            'Inter': [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
    },
});