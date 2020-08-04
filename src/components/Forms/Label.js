const { GestureHandlerRefContext } = require("@react-navigation/stack");

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Label = ({ label }) => {
  return <Text style={styles.label}>{label}</Text>;
};

export default Label;

const styles = StyleSheet.create({
  label: {
    color: "black",
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5
  }
});
