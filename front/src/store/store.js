import {configureStore} from "@reduxjs/toolkit";
import products from "./slice/productSlice";
import categories from "./slice/categorySlice";
import registerSlice from "./slice/registerSlice";
import userReducer from "./slice/userSlice";
import cart from "./slice/cart";

export const store = configureStore({
    reducer:{
        products,
        categories,
        register: registerSlice,
        user : userReducer,
        cart
    }
})