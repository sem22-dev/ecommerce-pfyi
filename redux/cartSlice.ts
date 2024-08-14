
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/data/products";

interface CartItem extends Product {
    quantity: number;
}

//load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
    if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
};

// save cart to localStorage
const saveCartToStorage = (cart: CartItem[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: loadCartFromStorage(),
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const itemExists = state.find((item) => item.id === action.payload.id);
            if(itemExists) { 
                itemExists.quantity++;
            } else {
                state.push({...action.payload, quantity: 1});
            }
            saveCartToStorage(state);
        }, 
        removeFromCart: (state, action: PayloadAction<number>) => {
            const newState = state.filter((item) => item.id !== action.payload);
            saveCartToStorage(newState);
            return newState;
        },
        updateQuantity: (state, action: PayloadAction<{id: number; quantity: number}>) => {
            const {id, quantity} = action.payload;
            const item = state.find(item => item.id === id);
            if(item) {
                item.quantity = Math.max(quantity, 0);
            }
            saveCartToStorage(state);
        }
    }
});

export const {addToCart, removeFromCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;