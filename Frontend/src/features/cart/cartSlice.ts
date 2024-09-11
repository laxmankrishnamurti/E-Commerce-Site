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
            if(state.length > 0) {
                console.log("execution under conditional statement when length is > 0")
                state.map((product) => {
                    if(product.id === action.payload.id){
                        
                    }
                })
            }
            state.push(action.payload)
        },
        getCartProduct: (state) => {
            return state;
        }
    }
})

export const {setCartProduct, getCartProduct} = cartProductSlice.actions;
export default cartProductSlice.reducer;