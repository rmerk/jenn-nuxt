import type { Strapi5Error } from '@nuxtjs/strapi'


export default defineNuxtPlugin((nuxt: NuxtApp) => {
  nuxt.hook('strapi:error' as any, (e: Strapi5Error) => {
    nuxt.$toast.error({ title: e.error.name, description: e.error.message })
  })
})