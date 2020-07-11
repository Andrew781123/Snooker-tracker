import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const BattleScreen = props => {
  const { navigation, route } = props;

  return (
    <View>
      <Text>Battle</Text>
      <Text>{route.params.playerToBreakOff}</Text>
      <Button
        title='End'
        onPress={() => navigation.navigate("Battle_Result")}
      />
    </View>
  );
};

export default BattleScreen;

const styles = StyleSheet.create({});
