import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ColorBalls from "../ColorBalls";
import Ball from "../Ball";
import balls from "../../resources/ballInfo";

const PotActionBalls = props => {
  const {
    isRedNext,
    handlePot,
    currentColor,
    frameWinner,
    handleFreeBallPot,
    isFreeBall
  } = props;

  if (isFreeBall) {
    const freeBallPoint = currentColor ? getCurrentColorScore(currentColor) : 1;

    return (
      <Ball
        text='Potted free ball'
        score={freeBallPoint}
        frameWinner={frameWinner}
        handleClick={handleFreeBallPot}
        currentColor={currentColor}
      />
    );
  }

  if (currentColor) {
    const currentColorScore = getCurrentColorScore(currentColor);
    return (
      <>
        <Ball
          color={currentColor}
          score={currentColorScore}
          frameWinner={frameWinner}
          handleClick={handlePot}
          currentColor={currentColor}
        />
      </>
    );
  }

  if (isRedNext) {
    return (
      <Ball
        color='red'
        score={1}
        frameWinner={frameWinner}
        handleClick={handlePot}
        currentColor={currentColor}
      />
    );
  } else {
    return (
      <ColorBalls
        handlePot={handlePot}
        frameWinner={frameWinner}
        currentColor={currentColor}
      />
    );
  }
};

export default PotActionBalls;

const styles = StyleSheet.create({});

const getCurrentColorScore = currentColor => {
  return balls.find(ball => ball.color === currentColor).score;
};
