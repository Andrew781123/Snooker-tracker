import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NonPotActionBalls from "./NonPotActionBalls";
import NonActionBalls from "./NonActionBalls";
import PotActionBalls from "./PotActionBalls";

const ActionButtons = props => {
  const {
    isRedNext,
    isFreeBall,
    foulOption,
    frameWinner,
    currentColor,
    redsRemaining,
    handlePot,
    nonPotActionHandler,
    foulOptionHandlers,
    handleFreeBallPot,
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
          <PotActionBalls
            isRedNext={isRedNext}
            isFreeBall={isFreeBall}
            handleFreeBallPot={handleFreeBallPot}
            handlePot={handlePot}
            currentColor={currentColor}
            frameWinner={frameWinner}
          />
          <NonPotActionBalls
            frameWinner={frameWinner}
            isFreeBall={isFreeBall}
            currentColor={currentColor}
            {...nonPotActionHandler}
            {...freeBallNonPotHandlers}
          />
        </>
      )}
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({});
