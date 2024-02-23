import {configureStore} from "@reduxjs/toolkit";
import products from "./slice/productSlice";
import registerSlice from "./slice/registerSlice"
import userReducer from "./slice/userSlice";
import cart from "./slice/cart";

export const store = configureStore({
    reducer:{
        products,
        register: registerSlice,
        user : userReducer,
        cart
    }
})