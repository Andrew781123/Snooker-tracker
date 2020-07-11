import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashBoardScreen from "../screens/DashBoardScreen";

const Stack = createStackNavigator();

const DashBoardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='DashBoard' component={DashBoardScreen} />
    </Stack.Navigator>
  );
};

export default DashBoardStack;
