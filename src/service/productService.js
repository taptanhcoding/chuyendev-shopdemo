import request from '~/httpRequest/shopRequest';

export const getProduct = async (path = '') => {
    try {
        let products = await request.get('api-product/' + path);
        return products.data;
    } catch {}
};

export const getProductById = async (path = '') => {
    try {
        let products = await request.get('api-product/product-id/' + path);
        return products.data;
    } catch {}
};

export const getProductSale = async (path = '') => {
    try {
        let products = await request.get('api-product/sale/' + path);
        return products.data;
    } catch {}
};

export const getDetail = async (path = '') => {
    try {
        let product = await request.get('api-product/detail/' + path);
        return product.data;
    } catch {}
};

export const getCartProduct = async (option = {}) => {
    try {
        let products = await request.get('api-product/cart', option);
        return products.data;
    } catch {}
};
