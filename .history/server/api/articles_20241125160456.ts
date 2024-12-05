import { defineEventHandler } from 'h3'
import { useStrapi } from '@nuxtjs/strapi';

export default defineEventHandler(async (event) => {
const { find } = useStrapi()
  const articles = await find('articles', {
    populate: '*',
    sort: ['publishedAt:desc']
  })
  return articles
})