import AsyncStorage from '@react-native-async-storage/async-storage';

// const multiGetData = async (storageKeys: string[]) => {
//   try {

//     const valuesArray = await AsyncStorage.multiGet(storageKeys)
//     return valuesArray;

//   } catch (error) {
//     // multi getting error
//     console.log("Error :",error)
//   }
// }

const multiGetData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    return result.map((req: any) => JSON.parse(req)).forEach(console.log);
  } catch (error) {
    console.error(error);
  }
};
const multiSetData = async (keyValueArray: [string, string][]) => {
  try {
    /*
      keyValueAray: [
       ["@MyApp_user", "value_1"],
       ["@MyApp_user", "value_1"]
     ]
    */
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
