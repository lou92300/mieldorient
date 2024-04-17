import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const categoryFetch = createAsyncThunk(
  "products/categoryFetch",
  async () => { 
    try {
      const res = await fetch("http://localhost:9005/api/v1/categories", { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data; 
    } catch (error) {
      throw ("Erreur lors de la récupération des catégories: " + error); 
    }
  }
);

export const updateCategory = createAsyncThunk(
  "products/updateCategory", 
  async ({ id, updatedData }) => { 
    try {
      const res = await fetch(`http://localhost:9005/api/v1/admin/categories/${id}`, { 
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), 
        credentials: 'include', 
      });
      const data = await res.json(); 
      return data; 
    } catch (error) {
      throw ("Erreur lors de la mise à jour de l'article: " + error); 
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "products/deleteArticle", 
  async (id) => { 
    try {
      const res = await fetch(`http://localhost:9005/api/v1/admin/categories/${id}`, { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', 
      });
      const data = await res.json(); 
      return data; 
    } catch (error) {
      throw ("Erreur lors de la suppression de l'article: " + error); 
    }
  }
);

const categorySlice = createSlice({
  name: 'categories', 
  initialState: {
    categories: [], 
    loading: false, 
    error: null, 
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(categoryFetch.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(categoryFetch.fulfilled, (state, action) => { 
        state.loading = false; 
        state.categories = action.payload; 
      })
      .addCase(categoryFetch.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.error; 
      })
      .addCase(updateCategory.pending, (state) => { 
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCategory = action.payload;
        const existingCategoryIndex = state.categories.findIndex(category => category.ID === updatedCategory.ID);
        if (existingCategoryIndex !== -1) {
          state.categories[existingCategoryIndex] = updatedCategory; 
        }
      })
      .addCase(updateCategory.rejected, (state, action) => { 
        state.error = action.error.message; 
        state.loading = false;
      })
      .addCase(deleteCategory.pending, (state) => { 
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => { 
        state.loading = false;
        const deletedCategoryId = action.payload.id; 
        
        state.categories = state.categories.filter(category => category.id !== deletedCategoryId); 
      })
      .addCase(deleteCategory.rejected, (state, action) => { 
        state.error = action.error.message; 
        state.loading = false;
      })
  },
});

export default categorySlice.reducer; 