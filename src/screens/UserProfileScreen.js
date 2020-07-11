import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import authContext from "../context/auth/authContext";

const UserProfileScreen = props => {
  const { navigation } = props;

  const { logout } = useContext(authContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <View>
      <Text>Profile</Text>
      <Button
        title='Settings'
        onPress={() => navigation.navigate("Settings")}
      />
      <Button title='Logout' onPress={handleLogout} />
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({});
