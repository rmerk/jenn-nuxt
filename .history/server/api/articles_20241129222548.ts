import { useStrapiWrapper } from '~/composables/useStrapiWrapper'

export async function getArticles() {
  const { getAll } = useStrapiWrapper()
  const articles = await getAll('articles', {
    populate: '*',
    sort: ['publishedAt:desc']
  })
  return articles
}

export async function getArticle(id: string) {
  const { get } = useStrapiWrapper()
  const article = await get('articles', id)
  return article
}