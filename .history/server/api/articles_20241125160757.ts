import { defineEventHandler } from 'h3'
import { useStrapiWrapper } from '~/composables/useStrapiWrapper'

export default defineEventHandler(async (event) => {
const { find } = useStrapiWrapper()
  const articles = await find('articles', {
    populate: '*',
    sort: ['publishedAt:desc']
  })
  return articles
})