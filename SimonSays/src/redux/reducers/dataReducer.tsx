import {DataAction, DataModel} from '../actions/dataAction';

type DataState = {
  data: DataModel;
  error: string | undefined;
};

const initialState = {
  data: {} as DataModel,
  error: undefined,
};

const DataReducer = (state: DataState = initialState, action: DataAction) => {
  switch (action.type) {
    case 'ON_START':
      return {
        ...state,
        data: action.payload,
      };
    case 'ON_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export {DataReducer};