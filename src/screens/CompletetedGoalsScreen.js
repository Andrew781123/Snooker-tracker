import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Goals from "../components/goals/Goals";
import usePopToTop from "../custome-hooks/usePopToTop";

const CompletetedGoalsScreen = props => {
  const { navigation } = props;

  usePopToTop(navigation);

  return (
    <View>
      <Goals title='Completed Goals' showCompleted={true} />
    </View>
  );
};

export default CompletetedGoalsScreen;

const styles = StyleSheet.create({});
