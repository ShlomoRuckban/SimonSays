import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
export type Winner = {
  name: string;
  score: number;
  place: number;
};

export type WinnerListState = {
  winners: Winner[];
  loading: boolean;
  error: boolean;
};

const initialState: WinnerListState = {
  winners: [],
  loading: false,
  error: false,
};

export const fetchWinners = createAsyncThunk<{winners: Winner[]}>;

const winnerListSlice = createSlice({
  name: 'winnerList',
  initialState: initialState,
  reducers: {},
});

export default winnerListSlice.reducer;
