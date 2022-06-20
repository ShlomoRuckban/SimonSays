import asyncStore from '../../utility/cache';
import {Dispatch} from 'react';

export interface DataModel {
  name: string;
  scores: number;
  spot: number;
}

export interface GatherAction {
  readonly type: 'ON_START';
  payload: DataModel;
}

export interface ErrorAction {
  readonly type: 'ON_ERROR';
  payload: any;
}

export type DataAction = GatherAction | ErrorAction;

export const onStart = (key: string) => {
  return async (dispatch: Dispatch<DataAction>) => {
    const data = {name: 'Shlomo', scores: 100, spot: 1};

    try {
      if (!data) {
        dispatch({
          type: 'ON_ERROR',
          payload: 'Error in retrieving data.',
        });
      } else {
        dispatch({
          type: 'ON_START',
          payload: data,
        });
      }
    } catch (err) {
      dispatch({
        type: 'ON_ERROR',
        payload: err,
      });
    }
  };
};
