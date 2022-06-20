import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Animated, {Value} from 'react-native-reanimated';

import Sound from 'react-native-sound';

import {Props} from '../navigation';
import getSounds from '../utility/getSounds';
import ColorComp from '../components/colorComp';

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

  const [isGameover, setGameOver] = useState<boolean>(false);

  const delay = (ms: number) => {
    const startPoint = new Date().getTime();
    while (new Date().getTime() - startPoint <= ms) {
      /* wait */
    }
  };

  const runSteps = async () => {
    if (!soundList.length) return;
    var passedTurns = 0;

    turnTrack.forEach(turn => {
      soundList[turn].setCurrentTime(0).play();
      if (turn === 0) {
        setTimeout(() => {
          setRedPressed('pink');
          soundList[0].setCurrentTime(0).play();
        }, 1000 * passedTurns);
        passedTurns++;
        setTimeout(() => {
          setRedPressed('red');
        }, 1000 * passedTurns);
      }
      if (turn === 1) {
        setTimeout(() => {
          setYellowPressed('lightyellow');
          soundList[1].setCurrentTime(0).play();
        }, 1000 * passedTurns);
        passedTurns++;
        setTimeout(() => {
          setYellowPressed('yellow');
        }, 1000 * passedTurns);
      }
      if (turn === 2) {
        setTimeout(() => {
          setBluePressed('lightblue');
          soundList[2].setCurrentTime(0).play();
        }, 1000 * passedTurns);
        passedTurns++;
        setTimeout(() => {
          setBluePressed('blue');
        }, 1000 * passedTurns);
      }
      if (turn === 3) {
        setTimeout(() => {
          setGreenPressed('lightgreen');
          soundList[3].setCurrentTime(0).play();
        }, 1000 * passedTurns);
        passedTurns++;
        setTimeout(() => {
          setGreenPressed('green');
        }, 1000 * passedTurns);
      }

    });
    setUserTurn(true);
  };

  useEffect(() => {
    SetSoundList(getSounds());
    setTurntrack(turnTrack => [...turnTrack, Math.floor(Math.random() * 4)]);
  }, []);

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

    setTurnCounter(turnCounter + 1);
  };

  return (
    <>
      <View style={styles.board}>
        <View>
          <ColorComp
            onPress={() => handleRedClick('red')}
            isUserTurn={isUserTurn}
            color={isRedPressed}
          />

          <ColorComp
            onPress={() => handleRedClick('yellow')}
            isUserTurn={isUserTurn}
            color={isYellowPressed}
          />
        </View>
        <View>
          <ColorComp
            onPress={() => handleRedClick('blue')}
            isUserTurn={isUserTurn}
            color={isBluePressed}
          />

          <ColorComp
            onPress={() => handleRedClick('green')}
            isUserTurn={isUserTurn}
            color={isGreenPressed}
          />
        </View>
      </View>
      <Text style={styles.score}>Current Score: {turnCounter}</Text>
        {/* turnTrack.length <= */}
      { 1 && (
        <TouchableOpacity
          onPress={() => {
            runSteps();
          }}>
          <Text style={styles.button}>START</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Score', {
            score: turnCounter,
          });
        }}>
        <Text style={styles.button}>Go to Scoreboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setUserTurn(!isUserTurn);
        }}>
        <Text style={styles.button}>Change Turn</Text>
      </TouchableOpacity>
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
});
export default Game;
