import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action creator as createAsyncThunk
export const articleFetch = createAsyncThunk("product/articleproduct", async () => {
  try {
    const res = await fetch("http://localhost:9005/api/v1/articles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching articles: " + error.message);
  }
});

const initialState = {
  items: [],
  isLoading: false,
  error: null
};

// Slice definition
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Action creator for creating a cart item
    createCartItem: (state, action) => {
      const { id } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.picked = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(articleFetch.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(articleFetch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(articleFetch.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
});

// Export actions and reducer
export const { createCartItem } = productsSlice.actions;
export default productsSlice.reducer;

