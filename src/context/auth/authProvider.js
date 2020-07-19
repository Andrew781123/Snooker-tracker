import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import api from "../../api/tracker";

const initialState = {
  token: null,
  loading: null,
  error: null
};

const authProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const register = async ({ username, password }) => {
    try {
      const res = await api.post("/auth/register", { username, password });

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
    try {
      const res = await api.post("/auth/login", { username, password });

      dispatch({ type: "LOGIN", token: res.data.token });
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAIL", errMsg: "Something wrong :(" });
    }
  };

  const logout = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <authContext.Provider value={{ authState, login, logout, register }}>
      {children}
    </authContext.Provider>
  );
};

export default authProvider;
