import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import formatDate from "../../utils/formateDate";

const CompletedGoalItem = props => {
  const { goal, index, toggleGoal, userId, handleDelete } = props;
  const { _id, content, reached_at, created_at } = goal;

  const reachedAt = formatDate(reached_at);
  const createdAt = formatDate(created_at);

  return (
    <View style={styles.goalItemContainer}>
      <Text style={styles.number}>#{index}</Text>
      <View style={styles.goalInfo}>
        <Text style={styles.goalItemContent}>{content}</Text>
        <Text style={styles.reactedAtText}>Created: {reachedAt}</Text>
        <Text style={styles.reactedAtText}>Reached: {createdAt}</Text>
      </View>

      <View style={styles.optionButtons}>
        <TouchableOpacity
          onPress={() => toggleGoal(userId, _id, goal.isCompleted)}
        >
          <MaterialCommunityIcons name='reload' size={24} color='black' />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDelete(_id)}>
          <FontAwesome name='trash-o' size={24} color='black' />
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
  },
  goalInfo: {},
  reactedAtText: {
    color: "grey"
  }
});
