import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import WelcomeBlock from "../components/DashBoard/WelcomeBlock";

const DashBoardScreen = props => {
  const { navigation } = props;

  return (
    <View style={styles.dashBoardScreen}>
      <WelcomeBlock />
      <Button
        title='New Battle'
        onPress={() => navigation.navigate("Battle", { screen: "New_Battle" })}
      />
    </View>
  );
};

export default DashBoardScreen;

const styles = StyleSheet.create({
  dashBoardScreen: {
    flex: 1
  }
});
