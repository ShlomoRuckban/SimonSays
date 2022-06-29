import React, {useState, useEffect} from 'react';
import RNRestart from 'react-native-restart';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useDispatch} from 'react-redux';
import {fetchWinners} from '../redux/winnerListSlice';
import AsyncStore from '../utility/cache';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {Props} from '../navigation';
import {Winner} from '../redux/winnerListSlice';

const Score = ({route}: Props) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.winnerList);

  const [newName, setNewName] = useState<string>();
  const [winnersList, setWinnersList] = useState<Winner[]>([]);
  const [modalControl, setModalControl] = useState<boolean>(true);

  const checkList = () => {
    let newWinner: Winner = {name: newName, score: route.params.score};
    let newArray = [...data.winners];
    let arrayToSend: [string, string][] = [];

    newArray.push(newWinner);
    newArray = newArray
      .sort((a, b) => {
        return b.score - a.score;
      })
      .slice(0, 10);

    for (var i = 0; i < newArray.length; i++) {
      newArray[i] = {
        name: newArray[i].name,
        score: newArray[i].score,
        place: i + 1,
      };
      arrayToSend.push([`place ${i + 1}`, JSON.stringify(newArray[i])]);
    }
    AsyncStore.multiSetData(arrayToSend);
    setWinnersList(newArray);
  };

  useEffect(() => {
    dispatch(fetchWinners());
  }, []);

  let winnerList = winnersList.map(winner => {
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
        width: '100%',
        padding: 20,
      }}>
      <Modal visible={modalControl} animationType="slide">
        <View style={{alignItems: 'center'}}>
          <TextInput
            onChangeText={setNewName}
            placeholder="Enter your name"
            placeholderTextColor="grey"
            style={{
              borderWidth: 1,
              borderColor: 'blue',
              marginTop: 20,
              width: '100%',
              color: 'black',
            }}></TextInput>
          <TouchableOpacity
            onPress={() => {
              setModalControl(false);
              checkList();
            }}>
            <Text style={styles.button}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View>
        <View style={styles.winner}>
          <Text style={styles.spot}></Text>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.score}>Score</Text>
        </View>
        <View>{winnerList}</View>
      </View>
      <TouchableOpacity
        onPress={() => {
          RNRestart.Restart();
        }}>
        <Text style={styles.button}>Start new game</Text>
      </TouchableOpacity>
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
    fontSize: 20,
    color: 'grey',
  },
  name: {
    width: '43%',
    fontSize: 20,
    color: 'grey',
  },
  score: {
    width: '45%',
    fontSize: 20,
    color: 'grey',
  },
  button: {
    width: 300,
    top: 300,
    color: 'white',
    paddingTop: 16,
    flexDirection: 'row',
    paddingBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'lightblue',
  },
});
export default Score;
