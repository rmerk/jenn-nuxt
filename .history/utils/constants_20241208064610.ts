export const STRAPI_URL = import.meta.dev
    ? 'http://localhost:1337/'
    : 'https://sweet-delights-bakery.herokuapp.com/';


export getStrapiURL = () => STRAPI_URL;