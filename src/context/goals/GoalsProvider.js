import React, { useReducer } from "react";
import GoalsContext from "./GoalsContext";
import goalsReducer from "./goalsReducer";

const initialState = {
  goals: [
    {
      id: "1",
      content: "first goal",
      isCompleted: false
    },
    {
      id: "2",
      content: "second goal",
      isCompleted: false
    },
    {
      id: "3",
      content: "third goal",
      isCompleted: true
    }
  ]
};

const GoalsProvider = ({ children }) => {
  const [goalsState, dispatch] = useReducer(goalsReducer, initialState);

  const completeGoal = id => {
    dispatch({ type: "COMPLETE_GOAL", id });
  };

  const toggleGoal = id => {
    dispatch({ type: "TOGGLE_GOAL", id });
  };

  return (
    <GoalsContext.Provider value={{ goalsState, completeGoal, toggleGoal }}>
      {children}
    </GoalsContext.Provider>
  );
};

export default GoalsProvider;
