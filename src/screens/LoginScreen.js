import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import authContext from "../context/auth/authContext";
import { Input, Text, Button } from "react-native-elements";
import ErrorMessage from "../shared/ErrorMessage";

const LoginScreen = props => {
  const { navigation } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, authState } = useContext(authContext);
  const { error } = authState;

  const handleLogin = () => {
    login({ username, password });
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
        label='Create new password'
        value={password}
        onChangeText={text => setPassword(text)}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry
      />
      <Button title='Login' onPress={handleLogin} />
      <Button
        title='Register'
        onPress={() => navigation.navigate("Register")}
      />
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
