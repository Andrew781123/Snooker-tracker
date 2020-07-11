import React from "react";
import { StyleSheet, Text, View } from "react-native";
import balls from "../resources/ballInfo";
import Ball from "./Ball";

const ColorBalls = props => {
  const { handlePot, handleMiss, handleFoul } = props;

  return (
    <View style={styles.balls}>
      <Ball color='gray' text='foul' handleClick={handleFoul} />
      {balls.map(ball => (
        <Ball
          key={ball.score}
          color={ball.color}
          score={ball.score}
          handleClick={handlePot}
        />
      ))}
      <Ball color='gray' text='miss' handleClick={handleMiss} />
    </View>
  );
};

export default ColorBalls;

const styles = StyleSheet.create({
  balls: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
