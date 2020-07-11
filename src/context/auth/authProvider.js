import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";

const initialState = {
  isLoggedIn: false,
  loading: null
};

const authProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = () => {
    dispatch({ type: "SIGN_IN" });
  };

  const logout = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <authContext.Provider value={{ authState, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export default authProvider;
