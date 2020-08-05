const authReducer = (state, action) => {
  switch (action.type) {
    case "GET_CURRENT_USER": {
      return {
        ...state,
        user: action.user
      };
    }
    case "SET_AUTH_LOADING": {
      return {
        ...state,
        authLoading: true
      };
    }
    case "SET_TRY_LOGIN": {
      return {
        ...state,
        loadingToken: false
      };
    }
    case "REGISTER": {
      return {
        ...state,
        token: action.token,
        authLoading: false,
        user: action.user
      };
    }
    case "REGISTER_FAIL": {
      return {
        ...state,
        error: action.errMsg,
        authLoading: false
      };
    }
    case "LOGIN": {
      return {
        ...state,
        token: action.token,
        loadingToken: false,
        authLoading: false,
        user: action.user
      };
    }
    case "DEV_LOGIN": {
      return {
        ...state,
        token: "dev-token"
      };
    }
    case "LOGIN_FAIL": {
      return {
        ...state,
        error: action.errMsg,
        loadingToken: false,
        authLoading: false
      };
    }
    case "LOG_OUT": {
      return {
        ...state,
        token: null
      };
    }
    case "CLEAR_ERRORS": {
      return {
        ...state,
        error: null
      };
    }
    default:
      return state;
  }
};

export default authReducer;
