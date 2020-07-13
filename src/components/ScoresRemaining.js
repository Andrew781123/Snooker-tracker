import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ScoresRemaining = props => {
  const { scoreRemaining, p1Score, p2Score, isPlayerOneTurn } = props;

  const [diff, setDiff] = useState({
    diff: "",
    type: ""
  });

  useEffect(() => {
    if (isPlayerOneTurn) {
      const diff = p1Score - p2Score;
      let type = diff < 0 ? "bebind" : "ahead";
      setDiff({
        diff: Math.abs(diff),
        type
      });
    }
    if (isPlayerOneTurn === false) {
      const diff = p2Score - p1Score;
      let type = diff < 0 ? "bebind" : "ahead";
      setDiff({
        diff: Math.abs(diff),
        type
      });
    }
  }, [isPlayerOneTurn, p1Score, p2Score, scoreRemaining]);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        {diff.diff} {diff.type}, {scoreRemaining} remaining
      </Text>
    </View>
  );
};

export default ScoresRemaining;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "green"
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  }
});
