import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/counter/usersSlice';
import cartReducer from '~/features/cart/cartSlice';

export const store = configureStore({
    reducer: {
        users: userReducer,
        cart: cartReducer,
    },
});
