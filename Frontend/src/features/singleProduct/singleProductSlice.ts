import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    rating: number;
    discount: number;
    shortDetails: Record<string, any>;
    description: Record<string, any>;
}

//Initialize state as product or null
const initialState: Product | null = {
    id: 0,
    title: "title",
    image: "image",
    price: 0,
    rating:0,
    discount: 0,
    shortDetails: {},
    description: {},
};

// const initialState: Product | null =  null;

//reducer function 
export const singleProductSlice = createSlice({
    name:"singleProduct",
    initialState,
    reducers: {
        setSingleProduct: (state, action: PayloadAction<Product>) => {
            Object.assign(state, action.payload)
        },
        getSingleProduct: (state) => {
            return state;
        }
    }
})

export const {getSingleProduct, setSingleProduct} = singleProductSlice.actions;
export default singleProductSlice.reducer;