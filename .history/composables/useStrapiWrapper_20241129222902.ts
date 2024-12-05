import type { Strapi5RequestParams } from "@nuxtjs/strapi"

export function useStrapiWrapper()<T> {
    const { find, findOne } = useStrapi<T>()

    async function getAll(resource: string, params: Strapi5RequestParams) {
        try {
            const response = await useAsyncData(resource, () => find(resource, params))
            return response.data
        } catch (error) {
            console.error(`Error fetching ${resource}:`, error)
            return []
        }
    }

    async function get(resource: string, id: string, params = {}) {
        try {
            const response = await useAsyncData(`${resource}/${id}`, () => findOne(resource, id, params))
            return response.data
        } catch (error) {
            console.error(`Error fetching ${resource}/${id}:`, error)
            return null
        }
    }

    return {
        getAll,
        get
    }
}