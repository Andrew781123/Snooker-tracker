import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button
} from "react-native";
import IncompleteGoalItem from "./IncompleteGoalItem";
import GoalsContext from "../../context/goals/GoalsContext";
import { FlatList } from "react-native-gesture-handler";
import CompletedGoalItem from "./CompletedGoalItem";

const Goals = props => {
  const { title, showCompleted } = props;

  const { goalsState, toggleGoal } = useContext(GoalsContext);
  const { goals, loadingGoals } = goalsState;

  const renderCompleted = ({ item, index }) => {
    if (item.isCompleted) {
      return (
        <CompletedGoalItem goal={item} index={index} toggleGoal={toggleGoal} />
      );
    }
  };

  const renderNotCompleted = ({ item, index }) => {
    if (!item.isCompleted) {
      return (
        <IncompleteGoalItem goal={item} index={index} toggleGoal={toggleGoal} />
      );
    }
  };

  return (
    <View style={styles.goalsContainer}>
      <Text style={styles.goalTitle}>{title}</Text>
      {loadingGoals ? (
        <ActivityIndicator size='large' />
      ) : !showCompleted ? (
        <>
          <FlatList
            data={goals}
            renderItem={renderNotCompleted}
            keyExtractor={item => item._id.toString()}
          />
          <Button onPress={() => console.log(goals)} title='log goals' />
        </>
      ) : (
        <FlatList
          data={goals}
          renderItem={renderCompleted}
          keyExtractor={item => item._id.toString()}
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
