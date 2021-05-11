import React from "react";
import { StyleSheet, View } from "react-native";
import NonPotActionBalls from "./NonPotActionBalls";
import NonActionBalls from "./NonActionBalls";
import PotActionBalls from "./PotActionBalls";

const ActionButtons = props => {
  const {
    isRedNext,
    freeBallStage,
    freeBallPoint,
    foulOption,
    frameWinner,
    currentColor,
    redsRemaining,
    handlePot,
    nonPotActionHandler,
    foulOptionHandlers,
    handleFreeBallPot,
    handleFreeBallPotColor,
    freeBallNonPotHandlers
  } = props;

  return (
    <View>
      {foulOption ? (
        <NonActionBalls
          frameWinner={frameWinner}
          currentColor={currentColor}
          redsRemaining={redsRemaining}
          foulOption={foulOption}
          {...foulOptionHandlers}
        />
      ) : (
        <>
          <View style={styles.potActionBallsContainer}>
            <PotActionBalls
              isRedNext={isRedNext}
              freeBallStage={freeBallStage}
              handleFreeBallPot={handleFreeBallPot}
              handleFreeBallPotColor={handleFreeBallPotColor}
              handlePot={handlePot}
              currentColor={currentColor}
              frameWinner={frameWinner}
              freeBallPoint={freeBallPoint}
            />
          </View>
          <NonPotActionBalls
            frameWinner={frameWinner}
            freeBallStage={freeBallStage}
            currentColor={currentColor}
            redsRemaining={redsRemaining}
            {...nonPotActionHandler}
            {...freeBallNonPotHandlers}
          />
        </>
      )}
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  potActionBallsContainer: {
    marginBottom: 10
  }
});
