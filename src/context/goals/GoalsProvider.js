import React, { useReducer } from "react";
import GoalsContext from "./GoalsContext";
import goalsReducer from "./goalsReducer";
import api from "../../api/tracker";
import NetInfo from "@react-native-community/netinfo";

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

  const addGoal = async (userId, goal, unsubscribe) => {
    if (unsubscribe) {
      unsubscribe();
    } else {
      dispatch({
        type: "ADD_GOAL",
        goal
      });
    }

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
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          dispatch({
            type: "ADD_GOAL_FAIL",
            errorMessage: "You are offline, your goal will be added once online"
          });

          const unsubscribe = NetInfo.addEventListener(async state => {
            if (state.isInternetReachable) {
              addGoal(userId, goal, unsubscribe);
            }
          });
        }
      });
    }
  };

  const toggleGoal = async (userId, goalId, isCompleted, reached_at) => {
    dispatch({ type: "TOGGLE_GOAL", goalId: goalId.toString(), reached_at });
    try {
      const res = await api.patch(
        `/users/${userId.toString()}/goals/${goalId.toString()}`,
        {
          isCompleted: !isCompleted,
          reached_at
        }
      );
    } catch (err) {
      dispatch({ type: "TOGGLE_GOAL_FAIL" });
    }
  };

  const editGoal = async (userId, goalId, content) => {
    dispatch({ type: "EDIT_GOAL", content, goalId });
    try {
      const res = await api.patch(
        `/users/${userId.toString()}/goals/${goalId.toString()}`,
        { content }
      );
    } catch (err) {}
  };

  const deleteGoal = async (userId, goalId) => {
    dispatch({ type: "DELETE_GOAL", userId, goalId });
    try {
      const res = await api.delete(
        `/users/${userId.toString()}/goals/${goalId.toString()}`
      );
    } catch (err) {}
  };

  return (
    <GoalsContext.Provider
      value={{
        goalsState,
        toggleGoal,
        addGoal,
        getGoals,
        editGoal,
        deleteGoal
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export default GoalsProvider;
