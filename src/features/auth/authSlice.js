import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "",
    role: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (build) => {},
});

export default authSlice.reducer;
