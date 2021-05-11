import React from "react";
import { StyleSheet, Text, View } from "react-native";
import balls from "../resources/ballInfo";
import Ball from "./Ball";
import HorizontalFlexBox from "./match/HorizontalFlexBox";

const ColorBalls = props => {
  const { handlePot, currentColor, frameWinner, startIndex = 0 } = props;

  return (
    <HorizontalFlexBox justifyContent='space-around'>
      {balls.map((ball, index) => {
        if (index >= startIndex)
          return (
            <Ball
              key={ball.score}
              color={ball.color}
              score={ball.score}
              frameWinner={frameWinner}
              handleClick={handlePot}
              currentColor={currentColor}
            />
          );
      })}
    </HorizontalFlexBox>
  );
};

const getCurrentColorScore = currentColor => {
  return balls.find(ball => ball.color === currentColor).score;
};

export default ColorBalls;

const styles = StyleSheet.create({});
