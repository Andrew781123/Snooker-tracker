const updateMatchInfo = (state, score) => {
  return {
    ...state,
    currentBreak: state.currentBreak + score,

    redsRemaining: state.isRedNext
      ? state.redsRemaining - 1
      : state.redsRemaining,

    isRedNext: state.redsRemaining === 0 ? false : !state.isRedNext,

    scoreRemaining:
      score === 1 ? state.scoreRemaining - 8 : state.scoreRemaining,

    player_1Score: state.isPlayerOneTurn
      ? (state.player_1Score += score)
      : state.player_1Score,

    player_2Score: !state.isPlayerOneTurn
      ? (state.player_2Score += score)
      : state.player_2Score,

    currentColor: state.redsRemaining === 0 ? "yellow" : null
  };
};

const updateMatchInfoOnMiss = state => {
  return {
    ...state,
    currentBreak: 0,
    isRedNext: state.currentColor ? false : true,
    isPlayerOneTurn: !state.isPlayerOneTurn
  };
};

const matchReducer = (state, action) => {
  switch (action.type) {
    case "MATCH_INIT": {
      return {
        ...state,
        playerToBreakOff: action.payload.playerToBreakOff,

        scoreRemaining: 8 * state.redsRemaining + 27,
        isPlayerOneTurn:
          action.payload.playerToBreakOff === action.payload.playerOneName
            ? true
            : false,
        playerOneName: action.payload.playerOneName,
        playerTwoName: action.payload.playerTwoName
      };
    }
    case "PLAYER_ONE_POT": {
      const { score, isUpdateHighestBreak } = action.payload;
      return {
        ...updateMatchInfo(state, score),
        playerOneStat: {
          ...state.playerOneStat,
          attempt: state.playerOneStat.attempt + 1,
          ballsPotted: state.playerOneStat.ballsPotted + 1,
          highestBreak: isUpdateHighestBreak
            ? state.currentBreak + score
            : state.playerOneStat.highestBreak
        }
      };
    }
    case "PLAYER_TWO_POT": {
      const { score, isUpdateHighestBreak } = action.payload;
      return {
        ...updateMatchInfo(state, score),

        playerTwoStat: {
          ...state.playerTwoStat,
          attempt: state.playerTwoStat.attempt + 1,
          ballsPotted: state.playerTwoStat.ballsPotted + 1,
          highestBreak: isUpdateHighestBreak
            ? state.currentBreak + score
            : state.playerTwoStat.highestBreak
        }
      };
    }

    case "PLAYER_ONE_MISS": {
      return {
        ...updateMatchInfoOnMiss(state),
        playerOneStat: {
          ...state.playerOneStat,
          attempt: state.playerOneStat.attempt + 1
        }
      };
    }
    case "PLAYER_TWO_MISS": {
      return {
        ...updateMatchInfoOnMiss(state),
        playerTwoStat: {
          ...state.playerTwoStat,
          attempt: state.playerTwoStat.attempt + 1
        }
      };
    }

    case "PLAYER_ONE_POT_COLOR": {
      const { score, isUpdateHighestBreak, nextColor } = action.payload;
      return {
        ...state,
        scoreRemaining: state.scoreRemaining - score,
        playerOneStat: {
          ...state.playerOneStat,
          attempt: state.playerOneStat.attempt + 1,
          ballsPotted: state.playerOneStat.ballsPotted + 1,
          highestBreak: isUpdateHighestBreak
            ? state.currentBreak + score
            : state.playerOneStat.highestBreak
        },

        currentBreak: state.currentBreak + score,

        currentColor: nextColor,
        player_1Score: (state.player_1Score += score)
      };
    }
    case "PLAYER_TWO_POT_COLOR": {
      const { score, isUpdateHighestBreak, nextColor } = action.payload;
      return {
        ...state,
        scoreRemaining: state.scoreRemaining - score,
        playerTwoStat: {
          ...state.playerTwoStat,
          attempt: state.playerTwoStat.attempt + 1,
          ballsPotted: state.playerTwoStat.ballsPotted + 1,
          highestBreak: isUpdateHighestBreak
            ? state.currentBreak + score
            : state.playerTwoStat.highestBreak
        },

        currentBreak: state.currentBreak + score,

        currentColor: nextColor,
        player_2Score: (state.player_2Score += score)
      };
    }

    case "FRAME_OVER": {
      console.log("frameOver");
      const winner = action.payload;
      return {
        ...state,
        isPlayerOneTurn: null,
        frameWinner: winner
      };
    }
    case "INCREMENT_FRAME": {
      return {
        ...state,
        playerOneFrame:
          state.frameWinner === state.playerOneName
            ? state.playerOneFrame + 1
            : state.playerOneFrame,
        playerTwoFrame:
          state.frameWinner === state.playerTwoName
            ? state.playerTwoFrame + 1
            : state.playerTwoFrame
      };
    }
    case "START_NEW_FRAME": {
      const fieldToEdit = action.payload;
      console.log(fieldToEdit);
      return {
        ...state,
        frame: state.frame + 1,
        // framesInfo: [
        //   ...state.framesInfo,
        //   {
        //     score: `${state.player_1Score} - ${state.player_2Score}`
        //   }
        // ],
        currentBreak: 0,
        playerToBreakOff:
          state.playerToBreakOff === state.playerOneName
            ? state.playerTwoName
            : state.playerOneName,
        isPlayerOneTurn:
          state.playerToBreakOff === state.playerOneName ? false : true,
        isFoul: false,
        isRedNext: true,
        redsRemaining: 6,
        scoresRemaining: 147,
        player_1Score: 0,
        player_2Score: 0,
        [fieldToEdit]: state[fieldToEdit] + 1,
        currentColor: null,
        frameWinner: null
      };
    }
    case "MATCH_WINNER": {
      const matchWinner = action.payload;

      return {
        ...state,
        matchWinner,
        isPlayerOneTurn: null
      };
    }

    case "MATCH_DRAW": {
      console.log("draw match");
      return {
        ...state,
        isPlayerOneTurn: null
      };
    }
    default:
      return state;
  }
};

export default matchReducer;
