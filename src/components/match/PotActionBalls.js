import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ColorBalls from "../ColorBalls";
import Ball from "../Ball";
import balls from "../../resources/ballInfo";
import HorizontalFlexBox from "./HorizontalFlexBox";

const PotActionBalls = props => {
  const {
    isRedNext,
    handlePot,
    currentColor,
    frameWinner,
    handleFreeBallPot,
    handleFreeBallPotColor,
    freeBallStage,
    freeBallPoint
  } = props;

  if (freeBallStage) {
    switch (freeBallStage) {
      case "FREE_BALL": {
        return (
          <HorizontalFlexBox justifyContent='center'>
            <Ball
              text='Potted free ball'
              score={freeBallPoint}
              frameWinner={frameWinner}
              handleClick={handleFreeBallPot}
              currentColor={currentColor}
            />
          </HorizontalFlexBox>
        );
      }

      case "FREE_BALL_COLORS": {
        let startIndex = 0;
        for (let i = 0; i < balls.length; i++) {
          if (currentColor === balls[i].color) break;
          startIndex++;
        }

        return (
          <ColorBalls
            handlePot={handleFreeBallPotColor}
            currentColor={null}
            frameWinner={frameWinner}
            startIndex={startIndex}
          />
        );
      }
    }
  }

  if (currentColor) {
    const currentColorScore = getCurrentColorScore(currentColor);
    return (
      <HorizontalFlexBox justifyContent='center'>
        <Ball
          color={currentColor}
          score={currentColorScore}
          frameWinner={frameWinner}
          handleClick={handlePot}
          currentColor={currentColor}
        />
      </HorizontalFlexBox>
    );
  }

  if (isRedNext) {
    return (
      <HorizontalFlexBox justifyContent='center'>
        <Ball
          color='red'
          score={1}
          frameWinner={frameWinner}
          handleClick={handlePot}
          currentColor={currentColor}
        />
      </HorizontalFlexBox>
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
