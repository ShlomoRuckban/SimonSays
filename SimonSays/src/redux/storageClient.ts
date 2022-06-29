import AsyncStore from '../utility/cache';
import {Winner} from './winnerListSlice';

type ResponseKind = 'success' | 'failure';

type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

export const fetchWinners = async (): Promise<NetworkResponse<Winner[]>> => {
  const response = await AsyncStore.multiGetData();
  console.log(response);
  if (response !== undefined) {
    return {
      kind: 'success',
      body: response,
    };
  } else {
    return {kind: 'failure'};
  }
};
