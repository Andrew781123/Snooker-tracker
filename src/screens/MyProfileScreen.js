import React, { useContext, useLayoutEffect, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import authContext from "../context/auth/authContext";
import Stat from "../shared/Stats";
import { Feather } from "@expo/vector-icons";
import UserContext from "../context/user/UserContext";

// const lastTenStats = {
//   highestBreak: 20,
//   ballsPotted: 100,
//   potSuccess: "60%",
//   matchWinRate: "66%",
//   frameWinRate: "70%"
// };

// const alltimeStats = {
//   highestBreak: 60,
//   ballsPotted: 1000,
//   potSuccess: "70%",
//   matchWinRate: "56%",
//   frameWinRate: "60%"
// };

const MyProfileScreen = props => {
  const { navigation } = props;

  const { authState, logout } = useContext(authContext);
  const { user } = authState;

  const { userState, getAlltimeStats, getLastTenStats } = useContext(
    UserContext
  );
  const {
    lastTenStats,
    alltimeStats,
    alltimeStatsLoading,
    lastTenStatsLoading
  } = userState;

  useEffect(() => {
    getLastTenStats(user._id);
    getAlltimeStats(user._id);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Feather name='settings' size={24} color='black' />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const handleLogout = () => {
    logout();
  };

  return (
    <View>
      <View>
        <Stat
          stats={lastTenStats}
          title='Last 10 Stats'
          loading={lastTenStatsLoading}
        />
        <Stat
          stats={alltimeStats}
          title='All time Stats'
          loading={alltimeStatsLoading}
        />
        <Button title='Logout' onPress={handleLogout} />
      </View>
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({});
