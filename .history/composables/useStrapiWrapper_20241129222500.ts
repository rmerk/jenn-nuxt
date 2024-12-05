import type { Strapi5RequestParams } from "@nuxtjs/strapi"

export const useStrapiWrapper = () => {
    const { find, findOne } = useStrapi()

    async function getAll<T>(resource: string, params: Strapi5RequestParams): Promise<T[]> {
        try {
            const response = await useAsyncData(resource, () => find<T>(resource, params))
            return response.data
        } catch (error) {
            console.error(`Error fetching ${resource}:`, error)
            return []
        }
    }

    async function get<T>(resource: string, id: string, params = {}) {
        try {
            const response = await useAsyncData(`${resource}/${id}`, () => findOne<T>(resource, id, params))
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