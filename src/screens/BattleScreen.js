import React, { useEffect, useReducer, useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import ScoreBoard from "../components/ScoreBoard";
import matchReducer from "./Reducers/matchReducer";
import ScoresRemaining from "../components/ScoresRemaining";
import balls from "../resources/ballInfo";
import { TouchableOpacity } from "react-native-gesture-handler";
import BigText from "../components/BigText";
import Break from "../components/Break";
import StatsModal from "../components/StatsModal";
import ActionButtons from "../components/match/ActionButtons";

const initialPlayerInfo = {
  name: null,
  attempt: 0,
  ballsPotted: 0,
  pointsScored: 0,
  centuries: 0,
  highestBreak: 0,
  fouls: 0,
  foulPointsConceded: 0,
  score: 0,
  frame: 0
};

const initialMatchInfo = {
  playerOne: initialPlayerInfo,
  playerTwo: initialPlayerInfo,
  instruction: null,
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

  const [isShowStatsModal, setIsShowStatsModal] = useState(false);

  useEffect(() => {
    dispatch({
      type: "MATCH_INIT",
      payload: { playerToBreakOff, playerOneName, playerTwoName }
    });
  }, []);

  useLayoutEffect(() => {
    if (matchInfo.redsRemaining === 0 && matchInfo.isRedNext) {
      dispatch({ type: "SET_YELLOW_COLOR" });
    }
  }, [matchInfo.redsRemaining, matchInfo.isRedNext]);

  const handlePot = score => {
    //No reds on the table
    if (matchInfo.currentColor !== null) {
      const nextColorBall = balls[score - 1];

      //update score
      const player = matchInfo.isPlayerOneTurn ? "playerOne" : "playerTwo";
      const isUpdateHighestBreak = compareBreak(score, matchInfo[player]);
      dispatch({
        type: "POT_COLOR",
        payload: {
          player,
          score,
          isUpdateHighestBreak,
          nextColor:
            typeof nextColorBall !== "undefined" ? nextColorBall.color : "black"
        }
      });

      if (matchInfo.currentColor === "black") {
        //last ball potted
        handleEndFrame();
      }
    } else {
      const player = matchInfo.isPlayerOneTurn ? "playerOne" : "playerTwo";
      const isUpdateHighestBreak = compareBreak(score, matchInfo[player]);

      dispatch({
        type: "POT",
        payload: { score, isUpdateHighestBreak, player }
      });
    }
  };

  const handleEndFrame = () => {
    const winner = determineWinner(
      matchInfo.playerOne.score,
      matchInfo.playerTwo.score,
      matchInfo.playerOne.name,
      matchInfo.playerTwo.name
    );
    if (winner === "DRAW") return dispatch({ type: "DRAW" });

    //match not over
    dispatch({ type: "FRAME_OVER", payload: winner });

    if (matchInfo.frame === frameNum) {
      handleMatchOver();
    }
  };

  const handleMatchOver = () => {
    //match over
    const matchWinner = determineMatchWinner(winner);
    if (matchWinner === "DRAW") return dispatch({ type: "MATCH_DRAW" });

    return dispatch({ type: "MATCH_WINNER", payload: matchWinner });
  };

  const handleMiss = () => {
    if (matchInfo.isPlayerOneTurn) {
      dispatch({ type: "MISS", payload: "playerOne" });
    } else {
      dispatch({ type: "MISS", payload: "playerTwo" });
    }
  };

  const handleFoul = () => {
    if (matchInfo.currentColor === "black") {
      handleEndFrame();
    } else {
      const player = matchInfo.isPlayerOneTurn ? "playerOne" : "playerTwo";
      dispatch({ type: "FOUL", payload: player });
    }
  };

  const updateFoulPoint = foulPoint => {
    let player, playerFouling;
    if (matchInfo.isPlayerOneTurn) {
      player = "playerTwo";
      playerFouling = "playerOne";
    } else {
      player = "playerOne";
      playerFouling = "playerTwo";
    }

    dispatch({
      type: "UPDATE_FOUL_POINT",
      payload: { player, playerFouling, foulPoint }
    });
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
    dispatch({ type: "PLAYS_ON" });
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
      matchInfo.frameWinner === matchInfo.playerOne.name
        ? "playerOne"
        : "playerTwo";
    dispatch({ type: "INCREMENT_FRAME", payload: fieldToEdit });
    dispatch({ type: "START_NEW_FRAME" });
  };

  const compareBreak = (score, stat) => {
    return matchInfo.currentBreak + score > stat.highestBreak ? true : false;
  };

  const determineMatchWinner = winner => {
    const { p1Frame, p2Frame } = getFinalFrameScore(winner);
    if (p1Frame > p2Frame) return matchInfo.playerOne.name;
    if (p1Frame < p2Frame) return matchInfo.playerTwo.name;
    return "DRAW";
  };

  const getFinalFrameScore = winner => {
    let p1Frame, p2Frame;
    if (winner === matchInfo.playerOne.name) {
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
      <Text>{matchInfo.redsRemaining}</Text>
      <Text>Match winner: {matchInfo.matchWinner}</Text>
      <BigText instruction={matchInfo.instruction} />
      {matchInfo.frameWinner && !matchInfo.matchWinner && (
        <TouchableOpacity onPress={startNewFrame}>
          <Text>New Frame</Text>
        </TouchableOpacity>
      )}
      <View>
        <Text>{playerToBreakOff} break off</Text>
      </View>
      <View
        style={styles.balls}
        pointerEvents={matchInfo.frameWinner ? "none" : "auto"}
      >
        <ActionButtons
          isRedNext={matchInfo.isRedNext}
          isFreeBall={matchInfo.isFreeBall}
          frameWinner={matchInfo.frameWinner}
          currentColor={matchInfo.currentColor}
          redsRemaining={matchInfo.redsRemaining}
          handlePot={handlePot}
          nonPotActionHandler={{ handleFoul, handleSafety, handleMiss }}
          foulOption={matchInfo.foulOption}
          foulOptionHandlers={{
            updateFoulPoint,
            removeReds,
            handlePlaysOn,
            handlePutBack,
            handleForcedPlayOn,
            handleFreeBall,
            handleNonFreeBall
          }}
          handleFreeBallPot={handleFreeBallPot}
          freeBallNonPotHandlers={{
            handleFreeBallMiss,
            handleFreeBallFoul,
            handleFreeBallSafety
          }}
        />
      </View>

      <ScoreBoard
        p1Score={matchInfo.playerOne.score}
        p2Score={matchInfo.playerTwo.score}
        p1Frame={matchInfo.playerOne.frame}
        p2Frame={matchInfo.playerTwo.frame}
        playerOneName={matchInfo.playerOne.name}
        playerTwoName={matchInfo.playerTwo.name}
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
      {matchInfo.matchWinner && (
        <Button
          title='End'
          onPress={() => navigation.navigate("Battle_Result")}
        />
      )}
      <StatsModal
        playerOne={matchInfo.playerOne}
        playerTwo={matchInfo.playerTwo}
        isShow={isShowStatsModal}
        setIsShow={setIsShowStatsModal}
      />
      <Button title='Show Stats' onPress={() => setIsShowStatsModal(true)} />
    </View>
  );
};

export default BattleScreen;

const styles = StyleSheet.create({
  balls: {
    width: "100%",
    marginTop: 10
  }
});

const determineWinner = (p1Score, p2Score, p1Name, p2Name) => {
  return p1Score > p2Score ? p1Name : p1Score < p2Score ? p2Name : "DRAW";
};
