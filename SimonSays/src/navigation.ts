import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Game: undefined;
  Score: {score: number};
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Score'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Score'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

export type {Props};
