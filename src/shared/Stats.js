import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import StatItem from "../components/DashBoard/StatItem";

const Stats = props => {
  const { stats, title, loading } = props;

  const renderStat = ({ item }) => {
    return <StatItem category={item} data={stats[item]} />;
  };

  return (
    <View style={styles.lastTenStatsContainer}>
      <Text>{title}</Text>
      {loading ? (
        <ActivityIndicator size='small' />
      ) : (
        <FlatList
          data={Object.keys(stats)}
          renderItem={renderStat}
          keyExtractor={item => item}
          numColumns='2'
        />
      )}
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  lastTenStatsContainer: {}
});
