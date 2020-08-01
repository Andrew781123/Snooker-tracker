import React from "react";
import { StyleSheet, Text } from "react-native";
import { Overlay } from "react-native-elements";
import EditOverlayContent from "./EditOverlayContent";

const EditOverlay = props => {
  const { isEdit, contentToEdit, disableEdit, goalId, userId } = props;

  return (
    <Overlay isVisible={isEdit} onBackdropPress={disableEdit}>
      <EditOverlayContent
        contentToEdit={contentToEdit}
        disableEdit={disableEdit}
        goalId={goalId}
        userId={userId}
      />
    </Overlay>
  );
};

export default EditOverlay;

const styles = StyleSheet.create({});
