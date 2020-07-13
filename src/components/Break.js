import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Break = props => {
  const { isPlayerOneTurn, currentBreak } = props;

  return (
    <View
      style={
        isPlayerOneTurn === true
          ? styles.p1Break
          : isPlayerOneTurn === false
          ? styles.p2Break
          : { display: "none" }
      }
    >
      <Text style={{ fontSize: 17, color: "white" }}>
        Break: {currentBreak}
      </Text>
    </View>
  );
};

export default Break;

const styles = StyleSheet.create({
  p1Break: {
    backgroundColor: "black",
    alignSelf: "flex-start"
  },
  p2Break: {
    backgroundColor: "black",
    alignSelf: "flex-end"
  }
});
