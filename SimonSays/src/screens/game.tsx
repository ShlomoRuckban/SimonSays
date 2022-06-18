import React, {useState} from 'react';
import {Props} from '../navigation';

import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Game = ({navigation}: Props) => {
  const [userTurn, isUserTurn] = useState(false);
  const [turnCounter, setTurnCounter] = useState(0);
  const [stepCounter, setStepCounter] = useState(0);
  const [isRedPressed, setRedPressed] = useState(false);
  const [isYellowPressed, setYellowPressed] = useState(false);
  const [isBluePressed, setBluePressed] = useState(false);
  const [isGreenPressed, setGreenPressed] = useState(false);

  const handleRedClick = (e: any) => {
    if (!userTurn) return;

    setRedPressed(false);
    setYellowPressed(false);
    setBluePressed(false);
    setGreenPressed(false);

    if (e === 'red') {
      setRedPressed(true);
    }
    if (e === 'yellow') {
      setYellowPressed(true);
    }
    if (e === 'blue') {
      setBluePressed(true);
    }
    if (e === 'green') {
      setGreenPressed(true);
    }

    // setTurnCounter(turnCounter + 1);
    setStepCounter(stepCounter + 1);
  };

  let currentScore = turnCounter;
  let userActive = userTurn ? 0 : 1;

  return (
    <View>
      <View style={styles.board}>
        <View>
          <TouchableOpacity
            activeOpacity={userActive}
            style={[styles.colorContainer, styles.red]}
            onPress={() => handleRedClick('red')}
          />
          <TouchableOpacity
            activeOpacity={userActive}
            style={[styles.colorContainer, styles.yellow]}
            onPress={() => handleRedClick('yellow')}
          />
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={userActive}
            style={[styles.colorContainer, styles.blue]}
            onPress={() => handleRedClick('blue')}
          />
          <TouchableOpacity
            activeOpacity={userActive}
            style={[styles.colorContainer, styles.green]}
            onPress={() => handleRedClick('green')}
          />
        </View>
      </View>
      <Text style={styles.score}>Current Score: {turnCounter}</Text>
      <Button
        title="Go to ScoreBoard"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Score', {
            score: currentScore,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    marginTop: 16,
    marginBottom: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorContainer: {
    width: 150,
    height: 150,
  },
  red: {
    backgroundColor: 'red',
  },
  yellow: {
    backgroundColor: 'yellow',
  },
  blue: {
    backgroundColor: 'blue',
  },
  green: {
    backgroundColor: 'green',
  },
  score: {
    marginBottom: 10,
  },
});
export default Game;
