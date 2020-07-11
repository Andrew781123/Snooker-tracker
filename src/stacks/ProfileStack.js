import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfileScreen from "../screens/UserProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='User_Profile'
        component={UserProfileScreen}
        options={{ title: "Profile" }}
      />
      <Stack.Screen name='Settings' component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
