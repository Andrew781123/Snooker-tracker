import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Goals from "../components/goals/Goals";

const CompletetedGoalsScreen = () => {
  return (
    <View>
      <Goals title='Completed Goals' showCompleted={true} />
    </View>
  );
};

export default CompletetedGoalsScreen;

const styles = StyleSheet.create({});
