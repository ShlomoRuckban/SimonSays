import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Props} from "./src/navigation" 

function HomeScreen({navigation}: Props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to ScoreBoard"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Score', {
            itemId: 86,
          });
        }}
      />
    </View>
  );
}

function ScoreScreen({route, navigation}: Props) {
  /* 2. Get the param */
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Score', {
            itemId: Math.floor(Math.random() * 4),
          })
        }
      />
      <Button title="Go to Game" onPress={() => navigation.navigate('Game')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Game"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Game" component={HomeScreen} />
          <Stack.Screen name="Score" component={ScoreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

//screenOptions={{headerShown: false}}>

export default App;
