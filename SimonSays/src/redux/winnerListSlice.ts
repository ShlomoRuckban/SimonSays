import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as storageClient from './storageClient';

export type Winner = {
  name: string;
  score: number;
  place: number;
};

export type WinnerListState = {
  winners: Winner[];
};

const initialState: WinnerListState = {
  winners: [],
};

export const setWinners = createAsyncThunk<{winners: Winner[]}>(
  'SetWinners',
  async () => {
    const response = await storageClient.fetchWinners();
    if (response.kind === 'success') {
      return {
        winners: response.body ?? [],
      };
    } else {
      throw 'Error';
    }
  },
);

const winnerListSlice = createSlice({
  name: 'winnerList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setWinners.fulfilled, (state, action) => {
      state.winners = action.payload.winners;
    });
  },
});

export default winnerListSlice.reducer;
