import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    const { forgotPassword } = useStrapiAuth()
    const router = useRouter()

    try {
        const body = await readBody(event);


const onSubmit = async () => {
  try {
    await forgotPassword({ email: '' })

    router.push('/')
  } catch (e) {}
}

        await strapi.forgotPassword({
            email: body.email,
        });

        return {
            success: true,
        };
    }
    catch (error) {
        throw createError({
            statusCode: 400,
            message: error.message,
        });
    }
});
