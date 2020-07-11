import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileStack from "./ProfileStack";
import DashBoardStack from "./DashBoardStack";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "DashBoard") {
            iconName = "home";
            color = focused ? "tomato" : "black";
          } else if (route.name === "User_Profile") {
            iconName = "user";
            color = focused ? "tomato" : "black";
          }

          // You can return any component that you like here!
          return <AntDesign name={iconName} size={24} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        showLabel: false
      }}
    >
      <Tab.Screen name='DashBoard' component={DashBoardStack} />
      <Tab.Screen name='User_Profile' component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MainStack;
