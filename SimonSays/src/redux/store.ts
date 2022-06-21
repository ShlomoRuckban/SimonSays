import {configureStore, combineReducers} from '@reduxjs/toolkit';
import winnerListSlice from './winnerListSlice';

const rootReducer = combineReducers({
    winnerList: winnerListSlice
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
