import { useStrapiWrapper } from '~/composables/useStrapiWrapper'
import { ApiArticleArticle } from '~/types/contentTypes'

export async function getArticles() {
  const { getAll } = useStrapiWrapper()<Article>
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