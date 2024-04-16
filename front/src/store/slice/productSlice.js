import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action asynchrone pour récupérer tous les articles
export const articleFetch = createAsyncThunk(
  "products/articleFetch", // Nom de l'action
  async () => { // Fonction asynchrone pour effectuer la requête
    try {
      const res = await fetch("http://localhost:9005/api/v1/articles", { // Requête GET vers l'API
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json(); // Récupération des données JSON de la réponse
      return data; // Retourne les données pour les reducers
    } catch (error) {
      throw new Error("Erreur lors de la récupération des articles: " + error.message); // Lance une erreur en cas d'échec
    }
  }
);

// Action asynchrone pour mettre à jour un article
export const updateArticle = createAsyncThunk(
  "products/updateArticle", // Nom de l'action
  async ({ id, updatedData }) => { // Fonction asynchrone pour effectuer la requête avec l'ID de l'article et les données mises à jour
    try {
      const res = await fetch(`http://localhost:9005/api/v1/admin/articles/${id}`, { // Requête PATCH vers l'API
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

// Action asynchrone pour supprimer un article
export const deleteArticle = createAsyncThunk(
  "products/deleteArticle", // Nom de l'action
  async (id) => { // Fonction asynchrone pour effectuer la requête avec l'ID de l'article
    try {
      const res = await fetch(`http://localhost:9005/api/v1/admin/articles/${id}`, { // Requête DELETE vers l'API
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



export const createArticle = createAsyncThunk(
  "products/createArticle", 
  async (articleData) => { // Fonction asynchrone pour effectuer la requête avec les données de l'article
    try {
      const formData = new FormData();
      for (const key in articleData) {
        formData.append(key, articleData[key]);
      }

      const res = await fetch("http://localhost:9005/api/v1/admin/articles", { // Requête POST vers l'API
        method: "POST",
        body: formData, // Utilisation de FormData pour envoyer les données
        credentials: 'include', // Inclusion des informations d'identification
      });
      const data = await res.json(); // Récupération des données JSON de la réponse
      return data; // Retourne les données pour les reducers
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article:", error);
      throw new Error("Erreur lors de l'ajout de l'article: " + error.message); // Lance une erreur en cas d'échec
    }
  }
);

// Définition de l'état initial de la slice
const initialState = {
  items: [], // Tableau des articles
  isLoading: false, // Indicateur de chargement
  error: null, // Gestion des erreurs
};

// Définition de la slice
const productsSlice = createSlice({
  name: "products", // Nom de la slice
  initialState, // État initial
  reducers: { // Reducers synchrones
    createCartItem: (state, action) => { // Créer un élément du panier
      const { id } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.picked = true;
      }
    },
  },
  extraReducers: (builder) => { // Reducers pour les actions asynchrones
    builder
      .addCase(articleFetch.pending, (state, action) => { // En attente de la récupération des articles
        state.isLoading = true;
      })
      .addCase(articleFetch.fulfilled, (state, action) => { // Succès de la récupération des articles
        state.isLoading = false;
        state.items = action.payload; // Met à jour les articles dans l'état
      })
      .addCase(articleFetch.rejected, (state, action) => { // Échec de la récupération des articles
        state.error = action.error.message; // Gère l'erreur
        state.isLoading = false;
      })
      .addCase(updateArticle.pending, (state) => { // En attente de la mise à jour de l'article
        state.isLoading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => { // Succès de la mise à jour de l'article
        state.isLoading = false;
        const updatedArticle = action.payload; // Article mis à jour
        const existingArticleIndex = state.items.findIndex(article => article.ID === updatedArticle.ID);
        if (existingArticleIndex !== -1) {
          state.items[existingArticleIndex] = updatedArticle; // Met à jour l'article dans l'état
        }
      })
      .addCase(updateArticle.rejected, (state, action) => { // Échec de la mise à jour de l'article
        state.error = action.error.message; // Gère l'erreur
        state.isLoading = false;
      })
      .addCase(deleteArticle.pending, (state) => { // En attente de la suppression de l'article
        state.isLoading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => { // Succès de la suppression de l'article
        state.isLoading = false;
        const deletedArticleId = action.payload.id; // ID de l'article supprimé
        state.items = state.items.filter(article => article.id !== deletedArticleId); // Supprime l'article de l'état
      })
      .addCase(deleteArticle.rejected, (state, action) => { // Échec de la suppression de l'article
        state.error = action.error.message; // Gère l'erreur
        state.isLoading = false;
      })
      .addCase(createArticle.pending, (state) => { // En attente de l'ajout de l'article
        state.isLoading = true;
      })
      .addCase(createArticle.fulfilled, (state, action) => { // Succès de l'ajout de l'article
        state.isLoading = false;
        const newArticle = action.payload; // Nouvel article ajouté
        state.items.push(newArticle); // Ajoute le nouvel article à la liste des articles dans l'état
      })
      .addCase(createArticle.rejected, (state, action) => { // Échec de l'ajout de l'article
        state.error = action.error.message; // Gère l'erreur
        state.isLoading = false;
      });
  },
});

// Exportation des actions et du reducer
export const { createCartItem } = productsSlice.actions;
export default productsSlice.reducer;