import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Game: undefined;
  Score: undefined;
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Score'>;

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

export type {Props};
