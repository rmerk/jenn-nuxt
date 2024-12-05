const useStrapi = () => {
  const config = useRuntimeConfig()

  const find = async (resource: string, params = {}) => {
    try {
      const response = await $fetch(`/api/${resource}`, {
        params
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching ${resource}:`, error)
      return []
    }
  }

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