import { useStrapiWrapper } from '~/composables/useStrapiWrapper'

export async function 
  const { getAll } = useStrapiWrapper()
  const articles: any = await getAll('articles', {
    populate: '*',
    sort: ['publishedAt:desc']
  })
  return articles