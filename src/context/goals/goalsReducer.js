const goalsReducer = (state, action) => {
  switch (action.type) {
    case "DELETE_GOAL": {
      console.log(action.id);
      return {
        ...state,
        goals: state.goals.filter(goal => goal.id !== action.id)
      };
    }
    default:
      return state;
  }
};

export default goalsReducer;
