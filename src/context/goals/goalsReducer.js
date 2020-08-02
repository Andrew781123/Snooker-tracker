const goalsReducer = (state, action) => {
  switch (action.type) {
    case "SET_GOALS_LOADING": {
      return {
        ...state,
        loadingGoals: true
      };
    }
    case "CLEAR_GOALS_ERROR": {
      return {
        ...state,
        goalsError: null
      };
    }
    case "ADD_GOAL": {
      return {
        ...state,
        goals: [...state.goals, action.goal]
      };
    }
    case "ADD_GOAL_FAIL": {
      return {
        ...state,
        goalsError: action.errorMessage
      };
    }
    case "ADD_GOAL_SUCCESS": {
      return {
        ...state,
        goals: state.goals.map(goal => {
          if (goal._id.toString() === action.goalId) {
            goal._id = action.newGoalId;
          }
          return goal;
        }),
        goalsError: null
      };
    }
    case "GET_GOALS_SUCCESS": {
      return {
        ...state,
        goals: action.goals,
        loadingGoals: false
      };
    }
    case "GET_GOALS_FAIL": {
      return {
        ...state,
        laodingGoals: false,
        goalsError: action.error
      };
    }
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
          if (goal._id.toString() === action.goalId) {
            return {
              ...goal,
              isCompleted: !goal.isCompleted
            };
          } else return goal;
        })
      };
    }
    case "EDIT_GOAL": {
      return {
        ...state,
        goals: state.goals.map(goal => {
          if (goal._id.toString() === action.goalId.toString()) {
            goal.content = action.content;
          }
          return goal;
        })
      };
    }
    default:
      return state;
  }
};

export default goalsReducer;
