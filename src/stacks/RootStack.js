import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "./MainStack";
import authContext from "../context/auth/authContext";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import InitialLoadingScreen from "../screens/InitialLoadingScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import InitialSetupScreen from "../screens/InitialSetupScreen";

const Stack = createStackNavigator();

const RootStack = () => {
  const { authState } = useContext(authContext);
  const { token, loadingToken, authLoading, user } = authState;

  if (loadingToken || authLoading) {
    console.log(loadingToken, authLoading);
    return <InitialLoadingScreen />;
  } else {
    if (token) {
      if (!user.user_info.isSet) {
        return (
          <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Initial_Setup' component={InitialSetupScreen} />
          </Stack.Navigator>
        );
      } else {
        return (
          <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Main' component={MainStack} />
            <Stack.Screen name='User_Profile' component={UserProfileScreen} />
          </Stack.Navigator>
        );
      }
    } else {
      return (
        <Stack.Navigator
          screenOptions={{ headerLeft: null, headerShown: false }}
        >
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
      );
    }
  }
};

export default RootStack;
