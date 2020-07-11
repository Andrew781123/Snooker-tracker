import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import authContext from "../context/auth/authContext";

const DashBoardScreen = props => {
  const { navigation } = props;
  const { authState } = useContext(authContext);
  console.log(authState);

  return (
    <View>
      <Text>DashBoard</Text>
      <Button
        title='New Battle'
        onPress={() => navigation.navigate("Battle", { screen: "New_Battle" })}
      />
    </View>
  );
};

export default DashBoardScreen;

const styles = StyleSheet.create({});
