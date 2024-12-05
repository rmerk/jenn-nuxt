import { useStrapiWrapper } from '~/composables/useStrapiWrapper'
import { ApiArticleArticle } from '~/types/contentTypes'

export async function getArticles() {
  const { getAll } = useStrapiWrapper<ApiArticleArticle>()

}

export async function getArticle(id: string) {
  const { get } = useStrapiWrapper < ApiArticleArticle>()
  const article = await get('articles', id)
  return article
}