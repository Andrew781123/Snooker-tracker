import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SetupForm from "../components/Forms/SetupForm";

const InitialSetupScreen = () => {
  return (
    <View style={styles.setupContainer}>
      <SetupForm />
    </View>
  );
};

export default InitialSetupScreen;

const styles = StyleSheet.create({
  setupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
