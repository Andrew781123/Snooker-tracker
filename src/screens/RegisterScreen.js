import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text, Icon } from "react-native-elements";
import authContext from "../context/auth/authContext";
import ErrorMessage from "../shared/ErrorMessage";
import useBlur from "../custome-hooks/useBlur";

const RegisterScreen = props => {
  const { navigation } = props;

  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const { register, authState, clearErrors } = useContext(authContext);
  const { error, authLoading } = authState;

  useBlur(clearErrors, navigation);

  const handleRegister = () => {
    register({ username, password: password1 });
  };

  return (
    <View style={styles.registerContainer}>
      {error && <ErrorMessage errorMessage={error} />}
      <Text h3 h3Style={{ textAlign: "center" }}>
        Register
      </Text>
      <Input
        placeholder='Enter User name'
        label='Username'
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={text => setUsername(text)}
      />
      <Input
        secureTextEntry
        placeholder='Enter password'
        label='Password'
        value={password1}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={text => setPassword1(text)}
      />
      <Input
        secureTextEntry
        placeholder='Enter password again'
        label='Enter password again'
        value={password2}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={text => setPassword2(text)}
      />
      <Button title='Register' onPress={handleRegister} loading={authLoading} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  errorMessage: {
    marginLeft: 5,
    color: "red"
  },
  registerContainer: {
    marginTop: 100,
    textAlign: "center"
  }
});
