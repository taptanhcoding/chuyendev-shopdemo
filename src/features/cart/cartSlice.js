import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from '../counter/counterAPI';

const initialState = {
    cart: [],
    products: [],
};

export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.cart = action.payload;
        },
        handleCart: (state, action) => {
            if (
                state.cart.find(
                    (product) =>
                        product.product.id == action.payload.product.id && product.color == action.payload.color,
                )
            ) {
                state.cart.forEach((product) => {
                    if (product.product.id == action.payload.product.id) {
                        product.quanity = product.quanity + 1;
                    }
                });
            } else {
                action.payload = { color: '', ...action.payload };
                state.cart = [...state.cart, action.payload];
            }
        },
        removeCart: (state, action) => {
            state.cart.splice(action.payload, 1);
        },
        updateCart: (state, action) => {
            state.cart.forEach((cart) => {
                if (cart.product.id == action.payload.product_id) {
                    cart.quanity = action.payload.quanity;
                }
            });
        },
        removeAllCart: (state) => {
            state.cart = [];
        },
    },
});

export const { addCart, handleCart, removeCart, removeAllCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
