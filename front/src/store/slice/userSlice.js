import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    isLogged: false,
    ID: null,
    username: null,
    role: null,
    firstname: null,
    email : null,
  },
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateStatus(state, action) {
      state.userInfo.isLogged = true;
      state.userInfo.ID = action.payload.ID;
      state.userInfo.username = action.payload.username;
      state.userInfo.role = action.payload.role;
      state.userInfo.firstname = action.payload.firstname;
      state.userInfo.email = action.payload.email
    },
    handleLogout(state) {
      state.userInfo.isLogged = false;
      state.userInfo.ID = null;
      state.userInfo.username = null;
      state.userInfo.role = null;

      fetch("http://localhost:9005/api/v1/logout", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Cookie deleted successfully.");
          } else {
            console.error("Failed to delete cookie.");
          }
        })
        .catch((error) => {
          console.error("Error deleting cookie:", error);
        });
    },
  },
});

export const { updateStatus, handleLogout } = userSlice.actions;

export default userSlice.reducer;
