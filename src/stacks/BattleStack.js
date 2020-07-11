import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewBattleScreen from "../screens/NewBattleScreen";
import BattleScreen from "../screens/BattleScreen";
import BattleResultScreen from "../screens/BattleResultScreen";

const Stack = createStackNavigator();

const BattleStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerLeft: null }}>
      <Stack.Screen name='New_Battle' component={NewBattleScreen} />
      <Stack.Screen name='Battle' component={BattleScreen} />
      <Stack.Screen name='Battle_Result' component={BattleResultScreen} />
    </Stack.Navigator>
  );
};

export default BattleStack;
