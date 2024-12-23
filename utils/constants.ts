export const STRAPI_URL = import.meta.dev
    ? 'http://localhost:1337'
    : 'https://sweet-delights-bakery.herokuapp.com';

export function getStrapiURL(path?: string) {
    return STRAPI_URL + path;
}

export function getGenericAvatar() {
    return '/female-avatar.png';
}

export const INLINE_ELEMENTS = [
    'a',
    'abbr',
    'audio',
    'b',
    'bdi',
    'bdo',
    'canvas',
    'cite',
    'code',
    'data',
    'del',
    'dfn',
    'em',
    'i',
    'iframe',
    'ins',
    'kbd',
    'label',
    'map',
    'mark',
    'noscript',
    'object',
    'output',
    'picture',
    'q',
    'ruby',
    's',
    'samp',
    'small',
    'span',
    'strong',
    'sub',
    'sup',
    'svg',
    'time',
    'u',
    'var',
    'video',
];
