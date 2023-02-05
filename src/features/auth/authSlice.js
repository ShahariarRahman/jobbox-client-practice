import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
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
export const logOutUser = createAsyncThunk("auth/logOutUser", async () => {
  await signOut(auth);
});

export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

export const getUser = createAsyncThunk("auth/getUser", async (email) => {
  const res = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${email}`);
  const data = await res.json();
  if (data.status) {
    return data;
  }
  return email;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleError: (state, action) => {
      state.isError = false;
    },
  },
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
      .addCase(logOutUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.user = { email: "", role: "" };
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(logInUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.user = { email: "", role: "" };
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.user = action.payload;
        } else {
          state.user.email = action.payload;
        }
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = { email: "", role: "" };
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { toggleError } = authSlice.actions;
export default authSlice.reducer;
