import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const articleFetch = createAsyncThunk(
  "products/articleFetch",
  async () => {
    try {
      const res = await fetch("http://localhost:9005/api/v1/articles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      throw "Erreur lors de la récupération des articles: " + error;
    }
  }
);

export const updateArticle = createAsyncThunk(
  "products/updateArticle",
  async ({ id, updatedData }) => {
    try {
      const res = await fetch(
        `http://localhost:9005/api/v1/admin/articles/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
          credentials: "include",
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      throw "Erreur lors de la mise à jour de l'article: " + error;
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "products/deleteArticle",
  async (id) => {
    try {
      const res = await fetch(
        `http://localhost:9005/api/v1/admin/articles/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      throw "Erreur lors de la suppression de l'article: " + error;
    }
  }
);

export const createArticle = createAsyncThunk(
  "products/createArticle",
  async (articleData) => {
    try {
      const formData = new FormData();
      for (const key in articleData) {
        formData.append(key, articleData[key]);
      }

      const res = await fetch("http://localhost:9005/api/v1/admin/articles", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article:", error);
      throw "Erreur lors de l'ajout de l'article: " + error;
    }
  }
);


const initialState = {
  items: [], 
  isLoading: false, 
  error: null, 
};


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createCartItem: (state, action) => {
      const { id } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(articleFetch.pending, (state, action) => {
        state.isLoading = true;
        console.log(state.isLoading)
      })
      .addCase(articleFetch.fulfilled, (state, action) => {
        
        state.isLoading = false;
        state.items = action.payload; 
        console.log(state.items)
      })
      .addCase(articleFetch.rejected, (state, action) => {
        
        state.error = action.error.message; 
        state.isLoading = false;
      })
      .addCase(updateArticle.pending, (state) => {
        
        state.isLoading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        
        state.isLoading = false;
        const updatedArticle = action.payload;
        console.log(updatedArticle) 
        const existingArticleIndex = state.items.findIndex(
          (article) => article.ID === updatedArticle.ID
        );
        if (existingArticleIndex !== -1) {
          state.items[existingArticleIndex] = updatedArticle; 
        }
      })
      .addCase(updateArticle.rejected, (state, action) => {
        
        state.error = action.error.message; 
        state.isLoading = false;
      })
      .addCase(deleteArticle.pending, (state) => {
        
        state.isLoading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
       
        state.isLoading = false;
        const deletedArticleId = action.payload.id; 
        state.items = state.items.filter(
          (article) => article.id !== deletedArticleId
        ); 
      })
      .addCase(deleteArticle.rejected, (state, action) => {
       
        state.error = action.error.message; 
        state.isLoading = false;
      })
      .addCase(createArticle.pending, (state) => {
       
        state.isLoading = true;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
      
        state.isLoading = false;
        const newArticle = action.payload; 
        state.items.push(newArticle); 
      })
      .addCase(createArticle.rejected, (state, action) => {
        
        state.error = action.error.message; 
        state.isLoading = false;
      });
  },
});

export const { createCartItem } = productsSlice.actions;
export default productsSlice.reducer;
