import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
    isUpdated: false,
  },

  reducers: {
    // user register
    registerUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    registerUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    registerUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },

    // user login
    loginUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    loginUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    loginUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    // user logout
    logoutUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = {};
      state.error = action.payload;
    },

    // user update
    updateUserRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
      state.isUpdated = true;
    },
    updateUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.isUpdated = false;
    },

    // update password
    updatePasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = null;
      state.message = action.payload.message;
      state.isUpdated = true;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.isUpdated = false;
    },

    // get user
    getUserRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = null;
      state.isUpdated = false;
    },
    getUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.isUpdated = false;
    },

    // logout
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.message = action.payload;
    },
    logoutFailded(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
    },

    // clear all error
    clearAllError(state, action) {
      state.error = null;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
    },
  },
});

import { userApi } from "../../Api";
import { data } from "react-router-dom";

export const register =
  (username, name, email, password) => async (dispatch) => {
    dispatch(userSlice.actions.registerUserRequest());
    try {
      const { data } = await userApi.post(
        `/register`,
        { username, name, email, password },
        { withCredentials: true },
      );

      dispatch(userSlice.actions.registerUserSuccess(data));
      dispatch(userSlice.actions.clearAllError());
    } catch (err) {
      dispatch(userSlice.actions.registerUserFailed(err.response.data.message));
    }
  };

export const login = (loginData) => async (dispatch) => {
  dispatch(userSlice.actions.loginUserRequest());
  try {
    const { data } = await userApi.post(`/login`, loginData, {
      withCredentials: true,
    });
    dispatch(userSlice.actions.loginUserSuccess(data));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    // console.log("AB");
    dispatch(userSlice.actions.loginUserFailed(error.response?.data?.message));
  }
};

export const updateUser = (name, email) => async (dispatch) => {
  dispatch(userSlice.actions.updateUserRequest());
  try {
    const { data } = await userApi.put(
      `/update`,
      { name, email },
      {
        withCredentials: true,
      },
    );
    dispatch(userSlice.actions.updateUserSuccess(data));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.updateUserFailed(error.response.data.message));
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
      const { data } = await userApi.put(
        `/update/password`,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(userSlice.actions.updatePasswordSuccess(data));
      dispatch(userSlice.actions.clearAllError());
    } catch (error) {
      dispatch(
        userSlice.actions.updatePasswordFailed(error.response.data.message),
      );
    }
  };

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.getUserRequest());
  try {
    const { data } = await userApi.get("/getSingleUser", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.getUserSuccess(data));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.getUserFailed(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await userApi.post("/logout", { withCredentials: true });
    // console.log(data);
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailded(error.response.data.message));
  }
};

export default userSlice.reducer;
