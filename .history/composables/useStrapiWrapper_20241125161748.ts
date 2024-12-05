import type { Strapi5RequestParams } from "@nuxtjs/strapi"

export const useStrapiWrapper = () => {
    const { find, findOne } = useStrapi()

    const getAll = async (resource: string, params: Strapi5RequestParams) => {
        try {
            const response = await useAsyncData(resource, {
                () => find(resource, {

                })
            })
            return response.data
        } catch (error) {
            console.error(`Error fetching ${resource}:`, error)
            return []
        }
    }

    const get = async (resource: string, id: string, params = {}) => {
        try {
            const response = await $fetch(`/api/${resource}/${id}`, {
                params
            })
            return response.data
        } catch (error) {
            console.error(`Error fetching ${resource}/${id}:`, error)
            return null
        }
    }

    return {
        find,
        findOne
    }
}