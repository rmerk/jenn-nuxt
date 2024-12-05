import { defineEventHandler } from 'h3'
import { useStrapiClient } from 'strapi'

export default defineEventHandler(async (event) => {
  const strapi = useStrapiClient()
  const articles = await strapi.find('articles', {
    populate: '*',
    sort: ['publishedAt:desc']
  })
  return articles
})