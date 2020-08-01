import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import GoalsContext from "../../context/goals/GoalsContext";

const EditOverlayContent = props => {
  const { contentToEdit, disableEdit, goalId, userId } = props;

  const [goalContent, setGoalContent] = useState(contentToEdit);

  const { editGoal } = useContext(GoalsContext);

  const handleEditGoal = () => {
    editGoal(userId, goalId, goalContent);
    disableEdit();
  };

  return (
    <View>
      <Text h2>Edit Goal</Text>
      <Input value={goalContent} onChangeText={text => setGoalContent(text)} />
      <Button title='Cancel' color='red' onPress={() => disableEdit()} />
      <Button title='Edit' color='blue' onPress={handleEditGoal} />
    </View>
  );
};

export default EditOverlayContent;

const styles = StyleSheet.create({});
