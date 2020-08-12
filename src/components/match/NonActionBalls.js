import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ball from "../Ball";
import SpaceAroundView from "./SpaceAroundView";

const NonActionBalls = props => {
  const {
    frameWinner,
    redsRemaining,
    currentColor,
    foulOption,
    foulOptionHandlers,
    updateFoulPoint,
    removeReds,
    handlePlaysOn,
    handlePutBack,
    handleForcedPlayOn,
    handleFreeBall,
    handleNonFreeBall
  } = props;

  if (foulOption) {
    switch (foulOption) {
      case "GET_FOUL_POINTS": {
        let balls = [];
        for (let i = 4; i <= 7; i++) {
          balls.push(
            <Ball
              key={i}
              text={i.toString()}
              score={i}
              frameWinner={frameWinner}
              handleClick={updateFoulPoint}
              currentColor={currentColor}
            />
          );
        }
        return <SpaceAroundView>{balls}</SpaceAroundView>;
      }
      case "GET_NUMBERS_OF_REDS_POTTED": {
        // score is number of reds here
        let balls = [];
        for (let i = 0; i <= 5; i++) {
          balls.push(
            <Ball
              key={i}
              score={i}
              text={i.toString()}
              frameWinner={frameWinner}
              handleClick={removeReds}
              currentColor={currentColor}
            />
          );
          if (i === redsRemaining) break;
        }
        return <SpaceAroundView>{balls}</SpaceAroundView>;
      }
      case "FOUL_FOLLOWUP_ACTIONS": {
        return (
          <SpaceAroundView>
            <Ball
              text='Play on'
              frameWinner={frameWinner}
              handleClick={handlePlaysOn}
              currentColor={currentColor}
            />
            <Ball
              text='Put back'
              frameWinner={frameWinner}
              handleClick={handlePutBack}
              currentColor={currentColor}
            />
            <Ball
              text='Force play on'
              frameWinner={frameWinner}
              handleClick={handleForcedPlayOn}
              currentColor={currentColor}
            />
          </SpaceAroundView>
        );
      }

      case "DETERMINE_FREE_BALL": {
        return (
          <SpaceAroundView>
            <Ball
              text='Yes'
              frameWinner={frameWinner}
              handleClick={handleFreeBall}
              currentColor={currentColor}
            />
            <Ball
              text='No'
              frameWinner={frameWinner}
              handleClick={handleNonFreeBall}
              currentColor={currentColor}
            />
          </SpaceAroundView>
        );
      }
    }
  } else {
    return null;
  }
};

export default NonActionBalls;

const styles = StyleSheet.create({});
