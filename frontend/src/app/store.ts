import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosReducer';
import userReducer from '../features/user/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
