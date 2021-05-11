import React, { useState, useContext } from "react";
import { StyleSheet, Picker, View } from "react-native";
// import { Picker } from "@react-native-community/picker";
import { Input } from "react-native-elements";
import Label from "./Label";
import years from "../../resources/years";
import SearchBar from "../../shared/SearchBar";
import { Button } from "react-native-elements";
import authContext from "../../context/auth/authContext";

const SetupForm = () => {
  const [yearStarted, setYearStarted] = useState(2020);
  const [isSubmit, setIsSubmit] = useState(false);
  const [playerSelected, setPlayerSelected] = useState(null);
  const [bio, setBio] = useState("");

  const { setupUser } = useContext(authContext);

  const handleSelect = val => {
    setYearStarted(val);
  };

  const handleNext = async () => {
    setIsSubmit(true);

    const userInfo = {
      favouritePlayer: playerSelected,
      yearStarted,
      bio
    };
    await setupUser(userInfo);
  };

  return (
    <View style={styles.setupForm}>
      <Label label='When you started playing snooker?' />
      <Picker
        selectedValue={yearStarted}
        onValueChange={itemValue => handleSelect(itemValue)}
      >
        {years &&
          years.map(year => (
            <Picker.Item label={year.toString()} value={year} key={year} />
          ))}
      </Picker>

      <Label label='Who is your favourite snooker player?' />
      <SearchBar
        playerSelected={playerSelected}
        setPlayerSelected={setPlayerSelected}
      />
      <Input
        placeholder='Bio'
        value={bio}
        onChangeText={text => setBio(text)}
      />

      <Button title='Next' onPress={handleNext} loading={isSubmit} />
    </View>
  );
};

export default SetupForm;

const styles = StyleSheet.create({
  setupForm: {
    width: "80%",
    backgroundColor: "grey",
    padding: 15
  }
});
