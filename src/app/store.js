import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";

const store = configureStore({
  devTools: true,
  reducer: {
    auth: authSlice,
  },
});

export default store;
