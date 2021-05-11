import React, { useContext } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "./MainStack";
import authContext from "../context/auth/authContext";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import InitialLoadingScreen from "../screens/InitialLoadingScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import { startClock } from "react-native-reanimated";
import InitialSetupScreen from "../screens/InitialSetupScreen";

const Stack = createStackNavigator();

const RootStack = () => {
  const { authState } = useContext(authContext);
  const { token, loadingToken, authLoading, user } = authState;

  if (loadingToken || authLoading) {
    return <InitialLoadingScreen />;
  }

  // if (!user.user_info.isSet) {
  //   return (
  //     <Stack.Navigator headerMode='none'>
  //       <Stack.Screen name='Initial_Setup' component={InitialSetupScreen} />
  //     </Stack.Navigator>
  //   );
  // }

  return token ? (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Main' component={MainStack} />
      <Stack.Screen name='User_Profile' component={UserProfileScreen} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{ headerLeft: null, headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
