import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  user: {
    email: "",
    role: "",
  },
  isLoading: true,
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
export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  const googleProvider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, googleProvider);
  return data.user.email;
});

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
  try {
    const res = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${email}`);
    const data = await res.json();
    if (data?.status) {
      return data;
    }
  } catch (error) {
    return email;
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
    toggleLoading: (state, action) => {
      state.isLoading = false;
    },
  },
  extraReducers: (build) => {
    build
      // create account
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
      // logout
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
      // login: email Password
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
      // login: google account
      .addCase(googleLogin.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.user = { email: "", role: "" };
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      // get user: from database
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload?.status) {
          state.user = action.payload.data;
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

export const { toggleError, toggleLoading } = authSlice.actions;
export default authSlice.reducer;
