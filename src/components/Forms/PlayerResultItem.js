import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const PlayerResultItem = props => {
  const { playerName, handlePlayerSelect } = props;

  return (
    <TouchableOpacity
      onPress={() => handlePlayerSelect(playerName)}
      style={styles.resultItem}
    >
      <Text>{playerName}</Text>
    </TouchableOpacity>
  );
};

export default PlayerResultItem;

const styles = StyleSheet.create({
  resultItem: {
    backgroundColor: "#bababa",
    padding: 5
  }
});
