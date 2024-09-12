import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartProduct {
    id: number;
    title: string;
    image: string;
    discount: number;
    price: number;
    quantity: number;
}

interface Quantity {
    id: number;
}

const initialState: CartProduct[]  = []

export const cartProductSlice = createSlice({
    name: "cartProduct",
    initialState,
    reducers: {
        setCartProduct: (state, action: PayloadAction<CartProduct>) => {
            const existingProductIndex = state.findIndex((product) => product.id === action.payload.id);
        
            if(existingProductIndex !== -1){
                state[existingProductIndex] = {
                    ...state[existingProductIndex],
                    quantity: state[existingProductIndex].quantity + 1
                }
            }else {
                state.push(action.payload)
            }
        },
        decreaseQuantity: (state, action: PayloadAction<Quantity>) => {
            const existingProductIndex = state.findIndex((product) => product.id === action.payload.id);

            if(state[existingProductIndex].quantity > 1){
                state[existingProductIndex] = {
                    ...state[existingProductIndex], quantity: state[existingProductIndex].quantity - 1
                }
            }else {
                return
            }
        },
        increaseQuantity: (state, action: PayloadAction<Quantity>) => {
            const existingProductIndex = state.findIndex((product) => product.id === action.payload.id);
            state[existingProductIndex] = {
                ...state[existingProductIndex], quantity: state[existingProductIndex].quantity + 1
            }
        },
        deleteCartProduct: (state, action: PayloadAction<Quantity>) => {
            const existingProductIndex = state.findIndex((product) => product.id === action.payload.id);
            state.splice(existingProductIndex, 1)
        }
    }
})

export const {setCartProduct, decreaseQuantity, increaseQuantity, deleteCartProduct} = cartProductSlice.actions;
export default cartProductSlice.reducer;