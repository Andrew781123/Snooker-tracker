import React, { useState, useMemo } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { Button } from "react-native-elements";
import MatchStatsItem from "./MatchStatsItem";

const StatsModal = props => {
  const { playerOne, playerTwo, isShow, setIsShow } = props;

  const {
    name: name1,
    attempt: attempt1,
    ballsPotted: ballsPotted1,
    highestBreak: highestBreak1
  } = playerOne;

  const {
    name: name2,
    attempt: attempt2,
    ballsPotted: ballsPotted2,
    highestBreak: highestBreak2
  } = playerTwo;

  const handleModalClose = () => {
    setIsShow(false);
  };

  const { potSuccess1, potSuccess2 } = useMemo(() => {
    return {
      potSuccess1: convertToPercentage(getFraction(ballsPotted1, attempt1)),
      potSuccess2: convertToPercentage(getFraction(ballsPotted2, attempt2))
    };
  }, [ballsPotted1, ballsPotted2, attempt1, attempt2]);

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isShow}
      onRequestClose={handleModalClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <MatchStatsItem
            playerOneData={potSuccess1}
            playerTwoData={potSuccess2}
            category='Pot success'
          />
          <MatchStatsItem
            playerOneData={ballsPotted1}
            playerTwoData={ballsPotted2}
            category='Balls potted'
          />
          <MatchStatsItem
            playerOneData={highestBreak1}
            playerTwoData={highestBreak2}
            category='Highest break'
          />
          <MatchStatsItem
            playerOneData={ballsPotted1}
            playerTwoData={ballsPotted2}
            category='Balls potted'
          />
          <MatchStatsItem
            playerOneData={ballsPotted1}
            playerTwoData={ballsPotted2}
            category='Balls potted'
          />
          <MatchStatsItem
            playerOneData={ballsPotted1}
            playerTwoData={ballsPotted2}
            category='Balls potted'
          />
          <MatchStatsItem
            playerOneData={ballsPotted1}
            playerTwoData={ballsPotted2}
            category='Balls potted'
          />
          <Button title='Close' />
        </View>
      </View>
    </Modal>
  );
};

const getFraction = (numerator, denominator) => {
  if (denominator === 0) return 0;
  else return numerator / denominator;
};

const convertToPercentage = fraction => {
  return `${fraction * 100}%`;
};

export default StatsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  modalContainer: {
    alignItems: "center",
    margin: 20,
    backgroundColor: "white",
    width: "80%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});
