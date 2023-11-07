import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  user: {
    id: null,
    email: "",
    username: "",
    branchId: null,
    roleId: null,
    avatar: "",
  },
  isLogin: false,
};

export const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, email, username, branchId, roleId, avatar } = action.payload;

      state.user = {
        id,
        email,
        username,
        branchId,
        roleId,
        avatar,
      };
    },
    loginSuccess: (state, action) => {
      state.isLogin = true;
    },
    logoutSuccess: (state, action) => {
      state.isLogin = false;
      localStorage.removeItem("token");
    },
    keepLoginSuccess: (state) => {
      state.isLogin = true;
    },
  },
});

export const login = (email, password) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", res?.data?.data?.token);
    dispatch(setUser(res?.data?.data?.user));
    dispatch(loginSuccess());
  };
};

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/auth/keep-login`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setUser(res?.data?.data));
        dispatch(keepLoginSuccess());
      }
    } catch (err) {
      localStorage.removeItem("token");
      alert(err?.response?.data);
    }
  };
};

export const { loginSuccess, logoutSuccess, setUser, keepLoginSuccess } =
  AuthReducer.actions;

export default AuthReducer.reducer;
