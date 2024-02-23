import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { articleFetch } from "./productSlice";

// Action asynchrone pour ajouter un article au panier
export const addOneToCart = createAsyncThunk(
  "cart/addOneToCart",
  async (action, thunkAPI) => {
    await thunkAPI.dispatch(articleFetch()); // Appeler articleFetch pour obtenir les articles
    const storeState = thunkAPI.getState();
    const { items } = storeState.products; // Accéder aux articles
    const isAlreadyPresent = storeState.cart.cartItems.find(el => el.id === action);
    
    if (!isAlreadyPresent) {
      const itemToAdd = items.find(el => el.ID === action);
    
      const newCartItem = {
        ...itemToAdd,
        quantity: 1
      };
    
      return newCartItem; // Retourner l'article à ajouter au panier
    }
  }
);

// Action pour supprimer un article du panier
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  (itemId, thunkAPI) => {
    const state = thunkAPI.getState();
    const updatedCartItems = state.cart.cartItems.filter(item => item.ID !== itemId);
    return updatedCartItems; // Retourner les articles mis à jour après suppression
  }
);

// Action pour mettre à jour la quantité d'un article dans le panier
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
    return updatedCartItems; // Retourner les articles mis à jour après la mise à jour de la quantité
  }
);

// Slice de réduction pour le panier
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
          state.cartItems.push(action.payload); // Ajouter l'article au panier
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload; // Mettre à jour les articles du panier après suppression
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload; // Mettre à jour les articles du panier après mise à jour de la quantité
      });
  },
});

export const { createCartItem } = cart.actions;
export default cart.reducer;