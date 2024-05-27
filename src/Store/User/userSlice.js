import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Interceptor";
import Cookies from 'js-cookie'
export const handleSignup = createAsyncThunk(
  "user/handleSignup",
  async (reqBody, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/register`, reqBody);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "user/handleLogin",
  async (reqBody, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/login`, reqBody);
      Cookies.set('_token', response.data.token)
      return response.data; // Assume response contains user info including role
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleForgetPassword = createAsyncThunk(
  "user/handleForgetPassword",
  async (reqBody, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/forgot-password`, reqBody);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    signup_status: false,
    login_status: false,
    forget_status: false,
    error: null,
    cartModal: false,
  },
  reducers: {
    setCartModal: (state) => {
      state.cartModal = !state.cartModal;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSignup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = true;
      })
      .addCase(handleSignup.pending, (state) => {
        state.status = false;
      })
      .addCase(handleSignup.rejected, (state, action) => {
        state.status = true;
        state.error = action.payload;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        console.log(action.payload);
        // action.payload.user.role=1   //  for admin
        state.user = action.payload.user;
        state.login_status = true;
      })
      .addCase(handleLogin.pending, (state) => {
        state.status = false;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload;
      })
      .addCase(handleForgetPassword.fulfilled, (state, action) => {
        state.forget_status = true;
      })
      .addCase(handleForgetPassword.pending, (state) => {
        state.status = false;
      })
      .addCase(handleForgetPassword.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload;
      });
  },
});

export const { setCartModal, logout } = userSlice.actions;

export default userSlice.reducer;
