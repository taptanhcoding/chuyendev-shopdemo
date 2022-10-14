import request from '~/httpRequest/shopRequest';

export const addCartApi = async (path = '', options = {}) => {
    try {
        let cart = await request.post('/api-cart/addcart/' + path, options);
        return cart.data;
    } catch {}
};

export const getCartApi = async (path = '') => {
    let cart = await request.get('/api-cart/getcart/' + path);
    return cart.data;
};

export const orderCartApi = async (path = '', options = {}) => {
    try {
        let cart = await request.post('/api-cart/ordercart/' + path, options);
        return cart.data;
    } catch {}
};
