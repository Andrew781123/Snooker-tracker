import React from "react";
import { StyleSheet, Text, View } from "react-native";
import balls from "../resources/ballInfo";
import Ball from "./Ball";
import SpaceAroundView from "./match/SpaceAroundView";

const ColorBalls = props => {
  const { handlePot, currentColor, frameWinner } = props;

  return (
    <SpaceAroundView>
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
    </SpaceAroundView>
  );
};

export default ColorBalls;

const styles = StyleSheet.create({});
