import React from "react";
import { StyleSheet, View } from "react-native";
import Ball from "./Ball";
import ColorBalls from "./ColorBalls";
import balls from "../resources/ballInfo";

const Balls = props => {
  const {
    isRedNext,
    isFreeBall,
    foulOption,
    frameWinner,
    currentColor,
    redsRemaining,
    handleFoul,
    handlePot,
    handleSafety,
    handleMiss,
    updateFoulPoint,
    removeReds,
    handleForcedPlayOn,
    handlePutBack,
    handlePlaysOn,
    handleFreeBall,
    handleNonFreeBall,
    handleFreeBallPot,
    handleFreeBallMiss,
    handleFreeBallFoul,
    handleFreeBallSafety
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
        return balls;
      }
      case "DETERMINE_MISS": {
        return (
          <>
            <Ball
              text='Miss'
              frameWinner={frameWinner}
              handleClick={handleMissFoul}
              currentColor={currentColor}
            />
            <Ball
              text='Not a miss'
              frameWinner={frameWinner}
              handleClick={handleNotMissFoul}
              currentColor={currentColor}
            />
          </>
        );
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
        return balls;
      }
      case "FOUL_FOLLOWUP_ACTIONS": {
        return (
          <>
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
          </>
        );
      }

      case "DETERMINE_FREE_BALL": {
        return (
          <>
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
          </>
        );
      }
    }
  } else if (isFreeBall) {
    const freeBallPoint = currentColor ? getCurrentColorScore(currentColor) : 1;
    return (
      <>
        <Ball
          text='foul'
          frameWinner={frameWinner}
          handleClick={handleFreeBallFoul}
          currentColor={currentColor}
        />
        <Ball
          text='Potted free ball'
          score={freeBallPoint}
          frameWinner={frameWinner}
          handleClick={handleFreeBallPot}
          currentColor={currentColor}
        />
        <Ball
          text='safety'
          frameWinner={frameWinner}
          handleClick={handleFreeBallSafety}
          currentColor={currentColor}
        />
        <Ball
          text='miss'
          frameWinner={frameWinner}
          handleClick={handleFreeBallMiss}
          currentColor={currentColor}
        />
      </>
    );
  } else if (currentColor && currentColor !== "game-over") {
    const currentColorScore = getCurrentColorScore(currentColor);
    return (
      <>
        <Ball
          text='foul'
          frameWinner={frameWinner}
          handleClick={handleFoul}
          currentColor={currentColor}
        />
        <Ball
          color={currentColor}
          score={currentColorScore}
          frameWinner={frameWinner}
          handleClick={handlePot}
          currentColor={currentColor}
        />
        <Ball
          text='safety'
          frameWinner={frameWinner}
          handleClick={handleSafety}
        />
        <Ball
          text='miss'
          frameWinner={frameWinner}
          handleClick={handleMiss}
          currentColor={currentColor}
        />
      </>
    );
  } else if (isRedNext)
    return (
      <>
        <Ball
          text='foul'
          frameWinner={frameWinner}
          handleClick={handleFoul}
          currentColor={currentColor}
        />

        <Ball
          text='safety'
          frameWinner={frameWinner}
          handleClick={handleSafety}
        />
        <Ball
          text='miss'
          frameWinner={frameWinner}
          handleClick={handleMiss}
          currentColor={currentColor}
        />
      </>
    );
  else if (!isRedNext)
    return (
      <ColorBalls
        handlePot={handlePot}
        handleFoul={handleFoul}
        handleSafety={handleSafety}
        handleMiss={handleMiss}
        frameWinner={frameWinner}
        currentColor={currentColor}
      />
    );
};

const getCurrentColorScore = currentColor => {
  return balls.find(ball => ball.color === currentColor).score;
};

export default Balls;
