export const STRAPI_URL = import.meta.dev
    ? 'http://localhost:1337/'
    : 'https://sweet-delights-bakery.herokuapp.com/';

export function getStrapiURL(path: string) {
    return STRAPI_URL + path;
}

export function getGenericAvatar() {
    return '/female-avatar.png';
}
