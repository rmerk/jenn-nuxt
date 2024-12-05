import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const strapi = useStrapiClient()
  const posts = await strapi.find('posts', {
    populate: '*',
    sort: ['publishedAt:desc']
  })
  return posts
})