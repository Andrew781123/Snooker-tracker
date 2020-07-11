import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "./src/stacks/MainStack";
import BattleStack from "./src/stacks/BattleStack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Main' component={MainStack} />
        <Stack.Screen name='Battle' component={BattleStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
