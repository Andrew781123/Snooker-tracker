const matchReducer = (state, action) => {
  switch (action.type) {
    case "MATCH_INIT": {
      return {
        ...state,
        playerToBreakOff: action.payload.playerToBreakOff,
        isPlayerOneTurn:
          action.payload.playerToBreakOff === action.payload.playerOneName
            ? true
            : false,
        playerOneName: action.payload.playerOneName,
        playerTwoName: action.payload.playerTwoName
      };
    }
    case "POT": {
      const { score } = action.payload;
      return {
        ...state,
        playerOneStat: updatePlayerStat(
          state.playerOneStat,
          state.isPlayerOneTurn,
          true,
          true
        ),

        playerTwoStat: updatePlayerStat(
          state.playerTwoStat,
          state.isPlayerOneTurn,
          false,
          true
        ),

        currentBreak: state.currentBreak + score,

        redsRemaining: state.isRedNext
          ? state.redsRemaining - 1
          : state.redsRemaining,

        isRedNext: state.redsRemaining === 0 ? false : !state.isRedNext,

        player_1Score: state.isPlayerOneTurn
          ? (state.player_1Score += score)
          : state.player_1Score,

        player_2Score: !state.isPlayerOneTurn
          ? (state.player_2Score += score)
          : state.player_2Score,

        currentColor: state.redsRemaining === 0 ? "yellow" : null
      };
    }
    case "MISS": {
      return {
        ...state,

        playerOneStat: {
          ...updatePlayerStat(
            state.playerOneStat,
            state.isPlayerOneTurn,
            true,
            false
          ),
          highestBreak:
            state.isPlayerOneTurn &&
            state.playerOneStat.highestBreak < state.currentBreak
              ? state.currentBreak
              : state.playerOneStat.highestBreak
        },

        playerTwoStat: {
          ...updatePlayerStat(
            state.playerTwoStat,
            state.isPlayerOneTurn,
            false,
            false
          ),
          highestBreak:
            !state.isPlayerOneTurn &&
            state.playerTwoStat.highestBreak < state.currentBreak
              ? state.currentBreak
              : state.playerTwoStat.highestBreak
        },
        currentBreak: 0,
        isRedNext: state.currentColor ? false : true,
        isPlayerOneTurn: !state.isPlayerOneTurn
      };
    }
    case "POT_COLOR": {
      const { score, nextColor } = action.payload;

      return {
        ...state,
        playerOneStat: updatePlayerStat(
          state.playerOneStat,
          state.isPlayerOneTurn,
          true,
          true
        ),

        playerTwoStat: updatePlayerStat(
          state.playerTwoStat,
          state.isPlayerOneTurn,
          false,
          true
        ),

        currentBreak: state.currentBreak + score,

        currentColor: nextColor,
        player_1Score: state.isPlayerOneTurn
          ? (state.player_1Score += score)
          : state.player_1Score,
        player_2Score: !state.isPlayerOneTurn
          ? (state.player_2Score += score)
          : state.player_2Score
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
    case "START_NEW_FRAME": {
      return {
        ...state,
        frame: state.frame + 1,
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
        playerOneFrame:
          state.frameWinner === state.playerOneName
            ? state.playerOneFrame + 1
            : state.playerOneFrame,
        playerTwoFrame:
          state.frameWinner === state.playerTwoName
            ? state.playerTwoFrame + 1
            : state.playerTwoFrame,
        currentColor: null,
        frameWinner: null
      };
    }
    case "MATCH_OVER": {
      const matchWinner = action.payload;

      return {
        ...state,
        matchWinner
      };
    }
    default:
      return state;
  }
};

const updatePlayerStat = (stat, isPlayerOneTurn, isPlayerOne, isPot) => {
  if ((isPlayerOneTurn && isPlayerOne) || (!isPlayerOneTurn && !isPlayerOne)) {
    return {
      ...stat,
      attempt: stat.attempt + 1,
      ballsPotted: isPot ? stat.ballsPotted + 1 : stat.ballsPotted
    };
  } else return stat;
};

export default matchReducer;
