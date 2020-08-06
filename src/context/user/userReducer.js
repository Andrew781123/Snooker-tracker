const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALLTIME_STATS_LOADING": {
      return {
        ...state,
        alltimeStatsLoading: true
      };
    }
    case "SET_LAST_TEN_STATS_LOADING": {
      return {
        ...state,
        lastTenStatsLoading: true
      };
    }
    case "GET_ALLTIME_STATS": {
      return {
        ...state,
        alltimeStats: action.stats || {},
        alltimeStatsLoading: false
      };
    }
    case "GET_LAST_TEN_STATS": {
      return {
        ...state,
        lastTenStats: action.stats || {},
        lastTenStatsLoading: false
      };
    }
    default:
      return state;
  }
};

export default userReducer;
