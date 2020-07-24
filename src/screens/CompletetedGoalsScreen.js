import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Goals from "../components/goals/Goals";
import useBlur from "../custome-hooks/useBlur";
import { StackActions } from "@react-navigation/native";

const CompletetedGoalsScreen = props => {
  const { navigation } = props;

  useBlur(() => navigation.dispatch(StackActions.popToTop()), navigation);

  return (
    <View>
      <Goals title='Completed Goals' showCompleted={true} />
    </View>
  );
};

export default CompletetedGoalsScreen;

const styles = StyleSheet.create({});
