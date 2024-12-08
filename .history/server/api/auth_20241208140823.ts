import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const strapi = useStrapiClient()

    await strapi.forgotPassword({
      email: body.email
    })

    return {
      success: true
    }
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }
})