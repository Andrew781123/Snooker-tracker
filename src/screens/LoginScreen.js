import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const LoginScreen = props => {
  const { navigation } = props;

  return (
    <View>
      <Text>Login</Text>
      <Button
        title='Register'
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
