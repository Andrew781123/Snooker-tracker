import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const UserProfileScreen = props => {
  const { navigation } = props;

  return (
    <View>
      <Text>Profile</Text>
      <Button
        title='Settings'
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({});
