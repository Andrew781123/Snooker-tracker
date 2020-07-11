import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Ball from "../components/Ball";
import ScoreBoard from "../components/ScoreBoard";
import ColorBalls from "../components/ColorBalls";

const initialMatchInfo = {
  frame: 1,
  isPlayerOneTurn: null,
  isFoul: false,
  isRedNext: true,
  redsRemaining: 15,
  scoresRemaining: 147,
  player_1Score: 0,
  player_2Score: 0
};

const BattleScreen = props => {
  const { navigation, route } = props;

  const {
    playerToBreakOff,
    frameNum,
    playerOneName,
    playerTwoName
  } = route.params;

  const [matchInfo, setMatchInfo] = useState(initialMatchInfo);

  useEffect(() => {
    setMatchInfo({
      ...matchInfo,
      isPlayerOneTurn: playerToBreakOff === playerOneName ? true : false,
      playerOneName,
      playerTwoName
    });
    console.log(matchInfo.redsRemaining);
  }, []);

  const handlePot = (score, isRed) => {
    setMatchInfo(info => ({
      ...info,
      redsRemaining: isRed ? info.redsRemaining - 1 : info.redsRemaining,
      isRedNext: !info.isRedNext,
      player_1Score: info.isPlayerOneTurn
        ? (info.player_1Score += score)
        : info.player_1Score,
      player_2Score: !info.isPlayerOneTurn
        ? (info.player_2Score += score)
        : info.player_2Score
    }));
  };

  const handleMiss = () => {
    setMatchInfo(info => ({
      ...info,
      isRedNext: true,
      isPlayerOneTurn: !info.isPlayerOneTurn
    }));
  };

  const handleFoul = () => {};

  return (
    <View>
      <View style={styles.bigTextContainer}>
        <Text style={styles.bigText}>
          {matchInfo.isPlayerOneTurn ? playerOneName : playerTwoName}'s turn
        </Text>
      </View>
      <View>
        <Text>{playerToBreakOff} break off</Text>
      </View>
      <View style={styles.balls}>
        {matchInfo.isRedNext ? (
          <>
            <Ball color='gray' text='foul' handleClick={handleFoul} />
            <Ball color='red' score={1} handleClick={handlePot} />
            <Ball color='gray' text='miss' handleClick={handleMiss} />
          </>
        ) : (
          <ColorBalls
            handlePot={handlePot}
            handleFoul={handleFoul}
            handleMiss={handleMiss}
          />
        )}
      </View>

      <ScoreBoard
        player_1Score={matchInfo.player_1Score}
        player_2Score={matchInfo.player_2Score}
        playerOneName={playerOneName}
        playerTwoName={playerTwoName}
        frameNum={frameNum}
      />
      <Button
        title='End'
        onPress={() => navigation.navigate("Battle_Result")}
      />
    </View>
  );
};

export default BattleScreen;

const styles = StyleSheet.create({
  balls: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  },
  bigTextContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#42c5f5"
  },
  bigText: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold"
  }
});
