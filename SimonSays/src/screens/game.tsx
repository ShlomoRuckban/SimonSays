import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Animated, {Value} from 'react-native-reanimated';

import Sound from 'react-native-sound';

import {Props} from '../navigation';
import getSounds from '../utility/getSounds';

const Game = ({navigation}: Props) => {
  const [isUserTurn, setUserTurn] = useState<boolean>(false);
  const [soundList, SetSoundList] = useState<Sound[]>([]);
  const [turnTrack, setTurntrack] = useState<number[]>([
    0, 2, 3, 1, 2, 1, 0, 3, 1,
  ]);
  const [turnCounter, setTurnCounter] = useState<number>(0);
  const [stepCounter, setStepCounter] = useState<number>(0);

  const [isRedPressed, setRedPressed] = useState<boolean>(false);
  const [isYellowPressed, setYellowPressed] = useState<boolean>(false);
  const [isBluePressed, setBluePressed] = useState<boolean>(false);
  const [isGreenPressed, setGreenPressed] = useState<boolean>(false);

  const [isGameover, setGameOver] = useState<boolean>(false);

  const delay = (ms: number) => {
    const startPoint = new Date().getTime();
    while (new Date().getTime() - startPoint <= ms) {
      /* wait */
    }
  };

  const initialTurn = async () => {
    // setTurntrack(turnTrack => [...turnTrack, Math.floor(Math.random() * 4)]);

    console.log('List length', soundList.length);
    runSteps();
  };

  const runSteps = () => {
    if (!soundList.length) return;
    turnTrack.forEach(turn => {
      if (turn === 0) {
        setRedPressed(true);
        soundList[0].setCurrentTime(0).play();
        delay(500);
        setRedPressed(false);
      }
      if (turn === 1) {
        setYellowPressed(true);
        soundList[1].setCurrentTime(0).play();
        delay(500);
        setYellowPressed(false);
      }
      if (turn === 2) {
        setBluePressed(true);
        soundList[2].setCurrentTime(0).play();
        delay(500);
        setBluePressed(false);
      }
      if (turn === 3) {
        setGreenPressed(true);
        soundList[3].setCurrentTime(0).play();
        delay(500);
        setGreenPressed(false);
      }
      //   console.log(turn);
      delay(1000);
    });
  };

  useEffect(() => {
    SetSoundList(getSounds());
  }, []);

  useEffect(() => {
    initialTurn();
  }, [soundList.length]);

  const handleRedClick = (e: string) => {
    if (!isUserTurn) return;

    if (e === 'red') {
      soundList[0].setCurrentTime(0).play();
      setStepCounter(stepCounter + 1);
      return;
    }
    if (e === 'yellow') {
      soundList[1].setCurrentTime(0).play();
      setStepCounter(stepCounter + 1);
      return;
    }
    if (e === 'blue') {
      soundList[2].setCurrentTime(0).play();
      setStepCounter(stepCounter + 1);
      return;
    }
    if (e === 'green') {
      soundList[3].setCurrentTime(0).play();
      setStepCounter(stepCounter + 1);
      return;
    }
    // setTurnCounter(turnCounter + 1);
  };

  return (
    <View>
      <View style={styles.board}>
        <View>
          <TouchableOpacity
            activeOpacity={isUserTurn ? 0 : 1}
            onPress={() => handleRedClick('red')}>
            <Animated.View
              style={[
                styles.colorContainer,
                isRedPressed
                  ? {backgroundColor: 'pink'}
                  : {backgroundColor: 'red'},
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={isUserTurn ? 0 : 1}
            onPress={() => handleRedClick('yellow')}>
            <Animated.View
              style={[
                styles.colorContainer,
                isYellowPressed
                  ? {backgroundColor: 'lightyellow'}
                  : {backgroundColor: 'yellow'},
              ]}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={isUserTurn ? 0 : 1}
            onPress={() => handleRedClick('blue')}>
            <Animated.View
              style={[
                styles.colorContainer,
                isBluePressed
                  ? {backgroundColor: 'lightblue'}
                  : {backgroundColor: 'blue'},
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={isUserTurn ? 0 : 1}
            onPress={() => handleRedClick('green')}>
            <Animated.View
              style={[
                styles.colorContainer,
                isGreenPressed
                  ? {backgroundColor: 'lightgreen'}
                  : {backgroundColor: 'green'},
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.score}>Current Score: {turnCounter}</Text>
      <Button
        title="Go to ScoreBoard"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Score', {
            score: turnCounter,
          });
        }}
      />
      <Button
        title="Change Turn"
        onPress={() => {
          setUserTurn(!isUserTurn);
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
  score: {
    marginBottom: 10,
    color: 'grey',
  },
});
export default Game;
