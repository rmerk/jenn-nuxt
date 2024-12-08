export const STRAPI_URL = import.meta.dev
    ? 'http://localhost:1337/'
    : 'https://sweet-delights-bakery.herokuapp.com/';

export function getStrapiURL(path?: string, useAvatar = false) {
    if (!path && useAvatar) {
        return '/female-avatar.png';
    }
    return STRAPI_URL + path;
}
