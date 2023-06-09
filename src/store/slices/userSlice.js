import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../api/axios-utils";

export const initialState = {
  loading: false,
  users: [],
  error: "",
};

export const fetchusers = createAsyncThunk("user/fetchUsers", () => {
  return request({ url: "/users", method: "GET" }).then(
    (response) => response?.data
  );
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchusers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchusers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchusers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
