import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const createAgenda = createAsyncThunk(
    'agenda/create',
    async ({ agendaData, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API}/agenda`, agendaData, {
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

export const getAgendas = createAsyncThunk(
    'agenda/getAll',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/agendas`, {
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

export const getAgenda = createAsyncThunk(
    'agenda/get',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/agenda/${id}`, {
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

export const updateAgenda = createAsyncThunk(
    'agenda/update',
    async ({ id, agendaData, token }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API}/agenda/${id}`, agendaData, {
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

export const deleteAgenda = createAsyncThunk(
    'agenda/delete',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API}/agenda/${id}`, {
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

const agendaSlice = createSlice({
    name: "agenda",
    initialState: {
        list: [],
        agenda: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAgenda.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAgenda.fulfilled, (state, action) => {
                state.loading = false;
                state.agenda = action.payload;
                state.list.push(action.payload);
            })
            .addCase(createAgenda.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAgendas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAgendas.fulfilled, (state, action) => {
                state.loading = false;
                state.agenda = action.payload;
                state.list = action.payload;
            })
            .addCase(getAgendas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAgenda.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAgenda.fulfilled, (state, action) => {
                state.loading = false;
                state.agenda = action.payload;
            })
            .addCase(getAgenda.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateAgenda.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAgenda.fulfilled, (state, action) => {
                state.loading = false;
                state.agenda = action.payload;
                const updatedAgenda = action.payload;
                const index = state.list.findIndex(agenda => agenda.id === updatedAgenda.id);
                if (index !== -1) {
                    state.list[index] = updatedAgenda;
                } else {
                    state.list.push(updatedAgenda);
                }
                state.disciplina = updatedAgenda;
            })
            .addCase(updateAgenda.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteAgenda.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAgenda.fulfilled, (state, action) => {
                state.loading = false;
                state.agenda = action.payload;
                state.list = state.list.filter(
                    (agenda) => agenda.id !== action.meta.arg.id
                );
            })
            .addCase(deleteAgenda.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default agendaSlice.reducer;