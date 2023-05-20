import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './search-slice';

const store = configureStore({
  reducer: { search: searchSlice.reducer },
});
