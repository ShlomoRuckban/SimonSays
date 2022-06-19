import React, {useState} from 'react';
import {Props} from '../navigation';

import {StyleSheet, Text, View} from 'react-native';

const list = [
  {name: 'Shlomo', score: 10, place: 1},
  {name: 'Shlomo', score: 9, place: 2},
  {name: 'Shlomo', score: 8, place: 3},
  {name: 'Shlomo', score: 7, place: 4},
  {name: 'Shlomo', score: 6, place: 5},
  {name: 'Shlomo', score: 5, place: 6},
  {name: 'Shlomo', score: 4, place: 7},
  {name: 'Shlomo', score: 3, place: 8},
  {name: 'Shlomo', score: 2, place: 9},
  {name: 'Shlomo', score: 1, place: 10},
];

const Score = ({navigation}: Props) => {
  let winnerList = list.map(winner => {
    return (
      <View key={winner.place} style={styles.winner}>
        <Text style={styles.spot}>{winner.place}</Text>
        <Text style={styles.name}>{winner.name}</Text>
        <Text style={styles.score}>{winner.score}</Text>
      </View>
    );
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}>
      <View>
        <View style={styles.winner}>
          <Text style={styles.spot}></Text>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.score}>Score</Text>
        </View>
        <View>{winnerList}</View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  winner: {
    flexDirection: 'row',
    width: '100%',
  },
  spot: {
    width: '12%',
    fontSize: 30,
    color: "grey"
  },
  name: {
    width: '43%',
    fontSize: 30,
    color: "grey"
  },
  score: {
    width: '45%',
    fontSize: 30,
    color: "grey"
  },
});
export default Score;
