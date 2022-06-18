import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Game from './src/screens/game';
import Score from './src/screens/score';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Game">
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Score" component={Score} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
