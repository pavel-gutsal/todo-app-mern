import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '../../types/Todo';
import axios from "axios";

type InitialState = {
  todos: Todo[];
  status:'idle' | 'failed' | 'pending' | 'fullfilled';
  error: string | null;
};

const initialState: InitialState = {
  todos: [],
  status: 'idle',
  error: null,
};

interface Data {
  text: string,
  time: Date;
  token: string
}

const BASE_URL = 'http://localhost:8000/todos'

export const createTodoThunk = createAsyncThunk('todos/createTodoThunk', async (data: Data, thunkAPI) => {
  try {
    const { text, time, token } = data;
    const response = await axios.post(BASE_URL, {text, time}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (
        err.response
        && err.response.data
        && err.response.data.error
      ) {
        return thunkAPI.rejectWithValue(err.response.data.error);
      } else {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
});

export const downloadTodoThunk = createAsyncThunk(
  'todos/downloadTodoThunk',
  async (token: string, thunkAPI) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (
        err.response
        && err.response.data
        && err.response.data.error
      ) {
        return thunkAPI.rejectWithValue(err.response.data.error);
      } else {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
});

type deleteData = {
  token: string;
  id: string;
}

export const deleteTodoThunk = createAsyncThunk(
  'todos/deleteTodoThunk',
  async (data: deleteData, thunkAPI) => {
    const { token, id } = data;
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (
        err.response
        && err.response.data
        && err.response.data.error
      ) {
        return thunkAPI.rejectWithValue(err.response.data.error);
      } else {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
});

type ToggleData = {
  completed: boolean;
  token: string;
  id: string;
}

export const toggleTodoThunk = createAsyncThunk(
  'todos/toggleTodoThunk',
  async (data: ToggleData, thunkAPI) => {
    const { token, id, completed } = data;
  try {
    const response = await axios.put(`${BASE_URL}/${id}`,{ completed },
    {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (
        err.response
        && err.response.data
        && err.response.data.error
      ) {
        return thunkAPI.rejectWithValue(err.response.data.error);
      } else {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
});

type ID = {
  id: string;
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createTodoThunk.pending, (state) => {
        state.error = null;
        state.status = 'pending';
      })
      .addCase(createTodoThunk.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.status = 'fullfilled';
        state.error = null;
        state.todos = [ ...state.todos, action.payload ];
      })
      .addCase(createTodoThunk.rejected, (state, action ) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }else {
          state.error = 'error';
        }
        state.status = 'failed';
      })
      .addCase(downloadTodoThunk.pending, (state) => {
        state.error = null;
        state.status = 'pending';
      })
      .addCase(downloadTodoThunk.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = 'fullfilled';
        state.error = null;
        state.todos = [ ...action.payload ];
      })
      .addCase(downloadTodoThunk.rejected, (state, action ) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }else {
          state.error = 'error';
        }
        state.status = 'failed';
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action: PayloadAction<ID> ) => {
        state.status = 'fullfilled';
        state.error = null;
        state.todos = state.todos.filter(el => el._id !== action.payload.id);
      })
      .addCase(toggleTodoThunk.fulfilled, (state, action ) => {
        state.status = 'fullfilled';
        state.error = null;
        state.todos = state.todos.map(el => {
            if (el._id === action.payload._id) {
              return action.payload
            }
            return el;
          });
      });
  }},
);

export default todosSlice.reducer;