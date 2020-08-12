import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ball from "../Ball";
import SpaceAroundView from "./SpaceAroundView";

const NonPotActionBalls = props => {
  const {
    frameWinner,
    handleFoul,
    currentColor,
    isFreeBall,
    handleSafety,
    handleMiss,
    handleFreeBallMiss,
    handleFreeBallFoul,
    handleFreeBallSafety
  } = props;

  return (
    <SpaceAroundView>
      <Ball
        text='foul'
        frameWinner={frameWinner}
        handleClick={isFreeBall ? handleFreeBallFoul : handleFoul}
        currentColor={currentColor}
      />
      <Ball
        text='safety'
        frameWinner={frameWinner}
        handleClick={isFreeBall ? handleFreeBallSafety : handleSafety}
        currentColor={currentColor}
      />
      <Ball
        text='miss'
        frameWinner={frameWinner}
        handleClick={isFreeBall ? handleFreeBallMiss : handleMiss}
        currentColor={currentColor}
      />
    </SpaceAroundView>
  );
};

export default NonPotActionBalls;

const styles = StyleSheet.create({});
