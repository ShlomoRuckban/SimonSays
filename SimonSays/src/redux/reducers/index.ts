import {combineReducers} from 'redux';
import {DataReducer} from './dataReducer';

const rootReducer = combineReducers({
  dataReducer: DataReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
