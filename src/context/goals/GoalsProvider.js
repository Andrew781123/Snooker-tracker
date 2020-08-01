import React, { useReducer } from "react";
import GoalsContext from "./GoalsContext";
import goalsReducer from "./goalsReducer";
import api from "../../api/tracker";

const initialState = {
  goals: [],
  loadingGoals: false,
  goalsError: null
};

const GoalsProvider = ({ children }) => {
  const [goalsState, dispatch] = useReducer(goalsReducer, initialState);

  const getGoals = async userId => {
    dispatch({ type: "SET_GOALS_LOADING" });
    try {
      const res = await api.get(`/users/${userId.toString()}/goals`);

      dispatch({ type: "GET_GOALS_SUCCESS", goals: res.data.goals });
    } catch (err) {
      dispatch({ type: "GET_GOALS_FAIL", error: "Cannot load goals" });
    }
  };

  const addGoal = async (userId, goal) => {
    dispatch({ type: "ADD_GOAL", goal });
    try {
      const res = await api.post(`/users/${userId.toString()}/goals`, {
        ...goal
      });

      dispatch({
        type: "ADD_GOAL_SUCCESS",
        goalId: goal._id,
        newGoalId: res.data.newGoal._id
      });
    } catch (err) {
      dispatch({ type: "ADD_GOAL_FAIL", goalId: goal._id });
    }
  };

  const completeGoal = id => {
    dispatch({ type: "COMPLETE_GOAL", id });
  };

  const toggleGoal = async id => {
    dispatch({ type: "TOGGLE_GOAL", id });
    try {
      axios.patch("/users/1/goals");
    } catch (err) {}
  };

  return (
    <GoalsContext.Provider
      value={{ goalsState, completeGoal, toggleGoal, addGoal, getGoals }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export default GoalsProvider;
