import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

const OptionsButtons = props => {
  const { btn1, btn2, btn1Color, btn2Color } = props;

  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <View style={styles.buttonsContainer}>
      <Button
        title={btn1}
        buttonStyle={{
          ...styles.button,
          backgroundColor: btn1Color
        }}
      />
      <Button
        title={btn2}
        buttonStyle={{ ...styles.button, backgroundColor: btn2Color }}
        loading={buttonLoading}
        onPress={() => setButtonLoading(true)}
      />
    </View>
  );
};

export default OptionsButtons;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  button: {
    width: 100
  }
});
