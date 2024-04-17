
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:9005/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response) {
        const errorData = await response.json();
        throw (errorData);
      }

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;