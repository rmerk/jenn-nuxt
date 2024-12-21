import process from 'node:process';

export default defineNuxtConfig({
    modules: ['@nuxtjs/strapi', '@pinia/nuxt', '@nuxt/ui', '@nuxt/eslint', '@nuxt/fonts'],

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

    nitro: { esbuild: { options: { target: 'esnext' } } },

    ssr: false,

    eslint: { config: { standalone: false } },

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

    colorMode: { preference: 'light' },

    runtimeConfig: {
        public: {
            SQUARE_APP_ID: '',
            SQUARE_LOCATION_ID: '',
            SQUARE_ACCESS_TOKEN: '',
        },
    },

    imports: { dirs: ['server/**/*'] },

    compatibilityDate: '2024-11-21',

    typescript: {
        tsConfig: { compilerOptions: { baseUrl: '.' } },
        typeCheck: true,
    },

    css: [
        './assets/css/main.css',
    ],

    fonts: {
        provider: 'google',
        assets: { prefix: 'fonts/' },
        defaults: {
            weights: [400, 700],
            styles: ['normal'],
        },
        families: [
            {
                name: 'Black Mango', // the 'canonical' name of the font used to look it up in a provider database
                provider: 'local', // you can override the provider on a per-family basis
                src: '~/assets/fonts/black-mango.ttf',
                // specific configuration will be used to generate `@font-face` definitions
                subsets: ['latin'],
                display: 'swap',
                weight: 400,
                style: 'normal',
                fallbacks: ['Arial'],
            },
            {
                name: 'Darker Grotesque',
                weights: [400, 500, 700],
                styles: ['normal', 'italic'],
                provider: 'google',
            },
        ],
    },

    pinia: { storesDirs: ['./stores/**/*.ts'] },
});
