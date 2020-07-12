import React, { useState, useEffect, useReducer } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Ball from "../components/Ball";
import ScoreBoard from "../components/ScoreBoard";
import ColorBalls from "../components/ColorBalls";
import matchReducer from "./Reducers/matchReducer";
import ScoresRemaining from "../components/ScoresRemaining";
import balls from "../resources/ballInfo";
import { TouchableOpacity } from "react-native-gesture-handler";
import BigText from "../components/BigText";
import Break from "../components/Break";

const initialMatchInfo = {
  playerOneStat: {
    attempt: 0,
    ballsPotted: 0,
    highestBreak: 0
  },
  playerTwoStat: {
    attempt: 0,
    ballsPotted: 0,
    highestBreak: 0
  },
  frame: 1,
  framesInfo: [],
  currentBreak: 0,
  playerToBreakOff: null,
  isPlayerOneTurn: null,
  isFoul: false,
  isRedNext: true,
  redsRemaining: 6,
  scoresRemaining: 147,
  player_1Score: 0,
  player_2Score: 0,
  playerOneFrame: 0,
  playerTwoFrame: 0,
  currentColor: null,
  frameWinner: null,
  matchWinner: null
};

const BattleScreen = props => {
  const { navigation, route } = props;

  const {
    playerToBreakOff,
    frameNum,
    playerOneName,
    playerTwoName
  } = route.params;

  const [matchInfo, dispatch] = useReducer(matchReducer, initialMatchInfo);

  useEffect(() => {
    dispatch({
      type: "MATCH_INIT",
      payload: { playerToBreakOff, playerOneName, playerTwoName }
    });
  }, []);

  const handlePot = score => {
    if (matchInfo.currentColor !== null) {
      const nextColorBall = balls[score - 1];
      if (matchInfo.isPlayerOneTurn) {
        const isUpdateHighestBreak = compareBreak(
          score,
          matchInfo.playerOneStat
        );
        dispatch({
          type: "PLAYER_ONE_POT_COLOR",
          payload: {
            score,
            isUpdateHighestBreak,
            nextColor:
              typeof nextColorBall !== "undefined"
                ? nextColorBall.color
                : "game-over"
          }
        });
      } else {
        const isUpdateHighestBreak = compareBreak(
          score,
          matchInfo.playerTwoStat
        );
        dispatch({
          type: "PLAYER_TWO_POT_COLOR",
          payload: {
            score,
            isUpdateHighestBreak,
            nextColor:
              typeof nextColorBall !== "undefined"
                ? nextColorBall.color
                : "game-over"
          }
        });
      }
      if (matchInfo.currentColor === "black") {
        if (matchInfo.player_1Score === matchInfo.player_2Score) {
          dispatch({ type: "DRAW" });
        }
        if (matchInfo.frame === frameNum) {
          console.log("game_over");
          dispatch({
            type: "MATCH_OVER",
            matchWinner:
              matchInfo.playerOneFrame > matchInfo.playerTwoFrame
                ? matchInfo.playerOneName
                : matchInfo.playerTwoFrame > matchInfo.playerOneFrame
                ? matchInfo.playerTwoName
                : "draw"
          });
        } else {
          const winner = determineWinner(
            matchInfo.player_1Score,
            matchInfo.player_2Score,
            matchInfo.playerOneName,
            matchInfo.playerTwoName
          );

          dispatch({ type: "FRAME_OVER", payload: winner });
        }
      }
    } else {
      if (matchInfo.isPlayerOneTurn) {
        const isUpdateHighestBreak = compareBreak(
          score,
          matchInfo.playerOneStat
        );

        dispatch({
          type: "PLAYER_ONE_POT",
          payload: { score, isUpdateHighestBreak }
        });
      } else {
        const isUpdateHighestBreak = compareBreak(
          score,
          matchInfo.playerTwoStat
        );
        dispatch({
          type: "PLAYER_TWO_POT",
          payload: { score, isUpdateHighestBreak }
        });
      }
    }
  };

  const handleMiss = () => {
    if (matchInfo.isPlayerOneTurn) {
      dispatch({ type: "PLAYER_ONE_MISS" });
    } else {
      dispatch({ type: "PLAYER_TWO_MISS" });
    }
  };

  const handleFoul = () => {};

  const startNewFrame = () => {
    const fieldToEdit =
      matchInfo.frameWinner === playerOneName
        ? "playerOneFrame"
        : "playerTwoFrame";
    console.log(fieldToEdit);
    dispatch({ type: "START_NEW_FRAME", payload: fieldToEdit });
  };

  const compareBreak = (score, stat) => {
    return matchInfo.currentBreak + score > stat.highestBreak ? true : false;
  };

  return (
    <View>
      <Text>
        player one highest break: {matchInfo.playerOneStat.highestBreak}
      </Text>
      <Text>
        player two highest break: {matchInfo.playerTwoStat.highestBreak}
      </Text>
      <Text>{matchInfo.playerOneStat.attempt}</Text>

      <Text>{matchInfo.redsRemaining}</Text>
      <Text>winner: {matchInfo.frameWinner}</Text>
      <BigText text='hello' />
      <TouchableOpacity onPress={startNewFrame}>
        <Text>New Frame</Text>
      </TouchableOpacity>
      <View>
        <Text>{playerToBreakOff} break off</Text>
      </View>
      <View style={styles.balls}>
        {matchInfo.isRedNext ? (
          <>
            <Ball
              color='gray'
              text='foul'
              handleClick={handleFoul}
              currentColor={matchInfo.currentColor}
            />
            <Ball
              color='red'
              score={1}
              handleClick={handlePot}
              currentColor={matchInfo.currentColor}
            />
            <Ball
              color='gray'
              text='miss'
              handleClick={handleMiss}
              currentColor={matchInfo.currentColor}
            />
          </>
        ) : (
          <ColorBalls
            handlePot={handlePot}
            handleFoul={handleFoul}
            handleMiss={handleMiss}
            currentColor={matchInfo.currentColor}
          />
        )}
      </View>

      <ScoreBoard
        player_1Score={matchInfo.player_1Score}
        player_2Score={matchInfo.player_2Score}
        playerOneFrame={matchInfo.playerOneFrame}
        playerTwoFrame={matchInfo.playerTwoFrame}
        playerOneName={playerOneName}
        playerTwoName={playerTwoName}
        frameNum={frameNum}
        isPlayerOneTurn={matchInfo.isPlayerOneTurn}
      />
      <Break
        isPlayerOneTurn={matchInfo.isPlayerOneTurn}
        currentBreak={matchInfo.currentBreak}
      />
      <ScoresRemaining redsRemaining={matchInfo.redsRemaining} />
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
  }
});

const determineWinner = (p1Score, p2Score, p1Name, p2Name) => {
  return p1Score > p2Score ? p1Name : p2Name;
};
