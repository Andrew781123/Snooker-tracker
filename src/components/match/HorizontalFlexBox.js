import React from "react";
import { StyleSheet, View } from "react-native";

const HorizontalFlexBox = props => {
  const { justifyContent } = props;

  return (
    <View
      style={{ ...styles.horizontalFlexBox, justifyContent: justifyContent }}
    >
      {props.children}
    </View>
  );
};

export default HorizontalFlexBox;

const styles = StyleSheet.create({
  horizontalFlexBox: {
    width: "100%",
    flexDirection: "row"
  }
});
