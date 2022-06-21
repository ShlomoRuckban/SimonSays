import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setWinners} from '../redux/winnerListSlice';

import Sound from 'react-native-sound';

import {Props} from '../navigation';
import getSounds from '../utility/getSounds';
import AsyncStore from '../utility/cache';

const Game = ({navigation}: Props) => {
  const [isUserTurn, setUserTurn] = useState<boolean>(false);
  const [soundList, SetSoundList] = useState<Sound[]>([]);
  const [turnTrack, setTurntrack] = useState<number[]>([]);
  const [turnCounter, setTurnCounter] = useState<number>(0);
  const [stepCounter, setStepCounter] = useState<number>(0);

  const [isRedPressed, setRedPressed] = useState<string>('red');
  const [isYellowPressed, setYellowPressed] = useState<string>('yellow');
  const [isBluePressed, setBluePressed] = useState<string>('blue');
  const [isGreenPressed, setGreenPressed] = useState<string>('green');

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(setWinners());
      SetSoundList(getSounds());
      addStep();
      return () => {};
    }, []),
  );

  const runSteps = () => {
    if (!soundList.length) return;
    var passedTurns = 0;
    turnTrack.forEach(turn => {
      if (turn === 0) {
        setTimeout(() => {
          setRedPressed('pink');
          soundList[0].setCurrentTime(0).play();
        }, 500 * passedTurns);
        passedTurns++;
        setTimeout(() => {
          setRedPressed('red');
        }, 500 * passedTurns);
      }
      if (turn === 1) {
        setTimeout(() => {
          setYellowPressed('lightyellow');
          soundList[1].setCurrentTime(0).play();
        }, 500 * passedTurns);
        passedTurns++;
        setTimeout(() => {
          setYellowPressed('yellow');
        }, 500 * passedTurns);
      }
      if (turn === 2) {
        setTimeout(() => {
          setBluePressed('lightblue');
          soundList[2].setCurrentTime(0).play();
        }, 500 * passedTurns);
        passedTurns++;
        setTimeout(() => {
          setBluePressed('blue');
        }, 500 * passedTurns);
      }
      if (turn === 3) {
        setTimeout(() => {
          setGreenPressed('lightgreen');
          soundList[3].setCurrentTime(0).play();
        }, 500 * passedTurns);
        passedTurns++;
        setTimeout(() => {
          setGreenPressed('green');
        }, 500 * passedTurns);
      }
    });
    setTimeout(() => {
      setUserTurn(true);
    }, 500 * passedTurns);
  };

  const addStep = () => {
    turnTrack.push(Math.floor(Math.random() * 4));
  };

  const handleRedClick = (e: number) => {
    if (!isUserTurn) return;
    if (e === 0 && turnTrack[stepCounter] === 0) {
      soundList[0].setCurrentTime(0).play();
    } else if (e === 1 && turnTrack[stepCounter] === 1) {
      soundList[1].setCurrentTime(0).play();
    } else if (e === 2 && turnTrack[stepCounter] === 2) {
      soundList[2].setCurrentTime(0).play();
    } else if (e === 3 && turnTrack[stepCounter] === 3) {
      soundList[3].setCurrentTime(0).play();
    } else {
      navigation.navigate('Score');
      return;
    }
    if (stepCounter === turnTrack.length - 1) {
      setStepCounter(0);
      setTurnCounter(turnCounter + 1);
      setUserTurn(false);
      addStep();
      setTimeout(() => {
        runSteps();
      }, 500);
      return;
    }
    setStepCounter(stepCounter + 1);
  };

  return (
    <>
      <View style={styles.board}>
        <View>
          <TouchableOpacity
            activeOpacity={isUserTurn ? 0 : 1}
            onPress={() => handleRedClick(0)}>
            <View
              style={[styles.colorContainer, {backgroundColor: isRedPressed}]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={isUserTurn ? 0 : 1}
            onPress={() => handleRedClick(1)}>
            <View
              style={[
                styles.colorContainer,
                {backgroundColor: isYellowPressed},
              ]}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={isUserTurn ? 0 : 1}
            onPress={() => handleRedClick(2)}>
            <View
              style={[styles.colorContainer, {backgroundColor: isBluePressed}]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={isUserTurn ? 0 : 1}
            onPress={() => handleRedClick(3)}>
            <View
              style={[styles.colorContainer, {backgroundColor: isGreenPressed}]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.score}>Current Score: {turnCounter}</Text>

      {turnTrack.length <= 1 && (
        <TouchableOpacity
          onPress={() => {
            runSteps();
          }}>
          <Text style={styles.button}>START</Text>
        </TouchableOpacity>
      )}
    </>
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
  button: {
    width: '100%',
    marginTop: 16,
    color: 'white',
    paddingTop: 16,
    flexDirection: 'row',
    paddingBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'lightblue',
  },
  gameOver: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Game;
