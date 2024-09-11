import { configureStore } from "@reduxjs/toolkit";
import singleProductReducer from '../features/singleProduct/singleProductSlice'
import cartProductReducer from "../features/cart/cartSlice";

export const store = configureStore({
    reducer:{
        singleProduct: singleProductReducer,
        cartProduct: cartProductReducer,
    },
})

//RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;