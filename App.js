import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthProvider from "./src/context/auth/authProvider";
import RootStack from "./src/stacks/RootStack";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootStack />
      </AuthProvider>
    </NavigationContainer>
  );
}
