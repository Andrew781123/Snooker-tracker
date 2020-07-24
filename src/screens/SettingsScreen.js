import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import useBlur from "../custome-hooks/useBlur";
import { StackActions } from "@react-navigation/native";

const SettingsScreen = props => {
  const { navigation } = props;

  const callBack = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  useBlur(callBack, navigation);

  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
