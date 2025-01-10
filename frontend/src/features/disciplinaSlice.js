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
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/disciplina/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if(error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ error: 'Erro desconhecido. Tente novamente.' });
    }
  }
);

export const deleteDisciplina = createAsyncThunk(
  'disciplina/delete',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API}/disciplina/${id}`, {
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

export const updateDisciplina = createAsyncThunk(
  'disciplina/update',
  async ({ id, disciplinaData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API}/disciplina/${id}`, disciplinaData, {
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

const disciplinaSlice = createSlice({
  name: 'disciplina',
  initialState: {
    list: [],
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
        state.list.push(action.payload);
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
        state.list = action.payload;
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
      })
      .addCase(deleteDisciplina.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDisciplina.fulfilled, (state, action) => {
        state.loading = false;
        state.disciplina = action.payload;
        state.list = state.list.filter(
          (disciplina) => disciplina.id !== action.meta.arg.id
        );
      })
      .addCase(deleteDisciplina.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDisciplina.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDisciplina.fulfilled, (state, action) => {
        state.loading = false;
        state.disciplina = action.payload;
        const updatedDisciplina = action.payload;
        const index = state.list.findIndex(disciplina => disciplina.id === updatedDisciplina.id);
        if (index !== -1) {
            state.list[index] = updatedDisciplina;
        } else {
            state.list.push(updatedDisciplina);
        }
        state.disciplina = updatedDisciplina;
      })
      .addCase(updateDisciplina.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default disciplinaSlice.reducer;