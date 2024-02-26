// // Import des fonctions nécessaires depuis Redux Toolkit
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const  initialState = {
//   userInfo: { isLogged: false },
//   role: null,
//   // État initial contenant les informations de l'utilisateur
//   // userDeco : {isLogged : true},
//   status: 'idle', // Statut initial pour gérer les actions asynchrones
//   error: null, // Gestion des erreurs
// }
// // Création d'un "slice" pour gérer l'état de l'utilisateur
// const userSlice = createSlice({
//   name: 'data', // Nom du "slice"
//   initialState,
//   reducers: {
//     // "Reducer" pour mettre à jour le statut de l'utilisateur
//     updateStatus(state, action) {
//       state.userInfo.isLogged = true; // Met à jour le statut de connexion à true
//       // state.userDeco.isLogged = false;
//       state.userInfo.username = action.payload.username;
//       state.userInfo.role = action.payload.role // Stocke le nom d'utilisateur dans l'état
//     },
//     handleLogout(state,action){
//       state.userInfo.isLogged = false;
//       state.userInfo.username = null;
//       state.userInfo.role = null;
//     }
//   },
// });

// // Exporte l'action générée automatiquement
// export const { updateStatus, handleLogout } = userSlice.actions;

// // Exporte le réducteur généré automatiquement
// export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    isLogged: false,
    ID: null,
    username: null,
    role: null
  },
  status: 'idle',
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateStatus(state, action) {
      state.userInfo.isLogged = true;
      state.userInfo.ID = action.payload.ID;
      state.userInfo.username = action.payload.username;
      state.userInfo.role = action.payload.role;
    },
    handleLogout(state) {
      state.userInfo.isLogged = false;
      state.userInfo.id = null;
      state.userInfo.username = null;
      state.userInfo.role = null;
    }
  },
});

export const { updateStatus, handleLogout } = userSlice.actions;

export default userSlice.reducer;