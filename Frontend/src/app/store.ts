import { configureStore } from "@reduxjs/toolkit";
import singleProductReducer from '../features/singleProduct/singleProductSlice'

export const store = configureStore({
    reducer:{
        singleProduct: singleProductReducer,
    },
})

//RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;