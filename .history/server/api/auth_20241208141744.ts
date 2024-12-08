import { defineEventHandler } from 'h3';
import { useStrapiAuth} from 'server/utils/'

export default defineEventHandler(async (event) => {
    const { forgotPassword } = useStrapiAuth();
    const router = useRouter();

    try {
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
