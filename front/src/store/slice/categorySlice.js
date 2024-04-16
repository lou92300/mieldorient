import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const categoryFetch = createAsyncThunk(
  "products/categoryFetch", // Nom de l'action
  async () => { // Fonction asynchrone pour effectuer la requête
    try {
      const res = await fetch("http://localhost:9005/api/v1/categories", { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json(); // Récupération des données JSON de la réponse
      return data; // Retourne les données pour les reducers
    } catch (error) {
      throw new Error("Erreur lors de la récupération des catégories: " + error.message); // Lance une erreur en cas d'échec
    }
  }
);

export const updateCategory = createAsyncThunk(
  "products/updateCategory", // Nom de l'action
  async ({ id, updatedData }) => { // Fonction asynchrone pour effectuer la requête avec l'ID de l'article et les données mises à jour
    try {
      const res = await fetch(`http://localhost:9005/api/v1/admin/categories/${id}`, { // Requête PATCH vers l'API
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // Corps de la requête contenant les données mises à jour
        credentials: 'include', // Inclusion des informations d'identification
      });
      const data = await res.json(); // Récupération des données JSON de la réponse
      return data; // Retourne les données pour les reducers
    } catch (error) {
      throw new Error("Erreur lors de la mise à jour de l'article: " + error.message); // Lance une erreur en cas d'échec
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "products/deleteArticle", // Nom de l'action
  async (id) => { // Fonction asynchrone pour effectuer la requête avec l'ID de l'article
    try {
      const res = await fetch(`http://localhost:9005/api/v1/admin/categories/${id}`, { // Requête DELETE vers l'API
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Inclusion des informations d'identification
      });
      const data = await res.json(); // Récupération des données JSON de la réponse
      return data; // Retourne les données pour les reducers
    } catch (error) {
      throw new Error("Erreur lors de la suppression de l'article: " + error.message); // Lance une erreur en cas d'échec
    }
  }
);

const categorySlice = createSlice({
  name: 'categories', // Nom de la slice
  initialState: {
    categories: [], // État initial : tableau vide pour stocker les catégories
    loading: false, // État initial du chargement
    error: null, // État initial des erreurs
  },
  reducers: {}, // Les reducers peuvent être ajoutés ici si nécessaire
  extraReducers: (builder) => {
    builder
      .addCase(categoryFetch.pending, (state) => { // Action en cours d'exécution
        state.loading = true; // Mettre loading à true
        state.error = null; // Effacer les erreurs
      })
      .addCase(categoryFetch.fulfilled, (state, action) => { // Action terminée avec succès
        state.loading = false; // Mettre loading à false
        state.categories = action.payload; // Mettre à jour les catégories avec les données récupérées
      })
      .addCase(categoryFetch.rejected, (state, action) => { // Action terminée avec une erreur
        state.loading = false; // Mettre loading à false
        state.error = action.error.message; // Mettre à jour l'erreur avec le message d'erreur
      })
      .addCase(updateCategory.pending, (state) => { // En attente de la mise à jour de l'article
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => { // Succès de la mise à jour de l'article
        state.loading = false;
        const updatedCategory = action.payload; // Catégorie mise à jour
        const existingCategoryIndex = state.categories.findIndex(category => category.ID === updatedCategory.ID);
        if (existingCategoryIndex !== -1) {
          state.categories[existingCategoryIndex] = updatedCategory; // Met à jour la catégorie dans l'état
        }
      })
      .addCase(updateCategory.rejected, (state, action) => { // Échec de la mise à jour de l'article
        state.error = action.error.message; // Gère l'erreur
        state.loading = false;
      })
      .addCase(deleteCategory.pending, (state) => { // En attente de la suppression de l'article
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => { // Succès de la suppression de l'article
        state.loading = false;
        const deletedCategoryId = action.payload.id; // ID de l'article supprimé
        state.categories = state.categories.filter(category => category.id !== deletedCategoryId); // Supprime l'article de l'état
      })
      .addCase(deleteCategory.rejected, (state, action) => { // Échec de la suppression de l'article
        state.error = action.error.message; // Gère l'erreur
        state.loading = false;
      })
  },
});

export default categorySlice.reducer; // Exportez le reducer de la slice