export const useStrapiWrapper = () => {
const { find } = useStrapi()


    const findOne = async (resource: string, id: string, params = {}) => {
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