import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Goals from "../components/goals/Goals";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const GoalsScreen = ({ navigation }) => {
  return (
    <View>
      <Goals title='My Goals' showCompleted={false} />
      <View style={styles.newGoal}>
        <TextInput placeholder='Add new goal' style={styles.input} />
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
  input: {
    padding: 5,
    backgroundColor: "orange",
    flex: 1
  },
  newGoal: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "black"
  },
  addButton: {
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row"
  },
  addButtonText: {
    color: "white"
  }
});
