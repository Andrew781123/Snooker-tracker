import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Ball = props => {
  const { color, score, handleClick } = props;

  return (
    <TouchableOpacity
      style={{ ...styles.ballStyle, backgroundColor: color }}
      onPress={() => handleClick(score && score, score === 1 && true)}
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
