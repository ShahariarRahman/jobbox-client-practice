import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  devTools: true,
  reducer: {},
});

export default store;
