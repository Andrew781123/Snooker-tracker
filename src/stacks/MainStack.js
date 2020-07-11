import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileStack from "./ProfileStack";
import DashBoardStack from "./DashBoardStack";

const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='DashBoard' component={DashBoardStack} />
      <Tab.Screen name='User_Profile' component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MainStack;
