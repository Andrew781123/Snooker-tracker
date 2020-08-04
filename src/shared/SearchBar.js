import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";
import players from "../resources/snookerPlayers";
import { FlatList, TextInput } from "react-native-gesture-handler";
import PlayerResultItem from "../components/Forms/PlayerResultItem";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playerSelected, setPlayerSelected] = useState(null);

  useEffect(() => {
    if (searchParams !== "") {
      setSearchResults([]);
      let regex = new RegExp(searchParams, "gi");
      let count = 0;
      for (let i = 0; i < players.length; i++) {
        if (players[i].match(regex)) {
          count++;
          setSearchResults(searchResults => [...searchResults, players[i]]);
        }
        if (count >= 5) break;
      }
    }
  }, [searchParams]);

  const renderResults = ({ item }) => (
    <PlayerResultItem
      playerName={item}
      handlePlayerSelect={handlePlayerSelect}
    />
  );

  const handlePlayerSelect = playerName => {
    setPlayerSelected(playerName);
    setSearchResults([]);
    setSearchParams("");
  };

  return (
    <>
      <TextInput
        placeholder='Search player'
        value={playerSelected ? playerSelected : searchParams}
        onChangeText={text => setSearchParams(text)}
        style={styles.searchInput}
      />
      <View style={styles.resultsContainer}>
        <FlatList
          data={searchResults}
          renderItem={renderResults}
          keyExtractor={(item, idx) => idx.toString()}
        />
      </View>
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    width: 100
  },
  resultsContainer: {
    backgroundColor: "#8f8f8f",
    marginTop: 0
  },
  searchInput: {
    borderBottomColor: "#adadad",
    borderBottomWidth: 1,
    fontSize: 15,
    marginBottom: 5
  }
});
