import { defineEventHandler } from 'h3'
import { useStrapiWrapper } from '~/composables/useStrapiWrapper'


  const { getAll } = useStrapiWrapper()
  const articles: any = await getAll('articles', {
    populate: '*',
    sort: ['publishedAt:desc']
  })
  return articles