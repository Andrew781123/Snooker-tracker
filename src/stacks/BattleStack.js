import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewBattleScreen from "../screens/NewBattleScreen";
import BattleScreen from "../screens/BattleScreen";
import BattleResultScreen from "../screens/BattleResultScreen";

const Stack = createStackNavigator();

const BattleStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerLeft: null }}>
      <Stack.Screen
        name='New_Battle'
        component={NewBattleScreen}
        options={{ title: "New Battle" }}
      />
      <Stack.Screen name='Battle' component={BattleScreen} />
      <Stack.Screen
        name='Battle_Result'
        component={BattleResultScreen}
        options={{ title: "Results" }}
      />
    </Stack.Navigator>
  );
};

export default BattleStack;
