import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";

const initialState = {
  isLoggedIn: false,
  loading: null
};

const authProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const signIn = () => {
    dispatch({ type: "SIGN_IN" });
  };

  return (
    <authContext.Provider value={{ authState, signIn }}>
      {children}
    </authContext.Provider>
  );
};

export default authProvider;
