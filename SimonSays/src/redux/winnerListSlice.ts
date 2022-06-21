import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as storageClient from './storageClient';

export type Winner = {
  name: string | undefined;
  score: number ;
  place?: number ;
};

export type WinnerListState = {
  winners: Winner[];
};

const initialState: WinnerListState = {
  winners: [],
};

export const fetchWinners = createAsyncThunk<{winners: Winner[]}>(
  'fetchWinners',
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
    builder.addCase(fetchWinners.fulfilled, (state, action) => {
      state.winners = action.payload.winners;
    });
  },
});

export default winnerListSlice.reducer;
