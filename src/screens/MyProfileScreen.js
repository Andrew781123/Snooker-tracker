import React, { useContext, useLayoutEffect, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import authContext from "../context/auth/authContext";
import Stat from "../shared/Stats";
import { Feather } from "@expo/vector-icons";

const lastTenStat = {
  highestBreak: 20,
  ballsPotted: 100,
  potSuccess: "60%",
  matchWinRate: "66%",
  frameWinRate: "70%"
};

const allTimeStat = {
  highestBreak: 60,
  ballsPotted: 1000,
  potSuccess: "70%",
  matchWinRate: "56%",
  frameWinRate: "60%"
};

const MyProfileScreen = props => {
  const { navigation } = props;

  const { logout } = useContext(authContext);

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
      <Stat stat={lastTenStat} title='Last 10 Stats' />
      <Stat stat={allTimeStat} title='All time Stats' />
      <Button title='Logout' onPress={handleLogout} />
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({});
