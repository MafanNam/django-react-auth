import { createSlice } from "@reduxjs/toolkit";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { access, refresh } = action.payload;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      state.isAuthenticated = true;
      state.access = access;
      state.refresh = refresh;
    },
    loginFail(state) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
    },
    userLoadedSuccess(state, action) {
      state.user = action.payload;
    },
    userLoadedFail(state) {
      state.user = null;
    },
  },
});

export const { loginSuccess, loginFail, userLoadedSuccess, userLoadedFail } =
  authSlice.actions;

export default authSlice.reducer;
