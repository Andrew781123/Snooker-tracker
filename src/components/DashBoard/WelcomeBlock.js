import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Stats from "../../shared/Stats";

const stat = {
  highestBreak: 20,
  ballsPotted: 100,
  potSuccess: "60%",
  matchWinRate: "66%",
  frameWinRate: "70%"
};

const WelcomeBlock = props => {
  const { username } = props;

  return (
    <View style={styles.welcomeBlockContainer}>
      <View style={styles.welcomeMessage}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
      <Stats stats={stat} title='Last 10 Stats' />
    </View>
  );
};

export default WelcomeBlock;

const styles = StyleSheet.create({
  welcomeBlockContainer: {
    backgroundColor: "pink"
  },
  welcomeMessage: {
    flexDirection: "row"
  },
  welcomeText: {
    fontSize: 22,
    marginRight: 5
  },
  username: {
    fontSize: 22,
    fontWeight: "bold"
  }
});
