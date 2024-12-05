import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
const { find } = useStrapi()
  const articles = await find('articles', {
    populate: '*',
    sort: ['publishedAt:desc']
  })
  return articles
})