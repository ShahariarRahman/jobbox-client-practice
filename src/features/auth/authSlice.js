import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
const initialState = {
  user: {
    email: "",
    role: "",
  },
  isLoading: false,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);
export const signOutUser = createAsyncThunk("auth/signOutUser", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(createUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user = { email: "", role: "" };
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(signOutUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.user = { email: "", role: "" };
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
