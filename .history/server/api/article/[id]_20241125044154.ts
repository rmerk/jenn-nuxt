import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const strapi = useStrapiClient()
  const articles = await strapi.findOne('articles', id, {
    populate: '*'
  })
  return articles
})