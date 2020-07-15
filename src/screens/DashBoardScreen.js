import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const DashBoardScreen = props => {
  const { navigation } = props;

  return (
    <View>
      <Text>DashBoard</Text>
      <Button
        title='New Battle'
        onPress={() => navigation.navigate("Battle", { screen: "New_Battle" })}
      />
      <Button
        title='Mangage Goals'
        onPress={() => navigation.navigate("User_Profile", { screen: "Goals" })}
      />
    </View>
  );
};

export default DashBoardScreen;

const styles = StyleSheet.create({});
