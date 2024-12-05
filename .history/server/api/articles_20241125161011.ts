import { defineEventHandler } from 'h3'
import { useStrapiWrapper } from '~/composables/useStrapiWrapper'

export default defineEventHandler(async (event): Promise<any> => {
  const { find } = useStrapiWrapper()
  const articles: any = await find('articles', {
    populate: '*',
    sort: ['publishedAt:desc']
  })
  return articles
})