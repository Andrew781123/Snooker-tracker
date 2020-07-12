import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Ball = props => {
  const { color, score, handleClick, currentColor } = props;

  const disable =
    currentColor === null || currentColor === color || props.text
      ? false
      : true;

  return (
    <TouchableOpacity
      disabled={disable}
      style={{ ...styles.ballStyle, backgroundColor: color }}
      onPress={() => handleClick(score && score)}
    >
      <Text style={{ textAlign: "center", marginTop: 15, color: "white" }}>
        {props.text && props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Ball;

const styles = StyleSheet.create({
  ballStyle: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
});
