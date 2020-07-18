import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StatItem = props => {
  const { category, data } = props;

  return (
    <View style={styles.stateItemContainer}>
      <Text style={[styles.text, styles.category]}>{category}: </Text>
      <Text style={[styles.text, styles.data]}>{data}</Text>
    </View>
  );
};

export default StatItem;

const styles = StyleSheet.create({
  stateItemContainer: {
    flexDirection: "row",
    backgroundColor: "#d6d6d6",
    flex: 1,
    padding: 5
  },
  category: {},
  data: {},
  text: {
    fontSize: 15
  }
});
