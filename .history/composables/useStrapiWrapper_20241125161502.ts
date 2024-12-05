export const useStrapiWrapper = () => {
    const { find, findOne } = useStrapi()

    const getAll = async (resource: string, params) => {
        try {
            const response = await useAsyncData(resource, {
                () => find(resource, params)
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