const goalsReducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE_GOAL": {
      return {
        ...state,
        goals: state.goals.map(goal => {
          if (goal.id === action.id) {
            return {
              ...goal,
              isCompleted: true
            };
          } else return goal;
        })
      };
    }
    case "TOGGLE_GOAL": {
      return {
        ...state,
        goals: state.goals.map(goal => {
          if (goal.id === action.id) {
            return {
              ...goal,
              isCompleted: !goal.isCompleted
            };
          } else return goal;
        })
      };
    }
    default:
      return state;
  }
};

export default goalsReducer;
