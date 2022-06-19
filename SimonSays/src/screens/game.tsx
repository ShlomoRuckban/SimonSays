import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Sound from 'react-native-sound';

import {Props} from '../navigation';
import getSounds from '../utility/getSounds';

const Game = ({navigation}: Props) => {
  const [soundList, SetSoundList] = useState<Sound[]>([]);
  const [isUserTurn, setUserTurn] = useState<boolean>(true);
  const [turnTrack, setTurntrack] = useState<number[]>([0, 2, 1, 3]);
  const [turnCounter, setTurnCounter] = useState<number>(0);
  const [stepCounter, setStepCounter] = useState<number>(0);
  const [isRedPressed, setRedPressed] = useState<boolean>(false);
  const [isYellowPressed, setYellowPressed] = useState<boolean>(false);
  const [isBluePressed, setBluePressed] = useState<boolean>(false);
  const [isGreenPressed, setGreenPressed] = useState<boolean>(false);
  const [isGameover, setGameOver] = useState<boolean>(false);

  const runTurns = async () => {
    turnTrack.forEach(turn => {
      if (turn === 0) {
        setRedPressed(true);
        setTimeout(() => {
          setRedPressed(false);
        }, 1000);
      } else if (turn === 1) {
        setYellowPressed(true);
        setTimeout(() => {
          setYellowPressed(false);
        }, 1000);
      } else if (turn === 2) {
        setBluePressed(true);
        setTimeout(() => {
          setBluePressed(false);
        }, 1000);
      } else if (turn === 3) {
        setGreenPressed(true);
        setTimeout(() => {
          setGreenPressed(false);
        }, 1000);
      }
    });
  };

  useEffect(() => {
    SetSoundList(getSounds());
  }, []);

  useEffect(() => {
    if (isUserTurn) return;
    let newNumber = Math.floor(Math.random() * 4);
    setTurntrack(turnTrack => [...turnTrack, newNumber]);
    console.log(turnTrack);
    runTurns();
    setUserTurn(true);
  }, [isUserTurn]);
  
  const handleRedClick = (e: any) => {
      console.log(soundList.length)
      if (!isUserTurn) return;

    setRedPressed(false);
    setYellowPressed(false);
    setBluePressed(false);
    setGreenPressed(false);

    if (e === 'red' && turnTrack[stepCounter] === 0) {
      soundList[0].setCurrentTime(0).play();
      setRedPressed(true);
      setStepCounter(stepCounter + 1);
      return;
    }
    if (e === 'yellow' && turnTrack[stepCounter] === 1) {
      soundList[1].setCurrentTime(0).play();
      setYellowPressed(true);
      setStepCounter(stepCounter + 1);
      return;
    }
    if (e === 'blue' && turnTrack[stepCounter] === 2) {
      soundList[2].setCurrentTime(0).play();
      setBluePressed(true);
      setStepCounter(stepCounter + 1);
      return;
    }
    if (e === 'green' && turnTrack[stepCounter] === 3) {
      soundList[3].play(() => {
        soundList[3].stop();
        soundList[3].release();
      });
      setGreenPressed(true);
      setStepCounter(stepCounter + 1);
      return;
    }
    // setTurnCounter(turnCounter + 1);
    SetSoundList(getSounds());
  };

  let currentScore = turnCounter;
  let userActive = isUserTurn ? 0 : 1;
  let red = isRedPressed ? {backgroundColor: 'pink'} : {backgroundColor: 'red'};
  let yellow = isYellowPressed
    ? {backgroundColor: 'lightyellow'}
    : {backgroundColor: 'yellow'};
  let blue = isBluePressed
    ? {backgroundColor: 'lightblue'}
    : {backgroundColor: 'blue'};
  let green = isGreenPressed
    ? {backgroundColor: 'lightgreen'}
    : {backgroundColor: 'green'};

  return (
    <View>
      <View style={styles.board}>
        <View>
          <TouchableOpacity
            activeOpacity={userActive}
            style={[styles.colorContainer, red]}
            onPress={() => handleRedClick('red')}
          />
          <TouchableOpacity
            activeOpacity={userActive}
            style={[styles.colorContainer, yellow]}
            onPress={() => handleRedClick('yellow')}
          />
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={userActive}
            style={[styles.colorContainer, blue]}
            onPress={() => handleRedClick('blue')}
          />
          <TouchableOpacity
            activeOpacity={userActive}
            style={[styles.colorContainer, green]}
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
            score: turnCounter,
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
  score: {
    marginBottom: 10,
    color: 'grey',
  },
});
export default Game;
