import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import usePopToTop from "../custome-hooks/usePopToTop";

const SettingsScreen = props => {
  const { navigation } = props;

  usePopToTop(navigation);

  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
