import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthProvider from "./src/context/auth/authProvider";
import GoalsProvider from "./src/context/goals/GoalsProvider";
import RootStack from "./src/stacks/RootStack";
import InitialLoadingScreen from "./src/screens/InitialLoadingScreen";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <GoalsProvider>
          <RootStack />
        </GoalsProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
