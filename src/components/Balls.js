import React from "react";
import { StyleSheet, View } from "react-native";
import Ball from "./Ball";
import ColorBalls from "./ColorBalls";

const Balls = props => {
  const {
    isRedNext,
    frameWinner,
    currentColor,
    handleFoul,
    handlePot,
    handleSafety,
    handleMiss
  } = props;

  return (
    <View style={styles.balls}>
      {isRedNext ? (
        <>
          <Ball
            text='foul'
            frameWinner={frameWinner}
            handleClick={handleFoul}
            currentColor={currentColor}
          />
          <Ball
            color='red'
            score={1}
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
      ) : (
        <ColorBalls
          handlePot={handlePot}
          handleFoul={handleFoul}
          handleMiss={handleMiss}
          frameWinner={frameWinner}
          currentColor={currentColor}
        />
      )}
    </View>
  );
};

export default Balls;

const styles = StyleSheet.create({
  balls: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  }
});
