import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome
} from "@expo/vector-icons";

const GoalItem = props => {
  const { content, isCompleted, index } = props;

  return (
    <View style={styles.goalItemContainer}>
      <Text style={styles.number}>#{index}</Text>
      <Text style={styles.goalItemContent}>{content}</Text>
      {!isCompleted && (
        <>
          <MaterialCommunityIcons
            name={"checkbox-blank-outline"}
            size={24}
            color='black'
          />
          <View style={styles.optionButtons}>
            <FontAwesome5
              name='edit'
              size={24}
              color='black'
              style={{ marginRight: 5 }}
            />
            <FontAwesome name='trash-o' size={24} color='black' />
          </View>
        </>
      )}
    </View>
  );
};

export default GoalItem;

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
