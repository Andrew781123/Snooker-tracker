import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ScoreBoard = props => {
  const {
    player_1Score,
    player_2Score,
    playerOneName,
    playerTwoName,
    frameNum
  } = props;

  return (
    <View style={styles.scoreBoard}>
      <Text style={{ ...styles.name, left: 3 }}>{playerOneName}</Text>
      <View style={styles.scores}>
        <Text style={{ fontSize: 20 }}>{player_1Score}</Text>
        <View style={styles.frameNum}>
          <Text style={{ fontSize: 20 }}>0</Text>
          <Text style={{ fontSize: 20 }}>({frameNum})</Text>
          <Text style={{ fontSize: 20 }}>0</Text>
        </View>
        <Text style={{ fontSize: 20 }}>{player_2Score}</Text>
      </View>
      <Text style={{ ...styles.name, right: 3 }}>{playerTwoName}</Text>
    </View>
  );
};

export default ScoreBoard;

const styles = StyleSheet.create({
  frameNum: {
    flexDirection: "row",
    alignItems: "center",
    borderRightColor: "grey",
    borderRightWidth: 3,
    borderLeftColor: "grey",
    borderLeftWidth: 3,
    paddingRight: 10,
    paddingLeft: 10,
    marginRight: 5,
    marginLeft: 5,
    height: 30
  },
  scoreBoard: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 30,
    backgroundColor: "orange"
  },
  name: {
    position: "absolute",
    fontSize: 20
  },
  scores: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
