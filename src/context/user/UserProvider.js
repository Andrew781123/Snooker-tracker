import React from "react";
import UserContext from "./UserContext";
import { useReducer } from "react";
import userReducer from "./userReducer";
import api from "../../api/tracker";

const initialState = {
  lastTenStats: {},
  alltimeStats: {},
  lastTenStatsLoading: false,
  alltimeStatsLoading: false
};

const UserProvider = props => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const getAlltimeStats = async userId => {
    dispatch({ type: "SET_ALLTIME_STATS_LOADING" });
    try {
      const res = await api.get(`/users/${userId.toString()}/stats`);

      dispatch({ type: "GET_ALLTIME_STATS", stats: res.data.stats[0] });
    } catch (err) {
      console.log(err);
    }
  };

  const getLastTenStats = async userId => {
    dispatch({ type: "SET_LAST_TEN_STATS_LOADING" });
    try {
      const res = await api.get(`/users/${userId.toString()}/stats?num=10`);

      dispatch({ type: "GET_LAST_TEN_STATS", stats: res.data.stats[0] });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider
      value={{ userState, getAlltimeStats, getLastTenStats }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
