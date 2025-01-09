import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const registerDisciplina = createAsyncThunk(
  'disciplina/register',
  async (disciplinaData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/disciplina`, disciplinaData);
      return response.data;
    } catch (error) {
      if(error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ error: 'Erro desconhecido. Tente novamente.' });
    }
  }
);

export const getDisciplinas = createAsyncThunk(
  'disciplina/getAll',
  async (token, { rejectWithValue }) => { 
    try {
      const response = await axios.get(`${API}/disciplinas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ error: 'Erro desconhecido. Tente novamente.' });
    }
  }
);

export const getDisciplina = createAsyncThunk(
  'disciplina/get',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/${id}`);
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
      })
      .addCase(getDisciplinas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDisciplinas.fulfilled, (state, action) => {
        state.loading = false;
        state.disciplina = action.payload;
      })
      .addCase(getDisciplinas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDisciplina.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDisciplina.fulfilled, (state, action) => {
        state.loading = false;
        state.disciplina = action.payload;
      })
      .addCase(getDisciplina.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default disciplinaSlice.reducer;