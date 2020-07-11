import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import authContext from "../context/auth/authContext";

const LoginScreen = props => {
  const { navigation } = props;

  const { login } = useContext(authContext);

  const handleLogin = () => {
    login();
  };

  return (
    <View>
      <Text>Login</Text>
      <Button
        title='Register'
        onPress={() => navigation.navigate("Register")}
      />
      <Button title='Login' onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
