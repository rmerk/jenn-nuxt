import { defineEventHandler } from 'h3'
import { useStrapiWrapper } from '~/composables/useStrapiWrapper'

export default defineEventHandler(async (event): Promise<any> => {
  const { getAll } = useStrapiWrapper()
  const articles: any = await getAll('articles', {
    populate: '*',
    sort: ['publishedAt:desc']
  })
  return articles
})