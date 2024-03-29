import React, { useEffect, useContext, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyProfileStack from "./MyProfileStack";
import DashBoardStack from "./DashBoardStack";
import BattleStack from "./BattleStack";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import GoalsStack from "./GoalsStack";
import SearchStack from "./SearchStack";

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
          } else if (route.name === "Search") {
            color = focused ? "tomato" : "black";
            return <AntDesign name='search1' size={24} color={color} />;
          } else if (route.name === "Goals") {
            color = focused ? "tomato" : "black";
            return (
              <MaterialCommunityIcons name='target' size={24} color={color} />
            );
          } else if (route.name === "Battle") {
            color = focused ? "tomato" : "black";
            return (
              <MaterialCommunityIcons
                name='sword-cross'
                size={24}
                color={color}
              />
            );
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
      <Tab.Screen name='Search' component={SearchStack} />
      <Tab.Screen name='Battle' component={BattleStack} />
      <Tab.Screen name='Goals' component={GoalsStack} />
      <Tab.Screen name='User_Profile' component={MyProfileStack} />
    </Tab.Navigator>
  );
};

export default MainStack;
