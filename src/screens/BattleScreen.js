import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const BattleScreen = props => {
  const { navigation } = props;

  return (
    <View>
      <Text>Battle</Text>
      <Button
        title='End'
        onPress={() => navigation.navigate("Main", { screen: "DashBoard" })}
      />
    </View>
  );
};

export default BattleScreen;

const styles = StyleSheet.create({});
