import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const createTarefa = createAsyncThunk(
    'tarefa/create',
    async ({ tarefaData, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API}/tarefa`, tarefaData, {
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

export const updateTarefa = createAsyncThunk(
    'tarefa/update',
    async ({ id, tarefaData, token }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API}/tarefa/${id}`, tarefaData, {
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

export const getTarefa = createAsyncThunk(
    'tarefa/get',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/tarefa/${id}`, {
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

export const getTarefas = createAsyncThunk(
    'tarefa/getAll',
    async ({ id, token }, { rejectWithValue }) => { 
        try {
            const response = await axios.get(`${API}/tarefas`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { id },
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

const tarefaSlice = createSlice({
    name: 'tarefa',
    initialState: {
        list: [],
        tarefa: null,
        loading: false,
        error: null,
    },
    reducers: {
        atualizarTarefas: (state, action) => {
            state.list = action.payload;
        },
        resetarTarefas: (state) => {
            state.list = []; 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTarefa.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTarefa.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createTarefa.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(updateTarefa.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTarefa.fulfilled, (state, action) => {
                state.loading = false;
                state.tarefa = action.payload;
            })
            .addCase(updateTarefa.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(getTarefa.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTarefa.fulfilled, (state, action) => {
                state.loading = false;
                state.tarefa = action.payload;
            })
            .addCase(getTarefa.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(getTarefas.pending, (state) => {   
                state.loading = true;
                state.error = null;
            })
            .addCase(getTarefas.fulfilled, (state, action) => {
                state.loading = false;
                state.tarefa = action.payload;
                state.list = action.payload;
            })
            .addCase(getTarefas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    },
});

export const { atualizarTarefas, resetarTarefas } = tarefaSlice.actions;
export default tarefaSlice.reducer;