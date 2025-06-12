import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  user: null,
  isLoading: false,
  isUpdating: false,
};

export const fetchCurrentUser = createAsyncThunk(
  "global/fetchCurrentUser",
  async (thunkAPI) => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/api/v1/user/getCurrentUser",
        {
          withCredentials: true,
        }
      );

      if (status === 200) {
        return data.data;
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },
    resetGlobalState: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isLoading = false;
      state.isUpdating = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        console.error("Error fetching current user:", action.payload);
      });
  },
});

export const {
  setIsLoggedIn,
  setUser,
  setIsLoading,
  setIsUpdating,
  resetGlobalState,
} = globalSlice.actions;

export default globalSlice.reducer;
