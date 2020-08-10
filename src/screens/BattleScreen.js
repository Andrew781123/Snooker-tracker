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
import Balls from "../components/Balls";

const initialMatchInfo = {
  playerOne: {
    attempt: 0,
    ballsPotted: 0,
    highestBreak: 0,
    score: 0,
    frame: 0
  },
  playerTwo: {
    attempt: 0,
    ballsPotted: 0,
    highestBreak: 0,
    score: 0,
    frame: 0
  },
  foulOption: null,
  isFreeBall: false,
  frame: 1,
  framesInfo: [],
  currentBreak: 0,
  playerToBreakOff: null,
  isPlayerOneTurn: null,
  isRedNext: true,
  redsRemaining: 6,
  scoreRemaining: null,
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
        const isUpdateHighestBreak = compareBreak(score, matchInfo.playerOne);
        dispatch({
          type: "POT_COLOR",
          payload: {
            player: "playerOne",
            score,
            isUpdateHighestBreak,
            nextColor:
              typeof nextColorBall !== "undefined"
                ? nextColorBall.color
                : "game-over"
          }
        });
      } else {
        const isUpdateHighestBreak = compareBreak(score, matchInfo.playerTwo);
        dispatch({
          type: "POT_COLOR",
          payload: {
            player: "playerTwo",
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
        //last ball potted
        const winner = determineWinner(
          matchInfo.playerOne.score,
          matchInfo.playerTwo.score,
          matchInfo.playerOneName,
          matchInfo.playerTwoName
        );
        if (winner === null) return dispatch({ type: "DRAW" });

        //match not over
        if (matchInfo.frame !== frameNum)
          return dispatch({ type: "FRAME_OVER", payload: winner });

        //match over
        const matchWinner = determineMatchWinner(winner);
        if (!matchWinner) return dispatch({ type: "MATCH_DRAW" });
        return dispatch({ type: "MATCH_WINNER", payload: matchWinner });
      }
    } else {
      if (matchInfo.isPlayerOneTurn) {
        const isUpdateHighestBreak = compareBreak(score, matchInfo.playerOne);

        dispatch({
          type: "POT",
          payload: { score, isUpdateHighestBreak, player: "playerOne" }
        });
      } else {
        const isUpdateHighestBreak = compareBreak(score, matchInfo.playerTwo);
        dispatch({
          type: "POT",
          payload: { score, isUpdateHighestBreak, player: "playerTwo" }
        });
      }
    }
  };

  const handleMiss = () => {
    if (matchInfo.isPlayerOneTurn) {
      dispatch({ type: "MISS", payload: "playerOne" });
    } else {
      dispatch({ type: "MISS", payload: "playerTwo" });
    }
  };

  const handleFoul = () => {
    const player = matchInfo.isPlayerOneTurn ? "playerTwo" : "playerOne";
    dispatch({ type: "FOUL", payload: player });
  };

  const updateFoulPoint = foulPoint => {
    const player = matchInfo.isPlayerOneTurn ? "playerTwo" : "playerOne";
    dispatch({ type: "UPDATE_FOUL_POINT", payload: { player, foulPoint } });
  };

  const removeReds = redNum => {
    dispatch({ type: "REMOVE_REDS", payload: redNum });
  };

  const handleForcedPlayOn = () => {
    dispatch({ type: "FOUL_PLAYER_FORCED_PLAY_ON" });
  };

  const handlePutBack = () => {
    dispatch({ type: "PUT_BACK" });
  };

  const handleFreeBall = () => {
    dispatch({ type: "FREE_BALL" });
  };

  const handleNonFreeBall = () => {
    dispatch({ type: "NON_FREE_BALL" });
  };

  const handlePlaysOn = () => {
    dispatch({ type: "PLAYES_ON" });
  };

  const handleSafety = () => {
    dispatch({ type: "SAFETY" });
  };

  const handleFreeBallPot = score => {
    const player = matchInfo.isPlayerOneTurn ? "playerOne" : "playerTwo";
    const isUpdateHighestBreak = compareBreak(score, matchInfo[player]);
    dispatch({
      type: "FREE_BALL_POT",
      payload: { player, score, isUpdateHighestBreak }
    });
  };

  const handleFreeBallMiss = () => {
    const player = matchInfo.isPlayerOneTurn ? "playerOne" : "playerTwo";
    dispatch({ type: "FREE_BALL_MISS", payload: player });
  };

  const handleFreeBallFoul = () => {
    const player = matchInfo.isPlayerOneTurn ? "playerOne" : "playerTwo";
    dispatch({ type: "FREE_BALL_FOUL", payload: player });
  };

  const handleFreeBallSafety = () => {
    dispatch({ type: "FREE_BALL_SAFETY" });
  };

  const startNewFrame = () => {
    const fieldToEdit =
      matchInfo.frameWinner === playerOneName ? "playerOne" : "playerTwo";
    dispatch({ type: "INCREMENT_FRAME", payload: fieldToEdit });
    dispatch({ type: "START_NEW_FRAME" });
  };

  const compareBreak = (score, stat) => {
    return matchInfo.currentBreak + score > stat.highestBreak ? true : false;
  };

  const determineMatchWinner = winner => {
    const { p1Frame, p2Frame } = getFinalFrameScore(winner);
    if (p1Frame > p2Frame) return playerOneName;
    if (p1Frame < p2Frame) return playerTwoName;
    return null;
  };

  const getFinalFrameScore = winner => {
    let p1Frame, p2Frame;
    if (winner === playerOneName) {
      p1Frame = matchInfo.playerOne.frame + 1;
      p2Frame = matchInfo.playerTwo.frame;
    } else {
      p2Frame = matchInfo.playerTwo.frame + 1;
      p1Frame = matchInfo.playerOne;
    }
    return {
      p1Frame,
      p2Frame
    };
  };

  return (
    <View>
      <Text>Color on: {matchInfo.currentColor}</Text>
      <Text>player one highest break: {matchInfo.playerOne.highestBreak}</Text>
      <Text>player two highest break: {matchInfo.playerTwo.highestBreak}</Text>
      <Text>{matchInfo.playerOne.attempt}</Text>

      <Text>{matchInfo.redsRemaining}</Text>
      <Text>winner: {matchInfo.matchWinner}</Text>
      <BigText text='hello' />
      {matchInfo.frameWinner && !matchInfo.matchWinner && (
        <TouchableOpacity onPress={startNewFrame}>
          <Text>New Frame</Text>
        </TouchableOpacity>
      )}
      <View>
        <Text>{playerToBreakOff} break off</Text>
      </View>
      <View style={styles.balls}>
        <Balls
          isRedNext={matchInfo.isRedNext}
          isFreeBall={matchInfo.isFreeBall}
          foulOption={matchInfo.foulOption}
          frameWinner={matchInfo.frameWinner}
          currentColor={matchInfo.currentColor}
          handleFoul={handleFoul}
          handlePot={handlePot}
          handleSafety={handleSafety}
          handleMiss={handleMiss}
          updateFoulPoint={updateFoulPoint}
          removeReds={removeReds}
          handleForcedPlayOn={handleForcedPlayOn}
          handlePutBack={handlePutBack}
          handlePlaysOn={handlePlaysOn}
          handleFreeBall={handleFreeBall}
          handleNonFreeBall={handleNonFreeBall}
          handleFreeBallPot={handleFreeBallPot}
          handleFreeBallMiss={handleFreeBallMiss}
          handleFreeBallFoul={handleFreeBallFoul}
          handleFreeBallSafety={handleFreeBallSafety}
        />
      </View>

      <ScoreBoard
        p1Score={matchInfo.playerOne.score}
        p2Score={matchInfo.playerTwo.score}
        p1Frame={matchInfo.playerOne.frame}
        p2Frame={matchInfo.playerTwo.frame}
        playerOneName={playerOneName}
        playerTwoName={playerTwoName}
        frameNum={frameNum}
        isPlayerOneTurn={matchInfo.isPlayerOneTurn}
      />
      <Break
        isPlayerOneTurn={matchInfo.isPlayerOneTurn}
        currentBreak={matchInfo.currentBreak}
      />
      {matchInfo.isPlayerOneTurn !== null && (
        <ScoresRemaining
          scoreRemaining={matchInfo.scoreRemaining}
          p1Score={matchInfo.playerOne.score}
          p2Score={matchInfo.playerTwo.score}
          isPlayerOneTurn={matchInfo.isPlayerOneTurn}
        />
      )}
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
  return p1Score > p2Score ? p1Name : p1Score < p2Score ? p2Name : null;
};
