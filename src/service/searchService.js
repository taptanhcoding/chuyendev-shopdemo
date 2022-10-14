import request from '~/httpRequest/shopRequest';

export const search = async (options = {}) => {
    let products = await request.get('search', options);
    return products.data;
};
