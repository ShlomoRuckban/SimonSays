import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, useSelector, useDispatch} from 'react-redux';

import {ApplicationState} from './src/redux';
import Score from './src/screens/score';
import Game from './src/screens/game';
import {store} from './src/redux';
import AsyncStore from './src/utility/cache';

const Stack = createStackNavigator();

// const dispatch = useDispatch();

// const {data, error} = useSelector(
//   (state: ApplicationState) => state.dataReducer,
// );

// console.log(data);

function App() {
  useEffect(() => {
    const allDataKeys =AsyncStore.getAllStorageKeys();
    console.log(JSON.stringify(allDataKeys));
    // const allData = AsyncStore.multiGetData(allDataKeys);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Game">
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Score" component={Score} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
