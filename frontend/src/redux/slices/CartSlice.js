import { createSlice } from '@reduxjs/toolkit';

// const initialState = {

// };

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        original_total: 0,
        final_total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const { product_id, color_id, prices } = action.payload;
            const item = state.items.find(item => item.product_id == product_id && item.color_id == color_id);
            console.log("Cart action payload:", action.payload);
            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ product_id: product_id, color_id: color_id, quantity: 1 });
            }
            state.original_total += prices.original_price;
            state.final_total += prices.discounted_price;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            const { product_id, color_id } = action.payload;
            state.items = state.items.filter(item => !(item.product_id === product_id && item.color_id === color_id));
            // ✅ Recalculate final total after removal
            // state.final_total = state.items.reduce((acc, item) => acc + (item.quantity * item.prices.discounted_price), 0);
        },

        dbToCart: (state, action) => {
            state.items = action.payload.items;
            state.original_total = action.payload.original_total;
            state.final_total = action.payload.final_total;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        lsToCart: (state, action) => {
            const cart = localStorage.getItem("cart");
            if (cart && cart !== "{}") {
                const lscart = JSON.parse(cart);
                state.items = lscart.items;
                state.original_total = lscart.original_total;
                state.final_total = lscart.final_total;
            }
        },
        quantity: (state, action) => {
            const { product_id, color_id, value, prices } = action.payload;
            const item = state.items.find(item => item.product_id == product_id && item.color_id == color_id);
            console.log("Cart action payload:", action.payload);
            if (item) {
                item.quantity += value;
            }
            if (value == -1) {

                state.original_total -= prices.original_price;
                state.final_total -= prices.discounted_price;
                localStorage.setItem("cart", JSON.stringify(state));
                return;
            }
            state.original_total += prices.original_price;
            state.final_total += prices.discounted_price;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        emptyCart: (state) => {
            state.items = [];
            state.final_total = 0;
            state.original_total = 0;
            localStorage.removeItem("cart")
        },
    },
});

export const { addToCart, removeFromCart, dbToCart, quantity, lsToCart, emptyCart } = CartSlice.actions;

export default CartSlice.reducer;