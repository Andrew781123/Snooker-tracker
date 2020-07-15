import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GoalsScreen from "../screens/GoalsScreen";
import CompletetedGoalsScreen from "../screens/CompletetedGoalsScreen";

const Stack = createStackNavigator();

const GoalsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Goals' component={GoalsScreen} />
      <Stack.Screen name='Completed_Goals' component={CompletetedGoalsScreen} />
    </Stack.Navigator>
  );
};

export default GoalsStack;
