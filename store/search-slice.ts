import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = {
  title: string;
};

const initialState: initialState = {
  title: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {},
});

export const searchAction = searchSlice.actions;

export default searchSlice;
