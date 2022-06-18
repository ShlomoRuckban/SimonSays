import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = 'cache';

const store = async value => {
  try {
    const item = {
      value,
    };
    await AsyncStorage.setItem(prefix, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const get = async () => {
  try {
    const value = await AsyncStorage.getItem(prefix);
    const item = JSON.parse(value);

    if (!item) return null;

    return item.value;
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
};
