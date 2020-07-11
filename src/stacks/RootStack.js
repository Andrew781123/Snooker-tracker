import React, { useContext } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "./MainStack";
import BattleStack from "./BattleStack";
import authContext from "../context/auth/authContext";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();

const RootStack = () => {
  const { authState } = useContext(authContext);
  const { isLoggedIn } = authState;

  return isLoggedIn === true ? (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Main' component={MainStack} />
      <Stack.Screen name='Battle' component={BattleStack} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{ headerLeft: null }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
