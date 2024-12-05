export default defineNuxtConfig({
  modules: [
    '@nuxtjs/strapi',
    '@pinia/nuxt',
    '@nuxt/ui'
  ],

  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v5',
    cookie: {},
    cookieName: 'strapi_jwt'
  },

  pinia: {
      storesDirs: ['./stores/**']
  },

  runtimeConfig: {
    public: {
      SQUARE_APP_ID: process.env.SQUARE_APP_ID,
      SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID
    }
  },

  app: {
    head: {
      title: 'Sweet Delights Bakery',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Artisanal bakery offering fresh bread, pastries, and cakes' }
      ]
    }
  },

  colorMode: {
    preference: 'light'
  },

  compatibilityDate: '2024-11-21'
})