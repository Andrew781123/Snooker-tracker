import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const BattleResultScreen = props => {
  const { navigation } = props;

  return (
    <View>
      <Text>Battle result</Text>
      <Button
        title='Back to DashBoard'
        onPress={() => navigation.navigate("Main", { screen: "DashBoard" })}
      />
    </View>
  );
};

export default BattleResultScreen;

const styles = StyleSheet.create({});
