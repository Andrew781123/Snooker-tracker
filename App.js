import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthProvider from "./src/context/auth/authProvider";
import GoalsProvider from "./src/context/goals/GoalsProvider";
import RootStack from "./src/stacks/RootStack";
import UserProvider from "./src/context/user/UserProvider";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <UserProvider>
          <GoalsProvider>
            <RootStack />
          </GoalsProvider>
        </UserProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
