export const STRAPI_URL = import.meta.dev
    ? 'http://localhost:1337/'
    : 'https://sweet-delights-bakery.herokuapp.com/';

export function getStrapiURL(path?: string) {
    if (!path) {
        return '/female-avatar.png';
    }
    return STRAPI_URL + path;
}
