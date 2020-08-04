import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyProfileScreen from "../screens/MyProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

const MyProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName='My_Profile'>
      <Stack.Screen
        name='My_Profile'
        component={MyProfileScreen}
        options={{
          title: "Profile",
          headerRightContainerStyle: {
            marginRight: 5
          }
        }}
      />

      <Stack.Screen name='Settings' component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default MyProfileStack;
