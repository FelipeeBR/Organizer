import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import authReducer from '../features/authSlice';
import disciplinaReducer from '../features/disciplinaSlice';
import tarefaReducer from '../features/tarefaSlice';
import anotacaoReducer from '../features/anotacaoSlice';
import agendaReducer from '../features/agendaSlice';
import notificacaoReducer from '../features/notificacaoSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    disciplina: disciplinaReducer,
    tarefa: tarefaReducer,
    anotacao: anotacaoReducer,
    agenda: agendaReducer,
    notificacao: notificacaoReducer,
  },
});

export default store;
