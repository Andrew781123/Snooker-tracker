import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MatchStatsItem = props => {
  const { playerOneData, playerTwoData, category } = props;

  return (
    <View style={styles.statsItemContainer}>
      <Text style={styles.dataTextLeft}>{playerOneData}</Text>
      <Text style={styles.categoryText}>{category}</Text>
      <Text style={styles.dataTextRight}>{playerTwoData}</Text>
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
  },
  dataTextLeft: {
    position: "absolute",
    left: 0
  },
  dataTextRight: {
    position: "absolute",
    right: 0
  }
});
