import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from '../api/taskApi';
import taskReducer from '../features/taskSlice';

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
