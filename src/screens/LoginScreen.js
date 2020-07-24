import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import authContext from "../context/auth/authContext";
import { Input, Text, Button } from "react-native-elements";
import ErrorMessage from "../shared/ErrorMessage";
import useBlur from "../custome-hooks/useBlur";

const LoginScreen = props => {
  const { navigation } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, authState, devLogin, clearErrors, tryLogin } = useContext(
    authContext
  );
  const { error, authLoading } = authState;

  useBlur(clearErrors, navigation);
  useEffect(() => {
    tryLogin();
  }, []);

  const handleLogin = () => {
    login({ username, password });
  };

  const handleDevLogin = () => {
    devLogin();
  };

  return (
    <View style={styles.loginContainer}>
      {error && <ErrorMessage errorMessage={error} />}
      <Text h3 h3Style={{ textAlign: "center" }}>
        Login
      </Text>
      <Input
        placeholder='Enter User name'
        label='Username'
        value={username}
        onChangeText={text => setUsername(text)}
        autoCapitalize='none'
        autoCorrect={false}
      />
      <Input
        placeholder='Enter password'
        label='Password'
        value={password}
        onChangeText={text => setPassword(text)}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry
      />
      <Button title='Login' onPress={handleLogin} loading={authLoading} />
      <Button
        title='Register'
        onPress={() => navigation.navigate("Register")}
      />
      <Button title='Dev Login' onPress={handleDevLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    textAlign: "center",
    marginTop: 100
  }
});
