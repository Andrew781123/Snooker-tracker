import React from "react";
import { StyleSheet, View } from "react-native";

const SpaceAroundView = props => {
  return <View style={styles.spaceAroundview}>{props.children}</View>;
};

export default SpaceAroundView;

const styles = StyleSheet.create({
  spaceAroundview: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
