import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CompletedGoalItem = props => {
  const { goal, index, toggleGoal } = props;
  const { id, content } = goal;

  return (
    <View style={styles.goalItemContainer}>
      <Text style={styles.number}>#{index}</Text>
      <Text style={styles.goalItemContent}>{content}</Text>
      <View style={styles.optionButtons}>
        <TouchableOpacity onPress={() => toggleGoal(id)}>
          <MaterialCommunityIcons name='reload' size={24} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompletedGoalItem;

const styles = StyleSheet.create({
  goalItemContainer: {
    width: "100%",
    flexDirection: "row",
    flex: 1,
    marginBottom: 10
  },
  number: {
    fontSize: 20,
    marginRight: 5,
    color: "red"
  },
  goalItemContent: {
    fontSize: 20,
    marginRight: 10
  },
  optionButtons: {
    flexDirection: "row",
    marginLeft: "auto"
  }
});
