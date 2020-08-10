const updatesOnPot = (state, score) => {
  return {
    ...state,
    currentBreak: state.currentBreak + score,

    redsRemaining: state.isRedNext
      ? state.redsRemaining - 1
      : state.redsRemaining,

    isRedNext: state.redsRemaining === 0 ? false : !state.isRedNext,

    scoreRemaining: state.isRedNext
      ? state.scoreRemaining - 1
      : state.scoreRemaining - 7,

    currentColor: state.redsRemaining === 0 ? "yellow" : null
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
    isRedNext: state.currentColor ? false : true,
    isPlayerOneTurn: !state.isPlayerOneTurn
  };
};

const updatesOnFoul = (state, player) => {
  return {
    ...state,
    [player]: {
      ...state[player],
      attempt: state[player].attempt + 1
    },
    foulOption: "GET_FOUL_POINTS"
  };
};

const matchReducer = (state, action) => {
  const { playerToBreakOff, playerOneName, playerTwoName } = action.payload;

  switch (action.type) {
    case "MATCH_INIT": {
      return {
        ...state,
        instruction: `${playerOneName} breaks off`,
        playerToBreakOff: playerToBreakOff,

        scoreRemaining: 8 * state.redsRemaining + 27,
        isPlayerOneTurn: playerToBreakOff === playerOneName ? true : false,
        playerOne: { ...state.playerOne, name: playerOneName },
        playerTwo: { ...state.playerTwo, name: playerTwoName }
      };
    }

    case "POT": {
      const { score, isUpdateHighestBreak, player } = action.payload;
      return {
        ...updatesOnPot(state, score),
        instruction: `${player.name}'s turn`,
        [player]: {
          ...state[player],
          score: state[player].score + score,
          attempt: state[player].attempt + 1,
          ballsPotted: state[player].ballsPotted + 1,
          highestBreak: isUpdateHighestBreak
            ? state.currentBreak + score
            : state[player].highestBreak
        }
      };
    }

    case "MISS": {
      const player = action.payload;
      return {
        ...updatesOnMiss(state, player),
        currentColor: state.redsRemaining === 0 ? "yellow" : null,
        scoreRemaining: state.isRedNext
          ? state.scoreRemaining
          : state.scoreRemaining - 7
      };
    }

    case "FREE_BALL_MISS": {
      const player = action.payload;

      return {
        ...updatesOnMiss(state, player),
        isFreeBall: false,
        currentColor: state.currentColor ? state.currentColor : null,
        scoreRemaining: state.scoreRemaining - 8
      };
    }

    case "POT_COLOR": {
      const { player, score, isUpdateHighestBreak, nextColor } = action.payload;
      return {
        ...state,
        scoreRemaining: state.scoreRemaining - score,
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

        currentColor: nextColor
      };
    }

    case "SAFETY": {
      return {
        ...state,
        isPlayerOneTurn: !state.isPlayerOneTurn,
        isRedNext: state.currentColor ? false : true,
        currentBreak: 0,
        scoreRemaining: state.isRedNext
          ? state.scoreRemaining
          : state.scoreRemaining - 7
      };
    }

    case "FREE_BALL_SAFETY": {
      return {
        ...state,
        isPlayerOneTurn: !state.isPlayerOneTurn,
        isRedNext: state.currentColor ? false : true,
        scoreRemaining: state.scoreRemaining - 8,
        isFreeBall: false,
        currentColor: state.currentColor ? state.currentColor : null
      };
    }

    case "FOUL": {
      const player = action.payload;

      return {
        ...updatesOnFoul(state, player),
        currentColor: state.currentColor
          ? state.currentColor
          : state.redsRemaining === 0
          ? "yellow"
          : null,
        scoreRemaining: state.isRedNext
          ? state.scoreRemaining
          : state.scoreRemaining - 7
      };
    }

    case "FREE_BALL_FOUL": {
      const player = action.payload;

      return {
        ...updatesOnFoul(state, player),
        scoreRemaining: state.scoreRemaining - 8,
        isFreeBall: false,
        currentColor: state.currentColor ? state.currentColor : null
      };
    }

    case "UPDATE_FOUL_POINT": {
      const { player, foulPoint } = action.payload;

      return {
        ...state,
        foulOption: "GET_NUMBERS_OF_REDS_POTTED",
        [player]: {
          ...state[player],
          score: state[player].score + foulPoint
        }
      };
    }

    case "REMOVE_REDS": {
      return {
        ...state,
        redsRemaining: state.redsRemaining - action.payload,
        foulOption: "FOUL_FOLLOWUP_ACTIONS"
      };
    }

    case "FOUL_PLAYER_FORCED_PLAY_ON": {
      return {
        ...state,
        foulOption: null,
        isRedNext: true,
        currentBreak: 0
      };
    }

    case "PUT_BACK": {
      return {
        ...state,
        foulOption: null,
        currentBreak: 0
      };
    }

    case "PLAYES_ON": {
      return {
        ...state,
        foulOption: "DETERMINE_FREE_BALL"
      };
    }

    case "FREE_BALL": {
      return {
        ...state,
        isPlayerOneTurn: !state.isPlayerOneTurn,
        foulOption: null,
        currentBreak: 0,
        scoreRemaining: state.scoreRemaining + 8,
        isFreeBall: true
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
        scoreRemaining: state.scoreRemaining - 1,
        currentColor: state.currentColor ? state.currentColor : null,
        isFreeBall: false
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
