import { configureStore } from '@reduxjs/toolkit';

import { todoSlice } from './todo/todo';

export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development' ? { trace: true } : false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    todo: todoSlice.reducer,
  },
});
