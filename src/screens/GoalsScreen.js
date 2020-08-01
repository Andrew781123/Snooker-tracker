import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity
} from "react-native";
import Goals from "../components/goals/Goals";
import GoalsContext from "../context/goals/GoalsContext";
import authContext from "../context/auth/authContext";

const GoalsScreen = ({ navigation }) => {
  const [goalContent, setGoalContent] = useState(goalContent);

  const { addGoal, getGoals } = useContext(GoalsContext);

  const { authState } = useContext(authContext);
  const { user } = authState;

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () =>
      console.log("blur")
    );

    return unsubscribe;
  });

  useEffect(() => {
    getGoals(user._id);
  }, []);

  const handleAddGoal = () => {
    setGoalContent("");

    const newGoal = {
      _id: Date.now().toString() + goalContent,
      content: goalContent,
      isCompleted: false
    };

    addGoal(user._id, newGoal);
  };

  return (
    <View style={styles.goalScreenContainer}>
      <Goals title='My Goals' showCompleted={false} />
      <View style={styles.newGoal}>
        <TextInput
          placeholder='Add new goal'
          placeholderTextColor='white'
          style={styles.input}
          value={goalContent}
          onChangeText={text => setGoalContent(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddGoal}>
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
