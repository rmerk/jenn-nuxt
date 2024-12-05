import type { Strapi5Error } from '@nuxtjs/strapi'

export default defineNuxtPlugin((nuxt) => {
  nuxt.hook('strapi:error' as any, (e: Strapi5Error) => {
    console.error({ title: e.error.name, description: e.error.message })
  })
})