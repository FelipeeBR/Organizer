import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const createAnotacao = createAsyncThunk(
    'anotacao/create',
    async (anotacaoData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API}/anotacao`, anotacaoData);
        return response.data;
      } catch (error) {
        if(error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ error: 'Erro desconhecido. Tente novamente.' });
      }
    }
);

export const getAnotacoes = createAsyncThunk(
    'anotacao/getAll',
    async (token, { rejectWithValue }) => { 
      try {
        const response = await axios.get(`${API}/anotacoes`, {
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

export const getAnotacao = createAsyncThunk(
    'anotacao/get',
    async ({ id, token }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API}/anotacao/${id}`, {
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

export const deleteAnotacao = createAsyncThunk(
    'anotacao/delete',
    async ({ id, token }, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${API}/anotacao/${id}`, {
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

export const updateAnotacao = createAsyncThunk(
    'anotacao/update',
    async ({ id, anotacaoData, token }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${API}/anotacao/${id}`, anotacaoData, {
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

const anotacaoSlice = createSlice({
    name: "anotacao",
    initialState: {
        list: [],
        anotacao: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAnotacao.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAnotacao.fulfilled, (state, action) => {
                state.loading = false;
                state.anotacao = action.payload;
                state.list.push(action.payload);
            })
            .addCase(createAnotacao.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAnotacoes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAnotacoes.fulfilled, (state, action) => {
                state.loading = false;
                state.anotacao = action.payload;
                state.list = action.payload;
            })
            .addCase(getAnotacoes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAnotacao.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAnotacao.fulfilled, (state, action) => {
                state.loading = false;
                state.anotacao = action.payload;
            })
            .addCase(getAnotacao.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteAnotacao.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAnotacao.fulfilled, (state, action) => {
                state.loading = false;
                state.anotacao = action.payload;
                state.list = state.list.filter(
                    (anotacao) => anotacao.id !== action.meta.arg.id
                );
            })
            .addCase(deleteAnotacao.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateDisciplina.pending, (state) => {
                    state.loading = true;
                    state.error = null;
            })
            .addCase(updateAnotacao.fulfilled, (state, action) => {
                state.loading = false;
                state.anotacao = action.payload;
                const updatedAnotacao = action.payload;
                const index = state.list.findIndex(anotacao => anotacao.id === updatedAnotacao.id);
                if (index !== -1) {
                    state.list[index] = updatedAnotacao;
                } else {
                    state.list.push(updatedAnotacao);
                }
                state.anotacao = updatedAnotacao;
            })
            .addCase(updateAnotacao.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default anotacaoSlice.reducer;
  