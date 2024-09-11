import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartProduct {
    id: number;
    title: string;
    image: string;
    discount: number;
    price: number;
    quantity: number;
}

const initialState: CartProduct[]  = []

export const cartProductSlice = createSlice({
    name: "cartProduct",
    initialState,
    reducers: {
        setCartProduct: (state, action: PayloadAction<CartProduct>) => {
            const existingProductIndex = state.findIndex((product) => product.id === action.payload.id)
            console.log("existinigProductIndex :" , existingProductIndex)

            state.push(action.payload)
        },
        getCartProduct: (state) => {
            return state;
        }
    }
})

export const {setCartProduct, getCartProduct} = cartProductSlice.actions;
export default cartProductSlice.reducer;