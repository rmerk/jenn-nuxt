const config = useRuntimeConfig();

export const STRAPI_URL = config.strapi.url ?? 'https://localhost:1337';
