import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const SearchScreen = () => {
  return (
    <View>
      <TextInput placeholder='Search User' style={styles.input} />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    margin: 10,
    paddingBottom: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 2
  }
});
