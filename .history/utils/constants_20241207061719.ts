const config = useRuntimeConfig();

export const STRAPI_URL = config.strapi.url ?? 'http://localhost:1337';
