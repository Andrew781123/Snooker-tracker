import React, { useState } from "react";
import { StyleSheet, Picker, View } from "react-native";
// import { Picker } from "@react-native-community/picker";
import { Input } from "react-native-elements";
import Label from "./Label";
import years from "../../resources/years";
import SearchBar from "../../shared/SearchBar";

const SetupForm = () => {
  const [yearStarted, setYearStarted] = useState(2020);

  const handleSelect = val => {
    setYearStarted(val);
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
      <SearchBar />
      <Input placeholder='Bio' />
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
