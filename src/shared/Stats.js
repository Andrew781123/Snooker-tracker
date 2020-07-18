import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import StatItem from "../components/DashBoard/StatItem";

const Stats = props => {
  const { stat, title } = props;

  const renderStat = ({ item }) => {
    return <StatItem category={item} data={stat[item]} />;
  };
  return (
    <View style={styles.lastTenStatsContainer}>
      <Text>{title}</Text>
      <FlatList
        data={Object.keys(stat)}
        renderItem={renderStat}
        keyExtractor={item => item}
        numColumns='2'
      />
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  lastTenStatsContainer: {}
});
