export default defineNuxtConfig({
  modules: ['@nuxtjs/strapi', '@pinia/nuxt', '@nuxt/ui', '@nuxt/eslint'],

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
      SQUARE_APP_ID: 1234,
      SQUARE_LOCATION_ID: 'test',
      SQUARE_ACCESS_TOKEN = 12345,
    },
  },

  compatibilityDate: '2024-11-21',

  typescript: {
    typeCheck: true,
  },

  pinia: {
    storesDirs: ['./stores/**/*.ts'],
  },

  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v5',
    cookie: {},
    cookieName: 'strapi_jwt',
    devtools: process.env.NODE_ENV === 'development',
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
})
