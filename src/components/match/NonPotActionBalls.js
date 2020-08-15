import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ball from "../Ball";
import HorizontalFlexBox from "./HorizontalFlexBox";

const NonPotActionBalls = props => {
  const {
    frameWinner,
    handleFoul,
    currentColor,
    freeBallStage,
    handleSafety,
    handleMiss,
    handleFreeBallMiss,
    handleFreeBallFoul,
    handleFreeBallSafety
  } = props;

  return (
    <HorizontalFlexBox justifyContent='space-around'>
      <Ball
        text='foul'
        frameWinner={frameWinner}
        handleClick={freeBallStage ? handleFreeBallFoul : handleFoul}
        currentColor={currentColor}
      />
      <Ball
        text='safety'
        frameWinner={frameWinner}
        handleClick={freeBallStage ? handleFreeBallSafety : handleSafety}
        currentColor={currentColor}
      />
      <Ball
        text='miss'
        frameWinner={frameWinner}
        handleClick={freeBallStage ? handleFreeBallMiss : handleMiss}
        currentColor={currentColor}
      />
    </HorizontalFlexBox>
  );
};

export default NonPotActionBalls;

const styles = StyleSheet.create({});
