import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashBoardScreen from "../screens/DashBoardScreen";
import UserProfileScreen from "../screens/UserProfileScreen";

const Stack = createStackNavigator();

const DashBoardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='DashBoard' component={DashBoardScreen} />
      <Stack.Screen name='User_Profile' component={UserProfileScreen} />
    </Stack.Navigator>
  );
};

export default DashBoardStack;
