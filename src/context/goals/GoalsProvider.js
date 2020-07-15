import React, { useReducer } from "react";
import GoalsContext from "./GoalsContext";
import goalsReducer from "./goalsReducer";

const initialState = {
  goals: [
    {
      id: "1",
      content: "make a break over 56",
      isCompleted: false
    },
    {
      id: "2",
      content: "make a break over 30",
      isCompleted: false
    },
    {
      id: "3",
      content: "make a break over 30",
      isCompleted: true
    }
  ]
};

const GoalsProvider = ({ children }) => {
  const [goalsState, dispatch] = useReducer(goalsReducer, initialState);

  return (
    <GoalsContext.Provider value={{ goalsState }}>
      {children}
    </GoalsContext.Provider>
  );
};

export default GoalsProvider;
