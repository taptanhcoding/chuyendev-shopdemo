import routes from '~/contain/config_route';
import Cart from '~/pages/Cart/Cart';
import Category from '~/pages/Category/Category';
import Verification from '~/pages/Verification/Verification';
import Customer from '~/pages/Customer/Customer';
import Detail from '~/pages/Detail/Detail';
import Home from '~/pages/Home/Home';
import Insurance from '~/pages/Insurance/Insurance';
import Profile from '~/pages/Profile/Profile';
import SearchPage from '~/pages/SearchPage/SearchPage';

const publicRoutes = [
    {
        path: routes.home,
        element: Home,
    },
    {
        path: routes.search,
        element: SearchPage,
    },
    {
        path: routes.cart,
        element: Cart,
    },
    {
        path: routes.category,
        element: Category,
    },
    {
        path: routes.detail,
        element: Detail,
    },
    {
        path: routes.insurance,
        element: Insurance,
    },
    {
        path: routes.profile,
        element: Profile,
    },

    {
        path: routes.verification,
        element: Verification,
    },
];

const priviteRoutes = [
    {
        path: routes.customer,
        element: Customer,
    },
];

export { publicRoutes, priviteRoutes };
