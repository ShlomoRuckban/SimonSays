import React, {useState, useEffect} from 'react';
import RNRestart from 'react-native-restart';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

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

const Score = ({navigation}: Props) => {
  const Data = useSelector((state: RootState) => state.winnerList);
  console.log('state: ', Data);

  const [modalControl, setModalControl] = useState<boolean>(true);
  const [newName, setNewName] = useState<string>();
  const [winnersList, setWinnersList] = useState<Winner[]>([]);

  useEffect(() => {
    setWinnersList(Data.winners);
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
              console.log(newName);
              setModalControl(false);
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
