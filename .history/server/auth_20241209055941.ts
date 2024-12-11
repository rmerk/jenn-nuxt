import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    const { forgotPassword } = useStrapiAuth();
    const router = useRouter();

    try {
        await forgotPassword({
            email: body.email,
        });

        return {
            success: true,
        };
    }
    catch (error) {
        throw createError({
            statusCode: 400,
            message: (error as Error).message,
        });
    }
});
