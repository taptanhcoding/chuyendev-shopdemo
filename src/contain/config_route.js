const routes = {
    home: '/',
    cart: '/cart',
    insurance: '/insurance',
    profile: '/account/:user',
    customer: '/customer/:action',
    category: '/products/:category',
    verification: '/verification/:token',
    detail: '/detail/:name',
    search: '/search/q=:keyword',
};

export default routes;
