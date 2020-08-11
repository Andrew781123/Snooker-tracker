import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MatchStatsItem = props => {
  const { playerOneData, playerTwoData, category } = props;

  return (
    <View style={styles.statsItemContainer}>
      <Text>{playerOneData}</Text>
      <Text style={styles.categoryText}>{category}</Text>
      <Text>{playerTwoData}</Text>
    </View>
  );
};

export default MatchStatsItem;

const styles = StyleSheet.create({
  statsItemContainer: {
    flexDirection: "row",
    marginBottom: 8
  },
  categoryText: {
    fontWeight: "bold",
    marginRight: 15,
    marginLeft: 15,
    width: "50%",
    textAlign: "center"
  }
});
