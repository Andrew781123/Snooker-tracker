import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import api from "../../api/tracker";
import AsyncStorage from "@react-native-community/async-storage";

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
    try {
      const res = await api.get("/users/current");

      dispatch({ type: "GET_CURRENT_USER", user: res.data.user });
    } catch (err) {
      console.log(err);
    }
  };

  const register = async ({ username, password }) => {
    try {
      const res = await api.post("/auth/register", { username, password });

      await saveToken(res.data.token);

      dispatch({ type: "REGISTER", token: res.data.token });
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

      dispatch({ type: "LOGIN", token: res.data.token });
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAIL", errMsg: "Something wrong :(" });
    }
  };

  const tryLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "LOGIN", token });
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
        getCurrentUser
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
