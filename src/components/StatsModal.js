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
    pointsScored: pointsScored1,
    highestBreak: highestBreak1,
    centuries: centuries1,
    fouls: fouls1,
    foulPointsConceded: foulPointsConceded1
  } = playerOne;

  const {
    name: name2,
    attempt: attempt2,
    ballsPotted: ballsPotted2,
    pointsScored: pointsScored2,
    highestBreak: highestBreak2,
    centuries: centuries2,
    fouls: fouls2,
    foulPointsConceded: foulPointsConceded2
  } = playerTwo;

  // console.log(pointsScored1);

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
            playerOneData={pointsScored1}
            playerTwoData={pointsScored2}
            category='Points scored'
          />
          <MatchStatsItem
            playerOneData={centuries1}
            playerTwoData={centuries2}
            category='Centuries'
          />
          <MatchStatsItem
            playerOneData={fouls1}
            playerTwoData={fouls2}
            category='Fouls'
          />
          <MatchStatsItem
            playerOneData={foulPointsConceded1}
            playerTwoData={foulPointsConceded2}
            category='Foul points conceded'
          />
          <Button title='Close' onPress={handleModalClose} />
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
    width: "90%",
    padding: 10,
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
