import React, { useEffect, useContext } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import authContext from "../context/auth/authContext";

const InitialLoadingScreen = () => {
  const { tryLogin } = useContext(authContext);

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default InitialLoadingScreen;
