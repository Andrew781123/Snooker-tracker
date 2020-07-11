import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const NewBattleScreen = props => {
  const { navigation } = props;

  return (
    <View>
      <Text>New battle</Text>
      <Button
        title='start battle'
        onPress={() => navigation.navigate("Battle")}
      />
      <Button title='Cancel' onPress={() => navigation.goBack()} />
    </View>
  );
};

export default NewBattleScreen;

const styles = StyleSheet.create({});
