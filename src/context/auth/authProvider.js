import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import api from "../../api/tracker";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

const initialState = {
  token: null,
  loading: null,
  error: null,
  loadingToken: true,
  authLoading: false,
  user: null
};

const authProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const getCurrentUser = async () => {
    dispatch({ type: "SET_AUTH_LOADING" });
    try {
      const res = await api.get("/users/current");

      return res.data.user;
      // dispatch({ type: "GET_CURRENT_USER", user: res.data.user });
    } catch (err) {
      console.log(err);
    }
  };

  const register = async ({ username, password }) => {
    try {
      const res = await api.post("/auth/register", { username, password });

      await saveToken(res.data.token);

      dispatch({
        type: "REGISTER",
        token: res.data.token,
        user: res.data.user
      });
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: "REGISTER_FAIL",
        errMsg: "Something wrong with register"
      });
    }
  };

  const login = async ({ username, password }) => {
    dispatch({ type: "SET_AUTH_LOADING" });
    try {
      const res = await api.post("/auth/login", { username, password });

      await saveToken(res.data.token);

      dispatch({ type: "LOGIN", token: res.data.token, user: res.data.user });
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAIL", errMsg: "Something wrong :(" });
    }
  };

  const tryLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const user = await getCurrentUser();
      dispatch({ type: "LOGIN", token, user });
    } else {
      dispatch({ type: "SET_TRY_LOGIN" });
    }
  };

  const devLogin = () => {
    dispatch({ type: "DEV_LOGIN" });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "LOG_OUT" });
  };

  const clearErrors = () => {
    dispatch({ type: "CLEAR_ERRORS" });
  };

  const setupUser = async userInfo => {
    const userId = authState.user._id;

    const user_info = {
      isSet: true,
      favourite_player: userInfo.favouritePlayer,
      experience: getYearDiff(userInfo.yearStarted),
      bio: userInfo.bio
    };

    try {
      const res = await api.put(`/users/${userId.toString()}`, {
        user_info
      });

      dispatch({
        type: "SETUP_USER_SUCCESS",
        updatedUser: res.data.updatedUser
      });
    } catch (err) {
      dispatch({
        type: "SETUP_USER_FAIL",
        error: "Something wrong while updating user profile"
      });
    }
  };

  const getYearDiff = year => {
    const now = moment(new Date());
    const started = moment([year, 0, 1]);

    return now.diff(started, "years");
  };

  return (
    <authContext.Provider
      value={{
        authState,
        login,
        logout,
        register,
        devLogin,
        clearErrors,
        tryLogin,
        getCurrentUser,
        setupUser
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const saveToken = async token => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (err) {
    console.log(err);
  }
};

export default authProvider;
