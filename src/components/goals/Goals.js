import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import GoalItem from "./GoalItem";
import GoalsContext from "../../context/goals/GoalsContext";
import { FlatList } from "react-native-gesture-handler";

const renderCompleted = ({ item, idx = 0 }) => {
  if (item.isCompleted) {
    idx++;
    return (
      <GoalItem
        content={item.content}
        isCompleted={item.isCompleted}
        index={idx}
      />
    );
  }
};

const renderNotCompleted = ({ item, idx = 0 }) => {
  if (!item.isCompleted) {
    idx++;
    return (
      <GoalItem
        content={item.content}
        isCompleted={item.isCompleted}
        index={idx}
      />
    );
  }
};

const Goals = props => {
  const { title, showCompleted } = props;

  const { goalsState } = useContext(GoalsContext);
  const { goals } = goalsState;

  return (
    <View style={styles.goalsContainer}>
      <Text style={styles.goalTitle}>{title}</Text>
      {!showCompleted ? (
        <FlatList
          data={goals}
          renderItem={renderNotCompleted}
          keyExtractor={item => item.id}
        />
      ) : (
        <FlatList
          data={goals}
          renderItem={renderCompleted}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default Goals;

const styles = StyleSheet.create({
  goalsContainer: {
    justifyContent: "center",
    marginTop: 50
  },
  goalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 3,
    width: "100%",
    textAlign: "center"
  }
});
