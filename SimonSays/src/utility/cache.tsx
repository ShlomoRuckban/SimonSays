import AsyncStorage from '@react-native-async-storage/async-storage';
import {Winner} from '../redux/winnerListSlice';

const multiGetData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const valuesArray: any = await AsyncStorage.multiGet(keys);
    let dataArray: Winner[] = [];

    for (let i = 0; i < valuesArray.length; i++) {
      dataArray[i] = JSON.parse(valuesArray[i][1]);
    }

    return dataArray;
  } catch (error) {
    // multi getting error
    console.log('Error :', error);
  }
};

const multiSetData = async (keyValueArray: [string, string][]) => {
  try {
    //   keyValueAray: [
    //    ["@MyApp_user", "value_1"],
    //    ["@MyApp_user", "value_1"]
    //  ]

    const valuesArray = await AsyncStorage.multiSet(keyValueArray);
    return valuesArray;
  } catch (error) {
    console.log(error);
  }
};

// SPECIALS
const getAllStorageKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    // read key error
    console.log(error);
  }
};
const clearStore = async () => {
  try {
    await AsyncStorage.clear();
    return {msg: `Store clearing successful`};
  } catch (error) {
    // clearing error
    console.log(error);
    return {error: true, msg: `Store clearing failed`};
  }
};

export const AsyncStoreKeyMap = {
  appSettings: 'appSettings',
  userProfile: 'userProfile',
  userProgress: 'userProgress',
};

const AsyncStore = {
  multiSetData,
  multiGetData,

  getAllStorageKeys,
  clearStore,
};

export default AsyncStore;
