import { State } from "react-native-gesture-handler";

const updatesOnPot = (state, player, score, isUpdateHighestBreak) => {
  return {
    ...state,
    [player]: {
      ...state[player],
      score: state[player].score + score,
      attempt: state[player].attempt + 1,
      ballsPotted: state[player].ballsPotted + 1,
      pointsScored: state[player].pointsScored + score,
      highestBreak: isUpdateHighestBreak
        ? state.currentBreak + score
        : state[player].highestBreak,
      centuries:
        state.currentBreak + score >= 100
          ? state[player].centuries + 1
          : state[player].centuries
    },
    currentBreak: state.currentBreak + score,

    redsRemaining: state.isRedNext
      ? state.redsRemaining - 1
      : state.redsRemaining
  };
};

const updatesOnMiss = (state, player) => {
  return {
    ...state,
    [player]: {
      ...state[player],
      attempt: state[player].attempt + 1
    },
    currentBreak: 0,
    isPlayerOneTurn: !state.isPlayerOneTurn
  };
};

const updatesOnFoul = (state, player) => {
  return {
    ...state,
    [player]: {
      ...state[player],
      attempt: state[player].attempt + 1,
      fouls: state[player].fouls + 1
    },
    foulOption: "GET_FOUL_POINTS"
  };
};

const matchReducer = (state, action) => {
  switch (action.type) {
    case "MATCH_INIT": {
      const { playerToBreakOff, playerOneName, playerTwoName } = action.payload;

      return {
        ...state,
        instruction: `${playerOneName} breaks off`,
        playerToBreakOff: playerToBreakOff,

        scoreRemaining: 8 * state.redsRemaining + 27,
        isPlayerOneTurn: playerToBreakOff === playerOneName ? true : false,
        playerOne: {
          ...state.playerOne,
          name: playerOneName,
          userId: "5f2e20d25cb4c5235dfa8f7f"
        },
        playerTwo: {
          ...state.playerTwo,
          name: playerTwoName,
          userId: "5f3cef93777c78285c2cf0d8"
        }
      };
    }

    case "POT": {
      const { score, isUpdateHighestBreak, player } = action.payload;
      return {
        ...updatesOnPot(state, player, score, isUpdateHighestBreak),
        instruction: `Andrew's turn`,
        scoreRemaining: state.isRedNext
          ? state.scoreRemaining - 1
          : state.scoreRemaining - 7,

        isRedNext: !state.isRedNext
        // currentColor: state.redsRemaining === 0 ? "yellow" : null
      };
    }

    case "MISS": {
      const player = action.payload;
      return {
        ...updatesOnMiss(state, player),
        currentColor:
          state.redsRemaining === 0 ? state.currentColor || "yellow" : null,
        isRedNext: state.currentColor ? false : true,
        scoreRemaining:
          state.isRedNext || state.currentColor
            ? state.scoreRemaining
            : state.scoreRemaining - 7
      };
    }

    case "FREE_BALL_MISS": {
      const player = action.payload;

      return {
        ...updatesOnMiss(state, player),
        freeBallStage: null,
        isRedNext:
          state.currentColor || state.redsRemaining === 0 ? false : true,
        scoreRemaining: state.scoreRemaining - 8
      };
    }

    case "POT_COLOR": {
      const { player, score, isUpdateHighestBreak, nextColor } = action.payload;
      return {
        ...updatesOnPot(state, player, score, isUpdateHighestBreak),
        scoreRemaining: state.scoreRemaining - score,
        currentColor: nextColor
      };
    }

    case "SAFETY": {
      return {
        ...state,
        isPlayerOneTurn: !state.isPlayerOneTurn,
        currentColor:
          state.redsRemaining === 0 ? state.currentColor || "yellow" : null,
        isRedNext: state.currentColor ? false : true,
        currentBreak: 0,
        scoreRemaining:
          state.isRedNext || state.currentColor
            ? state.scoreRemaining
            : state.scoreRemaining - 7
      };
    }

    case "FREE_BALL_SAFETY": {
      return {
        ...state,
        isPlayerOneTurn: !state.isPlayerOneTurn,
        isRedNext:
          state.currentColor || state.redsRemaining === 0 ? false : true,
        scoreRemaining: state.scoreRemaining - 8,
        freeBallStage: null
      };
    }

    case "FOUL": {
      const player = action.payload;

      return {
        ...updatesOnFoul(state, player),
        currentColor:
          state.redsRemaining === 0 ? state.currentColor || "yellow" : null,
        scoreRemaining:
          state.isRedNext || state.currentColor
            ? state.scoreRemaining
            : state.scoreRemaining - 7
      };
    }

    case "FREE_BALL_FOUL": {
      const player = action.payload;

      return {
        ...updatesOnFoul(state, player),
        scoreRemaining: state.scoreRemaining - 8,
        freeBallStage: null
      };
    }

    case "UPDATE_FOUL_POINT": {
      const { player, playerFouling, foulPoint } = action.payload;

      return {
        ...state,
        foulOption:
          state.redsRemaining === 0
            ? "FOUL_FOLLOWUP_ACTIONS"
            : "GET_NUMBERS_OF_REDS_POTTED",
        [player]: {
          ...state[player],
          score: state[player].score + foulPoint,
          pointsScored: state[player].pointsScored + foulPoint
        },
        [playerFouling]: {
          ...state[playerFouling],
          foulPointsConceded:
            state[playerFouling].foulPointsConceded + foulPoint
        }
      };
    }

    case "REMOVE_REDS": {
      const redNum = action.payload;

      return {
        ...state,
        redsRemaining: state.redsRemaining - redNum,
        scoreRemaining: state.scoreRemaining - 8 * redNum,
        foulOption: "FOUL_FOLLOWUP_ACTIONS",
        currentColor:
          state.redsRemaining - redNum === 0
            ? state.currentColor || "yellow"
            : null
      };
    }

    case "FOUL_PLAYER_FORCED_PLAY_ON": {
      return {
        ...state,
        foulOption: null,
        isRedNext: true,
        currentBreak: 0,
        isRedNext: state.redsRemaining <= 0 ? false : state.isRedNext
      };
    }

    case "PUT_BACK": {
      return {
        ...state,
        foulOption: null,
        currentBreak: 0,
        isRedNext: state.redsRemaining <= 0 ? false : state.isRedNext
      };
    }

    case "PLAYS_ON": {
      return {
        ...state,
        foulOption: "DETERMINE_FREE_BALL"
      };
    }

    case "FREE_BALL": {
      const freeBallPoint = action.payload;

      return {
        ...state,
        isPlayerOneTurn: !state.isPlayerOneTurn,
        foulOption: null,
        currentBreak: 0,
        isRedNext: state.redsRemaining <= 0 ? false : state.isRedNext,
        scoreRemaining: state.scoreRemaining + freeBallPoint + 7,
        freeBallStage: "FREE_BALL",
        freeBallPoint
      };
    }

    case "NON_FREE_BALL": {
      return {
        ...state,
        isPlayerOneTurn: !state.isPlayerOneTurn,
        foulOption: null,
        isRedNext: true,
        currentBreak: 0
      };
    }

    case "FREE_BALL_POT": {
      const { player, score, isUpdateHighestBreak } = action.payload;

      return {
        ...state,
        [player]: {
          ...state[player],
          score: state[player].score + score,
          attempt: state[player].attempt + 1,
          ballsPotted: state[player].ballsPotted + 1,
          highestBreak: isUpdateHighestBreak
            ? state.currentBreak + score
            : state[player].highestBreak
        },
        foulOption: null,
        currentBreak: state.currentBreak + score,
        isRedNext: false,
        scoreRemaining: state.scoreRemaining - score,

        freeBallStage: "FREE_BALL_COLORS"
      };
    }

    case "FREE_BALL_POT_COLOR": {
      const { player, score, isUpdateHighestBreak } = action.payload;

      return {
        ...state,
        [player]: {
          ...state[player],
          score: state[player].score + score,
          attempt: state[player].attempt + 1,
          ballsPotted: state[player].ballsPotted + 1,
          highestBreak: isUpdateHighestBreak
            ? state.currentBreak + score
            : state[player].highestBreak
        },
        currentBreak: state.currentBreak + score,
        scoreRemaining: state.scoreRemaining - 7,

        freeBallStage: null
      };
    }

    case "SET_YELLOW_COLOR": {
      return {
        ...state,
        currentColor: "yellow",
        isRedNext: false
      };
    }

    case "FRAME_OVER": {
      const winner = action.payload;
      return {
        ...state,
        isPlayerOneTurn: null,
        frameWinner: winner
      };
    }

    case "INCREMENT_FRAME": {
      const player = action.payload;
      return {
        ...state,
        [player]: {
          ...state[player],
          frame: state[player].frame + 1
        }
      };
    }

    case "START_NEW_FRAME": {
      return {
        ...state,
        frame: state.frame + 1,
        playerOne: {
          ...state.playerOne,
          score: 0
        },
        playerTwo: {
          ...state.playerTwo,
          score: 0
        },
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
        scoreRemaining: 147,
        currentColor: null,
        frameWinner: null
      };
    }
    case "MATCH_WINNER": {
      const matchWinner = action.payload;

      return {
        ...state,
        instruction: `${matchWinner} wins the match`,
        matchWinner
      };
    }

    case "MATCH_DRAW": {
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
