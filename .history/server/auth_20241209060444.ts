import { defineEventHandler, type EventHandlerRequest, type H3Event } from 'h3';

export default defineEventHandler(async () => {
    const { forgotPassword } = useStrapiAuth();
    const router = useRouter();

    try {
        await forgotPassword({
            email: router.currentRoute.value.params.email as string,
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
