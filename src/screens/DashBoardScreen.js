import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import WelcomeBlock from "../components/DashBoard/WelcomeBlock";
import authContext from "../context/auth/authContext";

const DashBoardScreen = props => {
  const { navigation } = props;

  const { authState } = useContext(authContext);
  const { user } = authState;

  return (
    <View style={styles.dashBoardScreen}>
      <WelcomeBlock username={user.username} />
      <Button
        title='New Battle'
        onPress={() => navigation.navigate("Battle", { screen: "New_Battle" })}
      />
      <Button
        title='user profile'
        onPress={() => navigation.navigate("User_Profile")}
      />
    </View>
  );
};

export default DashBoardScreen;

const styles = StyleSheet.create({
  dashBoardScreen: {
    flex: 1
  }
});
