import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Overlay } from "react-native-elements";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome
} from "@expo/vector-icons";

import EditOverlay from "./EditOverlay";
import DeleteOverlayContent from "./DeleteOverlay";

const IncompleteGoalItem = props => {
  const { goal, completeGoal, index, toggleGoal, handleDelete, userId } = props;
  const { _id, content } = goal;

  const [editMode, setEditMode] = useState({
    isEdit: false,
    contentToEdit: ""
  });

  const [showDelete, setShowDelete] = useState(false);

  const disableEdit = () => {
    setEditMode(editMode => {
      return {
        ...editMode,
        isEdit: !editMode.isEdit
      };
    });
  };

  const enableEdit = () => {
    setEditMode(editMode => {
      return {
        ...editMode,
        isEdit: !editMode.isEdit,
        contentToEdit: content
      };
    });
  };

  return (
    <View style={styles.goalItemContainer}>
      <Text style={styles.number}>#{index}</Text>
      <Text style={styles.goalItemContent}>{content}</Text>

      <View style={styles.optionButtons}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name={"checkbox-blank-outline"}
            size={24}
            color='black'
            onPress={() => toggleGoal(userId, _id, goal.isCompleted)}
            style={{ marginRight: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={enableEdit}>
          <FontAwesome5
            name='edit'
            size={24}
            color='black'
            style={{ marginRight: 5 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowDelete(true)}>
          <FontAwesome name='trash-o' size={24} color='black' />
        </TouchableOpacity>
      </View>

      <Overlay isVisible={showDelete}>
        <DeleteOverlayContent
          handleDelete={handleDelete}
          setShowDelete={setShowDelete}
          goalId={_id}
          showDelete={showDelete}
        />
      </Overlay>

      <EditOverlay
        goalId={_id}
        userId={userId}
        isEdit={editMode.isEdit}
        contentToEdit={editMode.contentToEdit}
        disableEdit={disableEdit}
      />
    </View>
  );
};

export default IncompleteGoalItem;

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
