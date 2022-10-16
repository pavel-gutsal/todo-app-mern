import { createSlice,PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { User } from '../../types/User';
import { FormToThunk } from '../../types/FormToThunk';

type InitialState = {
  user: User | null;
  status:'idle' | 'failed' | 'pending' | 'fullfilled';
  error: string | null;
};

const initialState: InitialState = {
  user: null,
  status: 'idle',
  error: null,
};

const BASE_URL = 'http://localhost:8000/user'

export const registerUser = createAsyncThunk('user/registerUser', async (data: FormToThunk, thunkAPI) => {
  const { name, email, password, route } = data;

  try {
    const user = {
      email,
      password,
      name,
    }
    const response = await axios.post(`${BASE_URL}/${route}`, user);
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


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = null;
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.status = 'pending';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'fullfilled';
        state.error = null;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action ) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }else {
          state.error = 'error';
        }
        state.status = 'failed';
      });
  },
});

export const { logOutUser } = userSlice.actions;

export default userSlice.reducer;