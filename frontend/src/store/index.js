import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import authReducer from '../features/authSlice';
import disciplinaReducer from '../features/disciplinaSlice';
import tarefaReducer from '../features/tarefaSlice';
import anotacaoReducer from '../features/anotacaoSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    disciplina: disciplinaReducer,
    tarefa: tarefaReducer,
    anotacao: anotacaoReducer,
  },
});

export default store;
