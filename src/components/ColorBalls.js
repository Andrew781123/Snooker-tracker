import React from "react";
import { StyleSheet, Text, View } from "react-native";
import balls from "../resources/ballInfo";
import Ball from "./Ball";

const ColorBalls = props => {
  const {
    handlePot,
    handleMiss,
    handleSafety,
    handleFoul,
    currentColor,
    frameWinner
  } = props;

  return (
    <View style={styles.balls}>
      <Ball
        text='foul'
        handleClick={handleFoul}
        frameWinner={frameWinner}
        currentColor={currentColor}
      />
      {balls.map(ball => (
        <Ball
          key={ball.score}
          color={ball.color}
          score={ball.score}
          frameWinner={frameWinner}
          handleClick={handlePot}
          currentColor={currentColor}
        />
      ))}
      <Ball
        text='safety'
        frameWinner={frameWinner}
        handleClick={handleSafety}
        currentColor={currentColor}
      />
      <Ball
        text='miss'
        frameWinner={frameWinner}
        handleClick={handleMiss}
        currentColor={currentColor}
      />
    </View>
  );
};

export default ColorBalls;

const styles = StyleSheet.create({
  balls: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
});
