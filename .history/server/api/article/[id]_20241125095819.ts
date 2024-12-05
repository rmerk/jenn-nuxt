import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const strapi = useStrapiClient()
  const post = await strapi.findOne('posts', id, {
    populate: '*'
  })
  return post
})