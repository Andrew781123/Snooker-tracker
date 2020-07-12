import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Break = props => {
  const { isPlayerOneTurn, currentBreak } = props;

  return (
    <View style={isPlayerOneTurn === true ? styles.p1Break : styles.p2Break}>
      <Text style={{ fontSize: 17 }}>Break: {currentBreak}</Text>
    </View>
  );
};

export default Break;

const styles = StyleSheet.create({
  p1Break: {
    alignSelf: "flex-start"
  },
  p2Break: {
    alignSelf: "flex-end"
  }
});
