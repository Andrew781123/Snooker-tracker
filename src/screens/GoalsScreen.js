import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity
} from "react-native";
import Goals from "../components/goals/Goals";

const GoalsScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () =>
      console.log("blur")
    );

    return unsubscribe;
  });

  return (
    <View style={styles.goalScreenContainer}>
      <Goals title='My Goals' showCompleted={false} />
      <View style={styles.newGoal}>
        <TextInput
          placeholder='Add new goal'
          placeholderTextColor='white'
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <Button
        title='View completed goals'
        onPress={() => navigation.navigate("Completed_Goals")}
      />
    </View>
  );
};

export default GoalsScreen;

const styles = StyleSheet.create({
  goalScreenContainer: {
    flex: 1,
    backgroundColor: "#c2f2ff"
  },
  input: {
    color: "black",
    padding: 5,
    backgroundColor: "orange",
    width: "80%"
  },
  newGoal: {
    flexDirection: "row",
    backgroundColor: "black"
  },
  addButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: "20%"
  },
  addButtonText: {
    color: "white"
  }
});
