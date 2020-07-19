import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Icon } from "react-native-elements";

const ErrorMessage = props => {
  const { errorMessage } = props;

  return (
    <View style={styles.errorContainer}>
      <Icon name='alert-circle' type='feather' color='#ff0033' />
      <Text h5 style={styles.errorMessage}>
        {errorMessage}
      </Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  errorMessage: {
    marginLeft: 5,
    color: "red"
  }
});
