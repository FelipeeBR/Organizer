import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = `${process.env.REACT_APP_API_URL}/disciplina`;

export const registerDisciplina = createAsyncThunk(
  'disciplina/register',
  async (disciplinaData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API, disciplinaData);
      return response.data;
    } catch (error) {
      if(error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ error: 'Erro desconhecido. Tente novamente.' });
    }
  }
);

const disciplinaSlice = createSlice({
  name: 'disciplina',
  initialState: {
    disciplina: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerDisciplina.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerDisciplina.fulfilled, (state, action) => {
        state.loading = false;
        state.disciplina = action.payload;
      })
      .addCase(registerDisciplina.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default disciplinaSlice.reducer;