import type { Strapi5RequestParams } from "@nuxtjs/strapi"

export const useStrapiWrapper = () => {
    const { find, findOne } = useStrapi()

    const getAll = async (resource: string, params: Strapi5RequestParams) => {
        try {
            const response = await useAsyncData(resource, () => find(resource, params))
            return response.data
        } catch (error) {
            console.error(`Error fetching ${resource}:`, error)
            return []
        }
    }

    const get<T> = async (resource: string, id: string, params = {}): Promise<T> => {
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