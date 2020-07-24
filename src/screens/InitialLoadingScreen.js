import React, { useEffect, useContext } from "react";
import { Text } from "react-native";
import authContext from "../context/auth/authContext";

const InitialLoadingScreen = () => {
  const { tryLogin } = useContext(authContext);

  useEffect(() => {
    tryLogin();
  }, []);

  return null;
};

export default InitialLoadingScreen;
