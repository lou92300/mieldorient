import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { articleFetch } from "./productSlice";


export const addOneToCart = createAsyncThunk(
  "cart/addOneToCart",
  async (action, thunkAPI) => {
    await thunkAPI.dispatch(articleFetch()); 
    const storeState = thunkAPI.getState();
    const { items } = storeState.products; 
    const isAlreadyPresent = storeState.cart.cartItems.find(el => el.id === action);
    
    if (!isAlreadyPresent) {
      const itemToAdd = items.find(el => el.ID === action);
    
      const newCartItem = {
        ...itemToAdd,
        quantity: 1
      };
    
      return newCartItem; 
    }
  }
);


export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  (itemId, thunkAPI) => {
    const state = thunkAPI.getState();
    const updatedCartItems = state.cart.cartItems.filter(item => item.ID !== itemId);
    return updatedCartItems; 
  }
);


export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  (payload, thunkAPI) => {
    const { itemId, newQuantity } = payload;
    const state = thunkAPI.getState();
    const updatedCartItems = state.cart.cartItems.map(item => {
      if (item.ID === itemId) {
        return {
          ...item,
          quantity: newQuantity
        };
      }
      return item;
    });
    return updatedCartItems; 
  }
);


const initialState = {
  cartItems: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    createCartItem: (state, action) => {
      state.cartItems.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOneToCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.cartItems.push(action.payload); 
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload; 
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload; 
      });
  },
});

export const { createCartItem } = cart.actions;
export default cart.reducer;