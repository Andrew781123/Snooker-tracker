import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import CheckBox from "react-native";

const initialMatchState = {
  frameNum: 1,
  playerOneName: "Andrew",
  playerTwoName: "Felix",
  player_1BreakOff: true,
  player_2BreakOff: false
};

const NewBattleScreen = props => {
  const { navigation } = props;

  const [matchOptions, setMatchOptions] = useState(initialMatchState);

  const incrementFrameNum = () => {
    if (matchOptions.frameNum <= 5) {
      setMatchOptions(options => {
        return {
          ...options,
          frameNum: (options.frameNum += 1)
        };
      });
    }
  };

  const decrementFrameNum = () => {
    if (matchOptions.frameNum !== 1) {
      setMatchOptions(options => {
        return {
          ...options,
          frameNum: (options.frameNum -= 1)
        };
      });
    }
  };

  const handlePlayer_1BreakOff = () => {
    setMatchOptions(options => {
      return {
        ...options,
        player_1BreakOff: !options.player_1BreakOff,
        player_2BreakOff: options.player_2BreakOff && !options.player_2BreakOff
      };
    });
  };

  const handlePlayer_2BreakOff = () => {
    setMatchOptions(options => {
      return {
        ...options,
        player_2BreakOff: !options.player_2BreakOff,
        player_1BreakOff: options.player_1BreakOff && !options.player_1BreakOff
      };
    });
  };

  const handleStartMatch = () => {
    const playerToBreakOff = matchOptions.player_1BreakOff
      ? matchOptions.playerOneName
      : matchOptions.playerTwoName;
    navigation.navigate("Battle", {
      frameNum: matchOptions.frameNum,
      playerToBreakOff,
      playerOneName: matchOptions.playerOneName,
      playerTwoName: matchOptions.playerTwoName
    });
  };

  return (
    <View>
      <Text>New battle</Text>
      <View>
        <Text>Frame Number</Text>
        <View style={styles.frameOptionsStyle}>
          <Button title='-' onPress={decrementFrameNum} />
          <Text>{matchOptions.frameNum}</Text>
          <Button title='+' onPress={incrementFrameNum} />
        </View>
        <View>
          <Text>Player to breakoff</Text>
          <View>
            <Text>Player1</Text>
            <CheckBox
              disabled={false}
              value={matchOptions.player_1BreakOff}
              onValueChange={handlePlayer_1BreakOff}
            />
            <Text>Player2</Text>
            <CheckBox
              disabled={false}
              value={matchOptions.player_2BreakOff}
              onValueChange={handlePlayer_2BreakOff}
            />
          </View>
        </View>
      </View>
      <Button title='start battle' onPress={handleStartMatch} />
      <Button title='Cancel' onPress={() => navigation.goBack()} />
    </View>
  );
};

export default NewBattleScreen;

const styles = StyleSheet.create({
  frameOptionsStyle: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center"
  },
  optionButtons: {
    width: 10,
    backgroundColor: "black"
  }
});
