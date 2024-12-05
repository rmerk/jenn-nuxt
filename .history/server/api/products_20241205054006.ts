import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    const strapi = useStrapiClient();
    const products = await strapi.find('products', {
        populate: ['image', 'category', 'dietary_tags'],
    });
    return products;
});
