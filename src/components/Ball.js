import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Ball = props => {
  const {
    color = "gray",
    score,
    handleClick,
    currentColor,
    frameWinner
  } = props;

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    let isDisable = false;
    if (frameWinner) {
      isDisable = true;
    } else if (!currentColor) {
      isDisable = false;
    } else if (currentColor) {
      if (currentColor === color || color === "gray") {
        isDisable = false;
      } else {
        isDisable = true;
      }
    }

    setDisable(isDisable);
  }, [frameWinner, currentColor, props.text]);

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
