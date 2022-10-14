import request from '~/httpRequest/shopRequest';

export const getCategory = async () => {
    let categories = await request.get('api-categories');
    return categories.data;
};
