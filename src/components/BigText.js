import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BigText = ({ instruction }) => {
  return (
    <View style={styles.bigTextContainer}>
      <Text style={styles.bigText}>{instruction}</Text>
    </View>
  );
};

export default BigText;

const styles = StyleSheet.create({
  bigTextContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#42c5f5"
  },
  bigText: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold"
  }
});
