import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const verificarNotificacao = createAsyncThunk(
    'notificacao/verificar',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API}/notificacoes/verificar`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ error: 'Erro desconhecido. Tente novamente.' }); 
        }
    }
);

export const getNotificacoes = createAsyncThunk(
    'notificacao/getAll',
    async ({token}, { rejectWithValue }) => { 
        try {
            const response = await axios.get(`${API}/notificacoes`, {
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

export const updateNotificacao = createAsyncThunk(
    'notificacao/update',
    async ({ id, notificacaoData, token }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API}/notificacoes/${id}`, notificacaoData, {
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

const notificacaoSlice = createSlice({
    name: "notificacao",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(verificarNotificacao.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(verificarNotificacao.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(verificarNotificacao.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getNotificacoes.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getNotificacoes.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(getNotificacoes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateNotificacao.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateNotificacao.fulfilled, (state, action) => {
            state.loading = false;
            const updatedNotificacao = action.payload;
            const index = state.list.findIndex((notificacao) => notificacao.id === updatedNotificacao.id);
            if (index !== -1) {
                state.list[index] = updatedNotificacao;
            }
        })
        .addCase(updateNotificacao.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default notificacaoSlice.reducer;