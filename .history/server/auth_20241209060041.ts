import type { defineEventHandler, EventHandlerRequest, H3Event } from 'h3';

export default defineEventHandler(async (event) => {
    const { forgotPassword } = useStrapiAuth();
    const body = await useBody(event);
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
function useBody(event: H3Event<EventHandlerRequest>) {
    throw new Error('Function not implemented.');
}
