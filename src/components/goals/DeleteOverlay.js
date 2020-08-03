import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-elements";

const DeleteOverlayContent = props => {
  const { handleDelete, setShowDelete, goalId } = props;

  return (
    <View>
      <Text h2>Are you sure to delete this goal?</Text>
      <Button
        title='Cancel'
        color='orange'
        onPress={() => setShowDelete(false)}
      />
      <Button title='Yes' color='red' onPress={() => handleDelete(goalId)} />
    </View>
  );
};

export default DeleteOverlayContent;

const styles = StyleSheet.create({});
