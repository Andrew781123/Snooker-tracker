const authReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER": {
      return {
        ...state,
        token: action.token
      };
    }
    case "REGISTER_FAIL": {
      return {
        ...state,
        error: action.errMsg
      };
    }
    case "LOGIN": {
      return {
        ...state,
        token: action.token
      };
    }
    case "LOGIN_FAIL": {
      return {
        ...state,
        error: action.errMsg
      };
    }
    case "LOG_OUT": {
      return {
        ...state,
        token: null
      };
    }
    default:
      return state;
  }
};

export default authReducer;
